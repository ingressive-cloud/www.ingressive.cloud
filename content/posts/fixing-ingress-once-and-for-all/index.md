---
title: "Fixing Ingress Once and for All"
date: 2026-05-12T16:14:39+12:00
draft: false
description: "Fine, I'll do it myself"
tags: ["Kubernetes", "ingressive", "musings"]
---
# Fixing Ingress Once and for All
Around the middle of last year at work, I realised that a customer's Nginx Ingress Controller hadn't been updated in, well, ever. This isn't an issue with Nginx, this is kind of a known bugbear in the Kubernetes and Helm ecosystem. 

The problem was, I couldn't update it. At some point, the new version diverged too far from the old. Trying to update the Helm chart just failed, things couldn't be reconciled, trying to fix issues manually just revealed more threads to pull. 

## The Problem
Having the edge of a Kubernetes cluster be many months out of date, with no clear way to resolve it, was obviously a major problem. We could uninstall and reinstall the Ingress Controller, but then we'd have to replace a heap of DNS records all at once. This is the fundamental problem with Ingress: There's so many moving parts. Here's a non-exhaustive list of everything you have to think about: 

- Load Balancers - Maybe it will annotate its service for your platform. Maybe not. These also cost money, with an arcane pricing formula. 
- Certificates - Installing Cert Manager and setting up a ClusterIssuer is another morning's work. The install always fails for some reason. 
- Security - We can't use an ALB WAF. Do we install ModSecurity? How do we block pesky bad IPs? 
- DNS - On top of all this, you probably have to manually set up DNS records. Or set up and maintain external-dns. 

## And Then, They Retired Nginx Ingress Controller
The team (of one) behind the community Nginx Ingress Controller decided they had had enough maintaining a core piece of the Kubernetes ecosystem for free. And fair enough too. 

This is also a fundamental problem. There's no incentive to contribute either financially or code to a piece of infrastructure that you just install and move on with your day.

## Fine, I'll Do it Myself
I realised I'm spending a ton of time maintaining all these moving parts. Every customer uses one or more load balancers, external IPs, certificate renewal. My solution was to build Ingressive. 

Ingressive solves all of these problems. 

Firstly, you install our connector or Ingress Controller on your side. The connector connects *out* to the Ingressive network. 

Ingressive handles everything else. DNS, certificates, and a basic WAF are all sorted. Your services are dark. You don't need a load balancer or port forwarding. 