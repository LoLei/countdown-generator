local k = import 'github.com/grafana/jsonnet-libs/ksonnet-util/kausal.libsonnet';

function(tag=null) {
  _config:: {
    ctd_gen: {
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

  ctd_gen: {
    configMap:
      configMap.new(
        name=$._config.ctd_gen.configMapName,
        data={ CTD_GEN_DB_LOCATION: '%s/countdownDb' % $._config.ctd_gen.volumeMountPath }
      ),
    deployment:
      deployment.new(
        name=$._config.ctd_gen.deploymentName,
        replicas=1,
        containers=[
          container.new(
            name=$._config.ctd_gen.containerName,
            image='ghcr.io/lolei/%s:%s' % [$._config.ctd_gen.name, $._config.ctd_gen.tag]
          )
          // Apparently all ports must have a name in the Grafana wrapper:
          // https://github.com/grafana/jsonnet-libs/blob/2619bb87ecb336a59616df4c1fe8ced668bdbc94/ksonnet-util/grafana.libsonnet#L6
          + container.withPorts(
            [containerPort.new(
              name='myPort',
              port=$._config.ctd_gen.port,
            )]
          )
          + container.withEnvFrom(
            envFromSource.configMapRef.withName($.ctd_gen.configMap.metadata.name)
          )
          + container.withVolumeMounts([
            {
              mountPath: $._config.ctd_gen.volumeMountPath,
              name: $._config.ctd_gen.volumeName,
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
            name: $._config.ctd_gen.volumeName,
            persistentVolumeClaim: { claimName: $._config.ctd_gen.pvcName },
          },

        ]
      ),
    service:
      k.util.serviceFor(self.deployment)
      + service.metadata.withName($._config.ctd_gen.serviceName),
    ingress:
      ingress.new(
        name=$._config.ctd_gen.ingressName,
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
            hosts: [$._config.ctd_gen.url],
            secretName: $._config.ctd_gen.certSecretName,
          },
        ]
      )
      + ingress.spec.withRules(
        [
          {
            host: $._config.ctd_gen.url,
            http: {
              paths: [
                {
                  path: '/',
                  pathType: 'Prefix',
                  backend: {
                    service: {
                      name: $._config.ctd_gen.serviceName,
                      port: {
                        number: $._config.ctd_gen.port,
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
        name=$._config.ctd_gen.pvcName
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
