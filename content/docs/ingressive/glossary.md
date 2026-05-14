---
title: "Glossary"
description: "Definitions for the core Ingressive concepts: Accounts, Domains, Connectors, Sites, Locations, Services, and the mental model that ties them together."
weight: 10
icon: "book-search"
---
# Glossary
This page describes all the terms you need to know to use Ingressive, and how the Ingressive mental model works. 

## Basic Terms
Ingressive allows you to bring a domain (or subdomain), and install a Connector on your host server. Sites are how you connect the two.

### Account
All Ingressive resources live under an Account. This is distinct from your User. You can give other users access and create system users under IAM. 

### Connector
The [Ingressive Connector](../../connector) is a small open source reverse proxy that connects your servers to our global, self optimising, zero trust mesh network. 

#### Replicas
One or more identical copies of the Connector software running. 

#### Services
Endpoints the Connector is allowed to access. You must add a Service in the Connector's configuration before you can point Sites to it. 

### Domain
Refers to a domain name, like `secretprojectalpha.dev` or `ing.mycompany.net` that you add to Ingressive. Once added, Ingressive handles routing these sites, or you can manually manage DNS in with our Console or API. 

### Site
A Site connects the two. If you create a Site such as `main.ing.mycompany.net`, you can set it to route to any Connector Service. 