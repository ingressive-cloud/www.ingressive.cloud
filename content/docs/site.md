---
title: "Sites"
weight: 10
icon: panels-top-left
---

# Sites
A **Site** in Ingressive refers to a distinct website. It is a collection of **Locations** which can all be configured differently. 

You might have these sites:
- `docs.contoso.com` - goes to a static server
- `app.contoso.com` - goes to your production Kubernetes cluster
- `www.contoso.com` - Points to a third party host for your landing page

## Locations
Locations allow you to have different configurations for various paths on your site. This allows you to set different configurations. 
- Prefix `/api` - Pointed to your production API in your Kubernetes cluster
- Prefix `/` - Pointed to an Nginx container containing your built frontend and static assets
- Extensions `jpg|css|js|svg|etc` - Pointed to your static assets container, with a 7d edge expiry 