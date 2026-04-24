---
title: "IAM"
weight: 30
icon: "shield-user"
---

# IAM

Ingressive uses a policy-based Identity and Access Management system. All actions within the Ingressive Cloud are controlled by policies. Here are a couple of examples:

```yaml
version: 1
rules:
  - resources: ["{{.account}}/site:*", "{{.account}}/domain:*"]
    actions: ["site:read", "domain:read"]
    effect: allow
```
The example above is a read-only policy that allows users to read all sites and domains within the Account, but does not allow them to do any other actions, such as creating, updating or deleting resources. 

## Understanding Policies
A policy is applied on an `account`, against a `user`. It consists of a set of rules, and each rule is composed of three parts.

### Resource IDs 
Every resource in Ingressive has a hierarchical, textual ID. Here are some examples:
```
account:contoso
account:contoso/domain:contoso.com
account:contoso/site:docs.contoso.com
account:contoso/domain:contoso.com/record:A:docs.contoso.com
```

### Actions
Every action you can perform on a resource is mapped to a textual `action ID`. Here are some examples:
```
domain:create
site:read
record:update
account:delete
site:purge
```

These follow the pattern `type:action` where `action` is derived from the CRUD acronym. `create`, `read`, `update` and `delete`, with some special cases like `site:purge`. 

### Effect 
Effect is simply whether the rule is to `allow` or `deny` the action. Take, for example, the built-in `admin` policy:
```yaml
version: 1
rules:
  - resources: ["**"]
    actions: ["**"]
    effect: allow
  # Prevent self-lockout
  - resources: ["{{.user}}"]
    actions: ["**"]
    effect: deny
```
This allows a user to perform all actions, but importantly, prevents them performing any action affecting their own access to the Account. 

> **Tip:** Importantly, an explicit deny overrides any allow action. Even if the policy engine encounters an allow, it will continue to process all policies, and any explicit deny will be used.

Only `effect: allow` grants access, `effect: deny` or **any other string** is treated as an explicit deny. This is not case-sensitive.

## Logs
All policy decisions are logged, the log can be accessed by opening Ingressive Cloud and navigating to `IAM` > `Log`.

## Templating
Policies support templating using Go templates. The following variables are available:

- `account`: The current Account ID
- `user`: The current user ID

This means you don't have to type out the Account ID or user ID in every policy, you can just use the variables.
For example, the following policy allows a user to manage only one specific site within the Account:

```yaml
version: 1
rules:
  - resources: ["{{.account}}/site:docs.contoso.com",]
    actions: ["site:*"]
    effect: allow
```
