---
title: "Getting Started"
description: "Get from zero to traffic on Ingressive in about five minutes — register, add a domain, install a Connector, and create your first Site."
weight: 9
icon: "graduation-cap"
---
# Getting Started
Ingressive is your cloud ingress controller. We take traffic at the edge, and send it anywhere. 

In **Docker**: It is your Proxy Manager or Caddy. 

In **Kubernetes** it is your Ingress Controller.

On a **Server** it is your CDN or tunnel. 

## Need To Know
Here are all the concepts and how they tie together: 

- **Connector**: A container you run on your origin. Connects out to Ingressive so we can pass traffic in.
- **Sites**: Are how you connect *hostnames* to *things*
- **Domains**: Ingressive manages your domain, allowing us to point a *hostname* like www.yoursite.com to anything.

With these building blocks, Ingressive can send any traffic, any where. 

To connect `internalapp.my.name` to your server or VPS, install a *connector*, point a *site* to it. 

To send `coolnewapp.mydomain.co.uk` to your laptop, create a *connector*, point a *site* to it. 

To send `docs.yourcompany.com` to Vercel, create a site, give the Vercel address as the upstream. 

## Get Started
To join the Early Access program, {{< join-discord "Join the Discord" >}} and request an invite. 

You will need a domain to get the most out of Ingressive. That one you've been holding onto for five years for that project you're totally going to finish will do.

Then you can follow a guide depending on your origin:
- [On a Server](../get-started/on-a-server.md) - installing the connector and running a site on a server.
- [With Containers](../get-started/with-containers.md) - exposing an app that's already running in a container (Docker etc)
- [With Kubernetes](../get-started/with-kubernetes.md) - install the Ingress Controller and manage sites automatically

## Next Steps
Once your site is running, go into the site settings. You can change a lot of things in here. 