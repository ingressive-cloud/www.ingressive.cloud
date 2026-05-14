---
title: "Connectors"
description: "Ingressive Connectors join your origin servers to our global self-healing mesh network. Run them on Kubernetes, Docker, or any host."
weight: 10
icon: "workflow"
---

# Connectors
Ingressive Connectors are the magic ingredient that lets your origin servers join our self-healing, self-optimising, global mesh network. The Connector is distributed as a Docker Image that you can run anywhere. 

To get started, open the [Ingressive Console](https://console.ingressive.cloud), click Connectors, and click New. You will be guided through one of the installation processes below.

## Kubernetes Ingress Controller
The primary and easiest way to use the Ingressive Connector is to install the Ingressive Controller on a Kubernetes cluster. When you create a Connector in the Ingressive Console, the Console will guide you through installing an Ingress Controller. 

For the [full documentation for Ingress Controllers](./ingress_controller.md), including creating simple Ingresses. 

## Docker
Docker Compose allows you to plug Ingressive simply and easily into existing legacy setups, such as existing web servers, virtual machines, or cloud VPCs. When you create a Connector in the Ingressive Console, select Docker Compose to be guided through that path. 

See the [full documentation for Docker](./docker.md) here to get started. 

## Services
Each Connector has a list of Services that it is allowed to access. This lets you keep track of what can be seen by Ingressive, and provides a list of all endpoints that could be potentially public. 

To add Services to a Connector:
- Open the Ingressive Console
- Click Connectors in the sidebar
- Click on the Connector you want to configure Services for
- Add the Service, for example `httpbin:8080` or `httpbin` or `https://www.remote.site`.
    - To connect Services on the Connector's host, use `host.docker.internal` (`host.containers.internal` on Podman)
- Add a Site: You can expand the "Sites" section of the Connector config, and add a Site pointing to a Service on the Connector right there. 

