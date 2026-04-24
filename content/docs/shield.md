---
title: "Shield"
weight: 10
icon: shield
---

# Shield

**Ingressive Shield** is our Access and Bot Control system. It is available to all users of Ingressive. Shield can be configured to:
- **Challenge Traffic**: You can challenge all traffic, or use our smart bot protection to only challenge suspicious traffic.
- **Password Protect Routes**: You can set up a Shield config to require one of a list of passwords or sign in with SSO to access specific routes (such as `/admin/`).

## Bot Protection
Ingressive supports three kinds of bot protection:
- **JavaScript Challenge**: Challenge all traffic to run a small piece of JavaScript. This proves they are running a real browser. It catches most simple bots while being almost transparent to your users. 
- **Captcha Challenge**: Traffic must solve a captcha to enter. Catches some more aggressive bots, but worse usability.
- **Default Protection**: Let Ingressive decide - most traffic will pass uninterrupted.
- **Block** - You can block certain paths entirely.

## Access Control
Ingressive Access Control allows you to put password or SSO protection in front of your application. Traffic must pass through Ingressive Access Control at the edge before being allowed through at all. This is perfect for:
- **Internal Applications** - Internal applications that users must be logged into will require an initial login to Ingressive, then log in to your site. This prevents the public from interacting with your backend at all.
- **Authenticated Applications** - If your users must sign in with SSO anyway, adding it to Ingressive is easy. 
- **Admin Dashboards** - You can block the public from accessing `/admin/` while letting them browse the public parts of your site. Perfect for off the shelf CMSes.

## Setting Up
Ingressive allows you to set up a single Shield configuration, then associate it with as many Sites and Locations as you wish. This allows you to standardise the configuration across your applications.

### Getting Started 
1. In the Ingressive Console, click [Shield](https://console.ingressive.cloud/shield).
1. Click "Create Shield Config"
1. Select your protection type: `JavaScript`, `Captcha` or `Block`.
1. Set up Access Control. Currently, only shared passwords are supported. Please 