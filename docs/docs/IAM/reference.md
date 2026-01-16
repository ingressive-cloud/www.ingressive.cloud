---
icon: lucide/book-user
---
# IAM Reference
This page is the reference for how the IAM policy system works.

## Resources 
Every resource in the Ingressive Cloud has a hierarchical, textual ID used by the IAM system to check access permissions.
### Accounts
An Account is the root level of the Identity and Access Heirarchy. Policies are applied by an Account, against a User. When you register an Account, you supply a username. An `account` is created with this username, as well as a `user`.
```
account:{{slug}}
account:contoso
```
Accounts have the following actions:
- `account:read`
- `account:update`
- `account:delete`
- `policy:manage`
    Allows managing IAM policies for the Account. An administrative action.
- `audit_log:read`
    Allows reading the IAM audit log for the Account. 
### Domains
The Resource ID for a Domain has the following format:
```
{{account.ResourceID}}/domain:{{domain_name}}
Examples:
account:contoso/domain:contoso.com
account:contoso-production/domain:contoso.com
```
Domains have the following actions: 
- `domain:create`
- `domain:read`
- `domain:update`
- `domain:delete`

### DNS Records
The Resource ID for a DNS Record has the following format:
```
{{domain.ResourceID}}/record:{{type}}:{{domain_name}}
Examples:
account:contoso/domain:contoso.com/record:A:www
account:contoso/domain:contoso.com/record:TXT:_acme-challenge
```
Only the subdomain part of the DNS record is included in the Resource ID. The type is also included to allow for more granular control.

Note that there are many types of DNS records that can be used for similar or overlapping purposes (e.g. CNAME vs ALIAS vs ANAME). The IAM system treats each type as a separate resource.

DNS Records have the following actions:
- `record:create`
- `record:read`
- `record:update`
- `record:delete`

### Sites
The Resource ID for a Site has the following format:
```
{{account.ResourceID}}/site:{{hostname}}
Examples:
account:contoso/site:docs.contoso.com
account:contoso-production/site:www.contoso.com
```
Site have the following actions: 
- `site:create`
- `site:read`
- `site:update`
- `site:delete`
- `site:purge`
### Users
The Resource ID for a User has the following format:
```
user:{{username}}
Examples:
user:alice
user:bob
```
Users can also be created under an account, in which case the Resource ID is:
```
{{account}}/user:{{username}}
Examples:
account:contoso/user:alice
account:contoso/user:dyndns-user
```
Users and accounts are separate resources. In the context of IAM policies, all actions affect the user's access to the account.
Users have the following actions:
- `user:read`
    Allows reading the user's access details to the Account.
- `user:manage`
    Allows managing the user's permissions within the Account. Assigning policies, etc. Very powerful permission.
- `user:add`
    Allows adding a user to the Account. The user can be assigned policies while being added. If `user:manage` is not also granted, the user cannot be modified after being added.
- `user:remove`
    Allows removing a user from the Account.
    
