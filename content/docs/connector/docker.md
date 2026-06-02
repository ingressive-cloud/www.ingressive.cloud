---
title: "Docker"
description: "Run the Ingressive Connector as a container with Docker or Podman to route services from any host onto the Ingressive edge."
weight: 10
icon: "boxes"
tags: ['docker', 'getting started']
---
# Docker
The Ingressive Connector is distributed as a container image that you can run using your preferred container engine.
- Not using containers? You are now. `apt install podman podman-compose` immediately.  
- Using Kubernetes? You want the [Ingress Controller](./ingress_controller.md) documentation. 

## Getting Started
To get started with the Connector you need to know three things.
- **Connectors** (here). A container you install on your origin so Ingressive can pass traffic in.
- **Services** allow a connector to reach a given host. Localhost, another container, or another host on the network.
- **Sites** are how you point websites at these *services*. This is where you configure caching, Access Control, anything else you expect Ingress to do.

To get started, open the [Ingressive Console](https://console.ingressive.cloud), hit Add, hit Origin. The Console will guide you through installation, adding services, then connecting sites. 

Here are the full steps:

To start routing your services using the container image: 
1. Open the [Ingressive Console](https://console.ingressive.cloud)
1. Click Connectors in the side bar. 
1. Give your connector an ID and a name. 
![Connector Setup Page](../../images/connector-setup.png)
1. Use the provided Docker Compose configuration to install the connector
1. The Console will see when the Connector has connected to the Ingressive network
1. Add a [Service](./_index.md#services) to your Connector
1. Expand the Sites section to route a Site to a Connector Service


## Networking
Remember, the Connector is a container on your machine. `localhost` points to the local *container*, not the host. 

You can fix this by using `host.docker.internal`, which is nearly always connected. If not, try adding these lines to your Docker Compose


```yaml
services:
  connector:
    extra_hosts:
      - "host.docker.internal:host-gateway"
```

Podman Compose uses `host.containers.internal` by default. 

### Host Mode
You can also set the container to `network_mode: "host"`. This allows the Connector to use `localhost`, but it also gives the container access to everything your computer can access.
```yaml
services:
  connector:
    network_mode: "host"
```
Try using `host.docker.internal` first, try this as a fallback. 

