---
title: "Ingressive Controller"
weight: 10
icon: "ship-wheel"
---
# Ingressive Controller
The Ingressive Controller is a Kubernetes Ingress Controller that uses Ingressive as the edge / load balancer network for any Kubernetes cluster. You do not have to open any ports, worry about IP addresses, or installing cert-manager and making it work with your Ingress Controller implementation. All the rest is handled by Ingressive. 

## Getting Started
To set up an Ingress Controller;
1. Open the [Ingressive Console](https://console.ingressive.cloud)
1. If you haven't, adding a [domain](../domain.md) is highly recommended. 
1. Click `Connectors` in the sidebar. 
1. Click New.
1. Give the new Controller a name. Something like, `prod`, `us-west-1`, or `john-laptop`.
1. When prompted, click the Ingress Controller path. 
1. Ingressive will guide you through Ingress Controller installation in your Kubernetes cluster. 

## Create your first Ingress
