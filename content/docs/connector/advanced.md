---
title: "Advanced"
description: "Advanced Connector setups on Ingressive's self-optimising mesh network — high availability, multi-host, and routing patterns."
weight: 20
icon: "graduation-cap"
---

# Advanced - Connector

The Ingressive Connector is designed to be simple and slot into your existing setup as much as possible. However, Ingressive is also capable of some advanced setups thanks to our self-optimising mesh network. 

If you want to try any of these advanced setups, we'd advise contacting the Ingressive team for guidance first. 

## Global Load Balancing
It's possible to install the Connector in multiple global locations. Ingressive will automatically route traffic to the closest one. 

You ***must*** ensure the service names used are *all* available to *all* instances of the Connector.

### With Docker
Install the Connector once, it will generate a persistent configuration file. Copy this configuration file to another server, then start another instance of Connector. It will pick up the configuration and begin serving traffic. 

### With Kubernetes
Pick one instance to be your Ingress Controller. It will set up a Secret and a Deployment for the Connector. Copy these Kubernetes objects exactly to another Kubernetes cluster that has the same required services available. Make sure Service names and Namespaces match exactly on each Kubernetes cluster. 

## Connector to Connector
It's possible we can route traffic from one connector to another, forming a secure tunnel across our global mesh network. This setup will require the assistance of the Ingressive team and will require a support plan. 