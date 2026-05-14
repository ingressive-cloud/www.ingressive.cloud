---
title: "Domains"
description: "Bring your top-level domain to Ingressive. We handle DNS, certificates, and traffic routing across our global edge network."
weight: 10
icon: "globe"
---

# Domains
A **domain** in Ingressive Cloud refers to a top-level domain name (e.g., `example.com`) that you own and want to handle traffic for using Ingressive. By adding a domain to Ingressive Cloud, you enable our platform to manage DNS settings and route traffic through our global network of edge servers, optimizing content delivery for your users.

## About Domains
Adding a domain to Ingressive is highly recommended. This lets Ingressive handle every step of Ingress, from DNS to certificates. If you don't want to bring your primary domain just yet, consider the following:
- Bring `dev.yourcompany.com` or `ingressive.yourcompany.com`
- Buy a domain like `secretprojectalpha.dev` and add that. 

Ingressive can work with external domains. You will need some tooling around making sure the correct record is pointed to `edge.ingressive.cloud` before creating Ingress objects in Kubernetes. 

## Creating a Domain
To create a domain in Ingressive Cloud:

1. **Go to [Onboarding](https://console.ingressive.cloud/onboard)**: Log in to your Ingressive Cloud dashboard and go to the onboarding section.
2. **Select "Add Domain"**: Choose the option to add a new domain.
3. **Enter Domain Details**: Enter your domain name and add the domain.
4. **Bring any Records**: If you have existing records that must keep working, add them now in your domain's settings page.
4. **Configure DNS Settings**: After creating the domain, configure your domain's DNS settings at your domain registrar to point to Ingressive Cloud's nameservers.
5. **Confirm Successful Transfer**: 

## Our Nameservers
Once you have created a domain in Ingressive Cloud, you will need to update your domain's DNS settings to use our nameservers. The nameservers for Ingressive Cloud are:

- `ns1.ingressive.cloud`
- `ns2.ingressive.cloud`

Please ensure that you update these settings at your domain registrar to enable Ingressive Cloud to manage your DNS and optimize content delivery for your domain.

## Registering a Domain
Currently, Ingressive does not support domain name registration. Please use the domain registrar of your choosing. We hear good things about [Porkbun](https://porkbun.com).

## Transfer Service
If you're moving your production traffic to Ingressive, our team is available to assist with white glove onboarding or advice. Please [tell us about your project](https://docs.google.com/forms/d/e/1FAIpQLSfjBP1u0hZS1em2fKvpl6JYMsGdRcNwJaCYaOIz1lDMVmm-0w/viewform) to request onboarding assistance. 