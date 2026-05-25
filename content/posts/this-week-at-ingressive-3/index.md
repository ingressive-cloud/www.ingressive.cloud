---
title: "This Week at Ingressive 3"
date: 2026-05-25T11:00:00+12:00
draft: true
description: "Progress report: Onboarding wizards, a hardening pass, health checks, and a proper reverse proxy in the Connector"
tags: ["this week"]
---
# This Week at Ingressive: Week 3

After last week's big-feature push (Controller alpha, new Site UI), this week was about turning the lights on properly: making the first-run experience feel like a product, hardening what we'd just shipped, and tightening the data path through the Connector.

## Onboarding & Wizards

The biggest visible change. New users now land in a guided flow rather than a blank dashboard — separate wizard steps for adding a domain, pointing it at an origin (direct or via a Connector), and turning that into a Site. The Controllers and Domains pages got the same treatment, and we picked up a Discord link in the global nav while we were in there.

Behind the wizard, Domains learned how to do its own NS sweep and verification, and Management grew a `cert_mirror` so freshly-issued certs land on edges without waiting for the next site reconcile.

## Hardening Pass

Mid-week was a deliberate security and robustness sweep across the API and the Nginx config pipeline:

- A new `nginx_safe_strings` validation layer + `nginx_template_safety_test.go` to keep user-supplied values from escaping into the generated Nginx config.
- Tightened authorisation checks in the IAM, Site, Settings, Policy, and SSE handlers — several places were doing the right policy check but in the wrong order.
- Site creation now flows through a shared `httperr` responder and a single `sites/apply.go` path, so the API and the Management reconciler can't disagree about what "invalid" means.
- New `site_security_test.go` covers the cases we found.

It's the kind of week that produces a small diff per change and a long list of changes — exactly what dogfooding is supposed to flush out.

## Connector: Proper Reverse Proxy

The Connector's data path was rewritten on top of `http.ReverseProxy` instead of a hand-rolled `http.Client` round-trip. That fixes header handling end-to-end:

- `X-Forwarded-*` headers are now preserved through to the backend.
- Nice error pages when the backend is unreachable, instead of a bare 502 from the platform edge.
- Connector now reports its own version on connect, so we can see what's actually deployed across customers.

The Ziti-specific bits were also split out into their own package, which made all of the above much less painful to test.

## Health Checks

Both the API and Management now expose proper liveness/readiness probes, wired into the Helm chart. Management's health endpoint actually checks NATS and Postgres rather than just returning 200, which already caught one stuck reconciler in dev.

## Controller

The Controller got its first real shakedown this week — the Kubernetes-side repo landed its initial version, the bootstrap behaviour was fixed up, and the backend now has full lifecycle tests for both Controllers and their paired Connectors. Pinned to `:latest` for now while the API surface is still moving.

## Next Steps

We're close to the point where the onboarding wizard, the Controller, and the hardened Site pipeline are good enough to put in front of a friendly external user. Next week is likely about closing the remaining gaps that show up when someone who isn't us tries to set up their first Site.
