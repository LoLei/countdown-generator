local k = import 'github.com/grafana/jsonnet-libs/ksonnet-util/kausal.libsonnet';

{
  _config:: {
    ctd_gen: {
      containerPort: 3000,
      name: 'countdown-generator',
      tag: '0.0.1',
      servicePort: 80,
    },
  },

  local deployment = k.apps.v1.deployment,
  local container = k.core.v1.container,
  local containerPort = k.core.v1.containerPort,
  local service = k.core.v1.service,
  local servicePort = k.core.v1.servicePort,

  local labels = { name: $._config.ctd_gen.name },

  ctd_gen: {
    deployment: deployment.new(
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
            name='myContainerPort',
            port=$._config.ctd_gen.containerPort,
          )]
        ),
      ],
    ),
    service:
      service.new(
        name=$._config.ctd_gen.name,
        selector=labels,
        ports=[servicePort.new(
          port=$._config.ctd_gen.servicePort,
          targetPort=$._config.ctd_gen.containerPort,
        )]
      )
      + service.metadata.withLabels(labels),
  },
}
