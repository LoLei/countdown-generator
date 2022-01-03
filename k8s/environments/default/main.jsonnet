local k = import 'github.com/grafana/jsonnet-libs/ksonnet-util/kausal.libsonnet';

function(tag=null) {
  _config:: {
    ctd_gen: {
      port: 3000,
      name: 'countdown-generator',
      tag: if tag != null then tag else 'latest',
      url: 'countdown.lolei.dev',
    },
  },

  local configMap = k.core.v1.configMap,
  local deployment = k.apps.v1.deployment,
  local container = k.core.v1.container,
  local containerPort = k.core.v1.containerPort,
  local ingress = k.networking.v1.ingress,
  local persistentVolumeClaim = k.core.v1.persistentVolumeClaim,

  local labels = { name: $._config.ctd_gen.name },

  ctd_gen: {
    configMap:
      configMap.new(
        name=$._config.ctd_gen.name,
        data={ CTD_GEN_DB_LOCATION: '/app/data/countdownDb' }
      ),
    deployment:
      deployment.new(
        name=$._config.ctd_gen.name,
        replicas=1,
        containers=[
          container.new(
            name=$._config.ctd_gen.name,
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
            [
              { configMapRef: { name: $.ctd_gen.configMap.metadata.name } },
            ]
          ),
        ],
      )
      + deployment.spec.template.spec.withImagePullSecrets(
        { name: 'regcred' }
      ),
    service:
      k.util.serviceFor(self.deployment),
    ingress:
      ingress.new(
        name=$._config.ctd_gen.name,
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
            secretName: '%s-tls' % $._config.ctd_gen.name,
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
                      name: $._config.ctd_gen.name,
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
        name=$._config.ctd_gen.name
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
