local k = import 'github.com/grafana/jsonnet-libs/ksonnet-util/kausal.libsonnet';

function(tag=null) {
  _config:: {
    ctdGen: {
      port: 3000,
      name: 'countdown-generator',
      tag: if tag != null then tag else 'latest',
      url: 'countdown.lolei.dev',
      volumeMountPath: '/app/data',
      local nameRef = self.name,
      names: {
        volume: 'db-volume',
        configMap: '%s-cm' % nameRef,
        deployment: '%s-depl' % nameRef,
        container: '%s-cont' % nameRef,
        service: '%s-svc' % nameRef,
        ingress: '%s-ing' % nameRef,
        certSecret: '%s-cert' % nameRef,
        pvc: '%s-pvc' % nameRef,
      },
    },
  },

  local configMap = k.core.v1.configMap,
  local deployment = k.apps.v1.deployment,
  local container = k.core.v1.container,
  local containerPort = k.core.v1.containerPort,
  local service = k.core.v1.service,
  local ingress = k.networking.v1.ingress,
  local persistentVolumeClaim = k.core.v1.persistentVolumeClaim,
  local envFromSource = k.core.v1.envFromSource,

  ctdGen: {
    configMap:
      configMap.new(
        name=$._config.ctdGen.names.configMap,
        data={ CTD_GEN_DB_LOCATION: '%s/countdownDb' % $._config.ctdGen.volumeMountPath }
      ),
    deployment:
      deployment.new(
        name=$._config.ctdGen.names.deployment,
        replicas=1,
        containers=[
          container.new(
            name=$._config.ctdGen.names.container,
            image='ghcr.io/lolei/%s:%s' % [$._config.ctdGen.name, $._config.ctdGen.tag]
          )
          // Apparently all ports must have a name in the Grafana wrapper:
          // https://github.com/grafana/jsonnet-libs/blob/2619bb87ecb336a59616df4c1fe8ced668bdbc94/ksonnet-util/grafana.libsonnet#L6
          + container.withPorts(
            [containerPort.new(
              name='my-port',
              port=$._config.ctdGen.port,
            )]
          )
          + container.withEnvFrom(
            envFromSource.configMapRef.withName($.ctdGen.configMap.metadata.name)
          )
          + container.withVolumeMounts([
            {
              mountPath: $._config.ctdGen.volumeMountPath,
              name: $._config.ctdGen.names.volume,
            },
          ]),
        ],
      )
      + deployment.spec.template.spec.withImagePullSecrets(
        { name: 'regcred' }
      )
      + deployment.spec.template.spec.withVolumes(
        [
          {
            name: $._config.ctdGen.names.volume,
            persistentVolumeClaim: { claimName: $._config.ctdGen.names.pvc },
          },

        ]
      )
      + deployment.spec.template.spec.securityContext.withFsGroup(1001),
    service:
      k.util.serviceFor(self.deployment)
      + service.metadata.withName($._config.ctdGen.names.service),
    ingress:
      ingress.new(
        name=$._config.ctdGen.names.ingress,
      )
      + ingress.metadata.withAnnotations(
        {
          'kubernetes.io/ingress.class': 'nginx',
          'cert-manager.io/cluster-issuer': 'letsencrypt-prod',
        }
      )
      + ingress.spec.withTls(
        [
          {
            hosts: [$._config.ctdGen.url],
            secretName: $._config.ctdGen.names.certSecret,
          },
        ]
      )
      + ingress.spec.withRules(
        [
          {
            host: $._config.ctdGen.url,
            http: {
              paths: [
                {
                  path: '/',
                  pathType: 'Prefix',
                  backend: {
                    service: {
                      name: $._config.ctdGen.names.service,
                      port: {
                        number: $._config.ctdGen.port,
                      },
                    },
                  },
                },
              ],
            },
          },
        ]
      ),
    persistentVolumeClaim:
      persistentVolumeClaim.new(
        name=$._config.ctdGen.names.pvc
      )
      + persistentVolumeClaim.spec.withStorageClassName('do-block-storage')
      + persistentVolumeClaim.spec.withAccessModes(
        ['ReadWriteOnce']
      )
      + persistentVolumeClaim.spec.resources.withRequests(
        { storage: '1Gi' }
      ),
  },
}
