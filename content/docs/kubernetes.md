---
title: "Kubernetes"
description: "How Ingressive integrates with Kubernetes — a primer covering the platform plus the bits you need to run a cluster on the Ingressive edge."
weight: 10
icon: "ship-wheel"
---
# Kubernetes 
Kubernetes is a container orchestrator, which is quickly becoming the "run-anywhere cloud". Ingressive expands its capabilities greatly, by truly making it "run-anywhere" without having to think about ports, IPs, certificates and load balancers. 

There are plenty of great guides online, this page is a simple reference / getting started guide, as Kubernetes relates to Ingressive. 

## Ingressive and Kubernetes
Using Kubernetes as a target for Ingressive is first-class supported and the recommended way to deploy the [Connector](./connector/) to make your services available to Ingressive. Check out the [Ingressive Controller](./connector/ingress_controller.md) documentation to learn more.

## Running Kubernetes
There are many ways to run Kubernetes. You could run it on your favourite Hyperscaler cloud. In that case, you usually get some nice management features like logging and managed backups. 

You could run Kubernetes on bare metal, or your homelab box. For this, we recommend K3s or Microkube to get started. These let you install Kubernetes like a system package, with the right things installed to get you started. 

Finally, you could run Kubernetes on your laptop, or Docker containers. 

## Running on your Laptop 
To run Kubernetes on your laptop, we highly recommend two tools: 

For Mac, use [OrbStack](https://orbstack.dev/). OrbStack is a Docker Desktop alternative that's both lighter weight, and with first-class support for Kubernetes. 

For other systems, use [kind](https://kind.sigs.k8s.io/) for Kubernetes in Docker. This will let you spin up and down Kubernetes clusters at will, very useful for testing and experimentation. You can, of course, use KinD in OrbStack to manage temporary clusters. 