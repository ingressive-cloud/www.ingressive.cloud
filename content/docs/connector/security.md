---
title: "Security "
description: "Ingressive Connectors join your origin servers to our global self-healing mesh network. Run them on Kubernetes, Docker, or any host."
weight: 10
icon: "lock"
---

# Connector Security
{{<callout type="warning">}}
**Security Checkpoint**

Installing the connector allows Ingressive to *act as the machine it's installed on*. **Services** control the destinations Ingressive can access, but they can be changed at any time. This can include:
- Anything on the Server
- Anything on the Server's network
- Any host on the internet

Only configure appropriate services, and think about what services someone could configure later. 

**Stop and think**.

Are you allowed to install a Remote Access Tool on the machine you're using for the connector?
{{</callout>}}