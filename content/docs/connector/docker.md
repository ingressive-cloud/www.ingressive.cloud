---
title: "Docker"
description: "Run the Ingressive Connector as a container with Docker or Podman to route services from any host onto the Ingressive edge."
weight: 10
icon: "boxes"
tags: ['docker', 'getting started']
---
# Docker
The Ingressive Connector is distributed as a container image that you can run using your preferred container engine.
- Not using containers? We recommend using Podman, as it's light weight and Docker compatible. 
- Using Kubernetes? Check out the [Ingress Controller](./ingress_controller.md) documentation. 

## Getting Started
To start routing your services using the container image: 
1. Open the [Ingressive Console](https://console.ingressive.cloud)
1. Click Connectors in the side bar. 
1. Give your connector an ID and a name. 
![Connector Setup Page](../../images/connector-setup.png)
1. Use the provided Docker Compose configuration to install the connector
1. The Console will see when the Connector has connected to the Ingressive network
1. Add a [Service](./_index.md#services) to your Connector
1. Expand the Sites section to route a Site to a Connector Service


## Troubleshooting

### Can't Connect to `host.docker.internal`

By default, many container engines don't configure access to the host.

You may need to modify your Docker Compose file on certain platforms. 
```yaml
services:
  connector:
    extra_hosts:
      - "host.docker.internal:host-gateway"
```

Podman Compose uses `host.containers.internal` by default. 