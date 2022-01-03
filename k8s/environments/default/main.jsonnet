local k = import 'github.com/grafana/jsonnet-libs/ksonnet-util/kausal.libsonnet';

function(tag=null) {
  _config:: {
    ctdGen: {
      port: 3000,
      name: 'countdown-generator',
      tag: if tag != null then tag else 'latest',
      url: 'countdown.lolei.dev',
      volumeMountPath: '/app/data',
      volumeName: 'db-volume',
      configMapName: '%s-cm' % self.name,
      deploymentName: '%s-depl' % self.name,
      containerName: '%s-cont' % self.name,
      serviceName: '%s-svc' % self.name,
      ingressName: '%s-ing' % self.name,
      certSecretName: '%s-cert' % self.name,
      pvcName: '%s-pvc' % self.name,
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
        name=$._config.ctdGen.configMapName,
        data={ CTD_GEN_DB_LOCATION: '%s/countdownDb' % $._config.ctdGen.volumeMountPath }
      ),
    deployment:
      deployment.new(
        name=$._config.ctdGen.deploymentName,
        replicas=1,
        containers=[
          container.new(
            name=$._config.ctdGen.containerName,
            image='ghcr.io/lolei/%s:%s' % [$._config.ctdGen.name, $._config.ctdGen.tag]
          )
          // Apparently all ports must have a name in the Grafana wrapper:
          // https://github.com/grafana/jsonnet-libs/blob/2619bb87ecb336a59616df4c1fe8ced668bdbc94/ksonnet-util/grafana.libsonnet#L6
          + container.withPorts(
            [containerPort.new(
              name='myPort',
              port=$._config.ctdGen.port,
            )]
          )
          + container.withEnvFrom(
            envFromSource.configMapRef.withName($.ctdGen.configMap.metadata.name)
          )
          + container.withVolumeMounts([
            {
              mountPath: $._config.ctdGen.volumeMountPath,
              name: $._config.ctdGen.volumeName,
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
            name: $._config.ctdGen.volumeName,
            persistentVolumeClaim: { claimName: $._config.ctdGen.pvcName },
          },

        ]
      ),
    service:
      k.util.serviceFor(self.deployment)
      + service.metadata.withName($._config.ctdGen.serviceName),
    ingress:
      ingress.new(
        name=$._config.ctdGen.ingressName,
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
            secretName: $._config.ctdGen.certSecretName,
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
                      name: $._config.ctdGen.serviceName,
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
        name=$._config.ctdGen.pvcName
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
