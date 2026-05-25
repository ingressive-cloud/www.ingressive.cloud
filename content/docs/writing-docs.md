---
title: "Writing Docs"
description: "Reference for all Hugo shortcodes and callout styles available in this site."
weight: 99
---

# Writing Docs

Reference for all shortcodes available when writing content for this site.

---

## Numbered lists with code blocks

A code block inside a list item must be **indented 4 spaces** and preceded by a **blank line**, otherwise it breaks the list and the numbering resets.

```markdown
1. First step

    ```bash
    some code
    ```

1. Second step — numbering continues
```

For nested list items (sub-steps), indent the sub-item 4 spaces and any code block inside it 8 spaces.

---

## Callout (admonishments)

The `callout` shortcode renders a labelled admonishment block. It supports three built-in types: `info` (default), `tip`, and `warning`.

**Syntax**

```
{{%/* callout type="info" */%}}
Your message here. **Markdown** is supported.
{{%/* /callout */%}}
```

**Types**

```
{{%/* callout type="info" */%}}
An informational note.
{{%/* /callout */%}}

{{%/* callout type="tip" */%}}
A helpful tip or best practice.
{{%/* /callout */%}}

{{%/* callout type="warning" */%}}
Something the reader should be careful about.
{{%/* /callout */%}}
```

**Custom title and icon**

You can override the default label and icon using the `title` and `icon` named params. Icons are [Lucide](https://lucide.dev/icons/) names.

```
{{%/* callout type="warning" title="Heads up" icon="flame" */%}}
This will delete everything.
{{%/* /callout */%}}
```

---

## Alert (icon-only callout)

The `alert` shortcode is a lighter variant — no label, just an icon alongside the content. Pass a Lucide icon name as the first positional argument (defaults to `info`).

**Syntax**

```
{{%/* alert "info" */%}}
A quick note without a heading.
{{%/* /alert */%}}
```

**Icon shortcuts**

| Argument | Icon rendered | Style |
|----------|--------------|-------|
| `info` (default) | `info` | info |
| `search` | `search` | info |
| `fire` / `flame` | `flame` | warning |
| `edit` / `pencil` | `pencil` | tip |

Any other [Lucide icon name](https://lucide.dev/icons/) can be passed directly.

```
{{%/* alert "triangle-alert" */%}}
Something to watch out for.
{{%/* /alert */%}}
```

---

## GitHub card

Embeds a card for a public GitHub repository, fetching live metadata (description, stars, forks, language) at build time.

**Syntax**

```
{{< github repo="owner/repo-name" >}}
```

**Example**

```
{{< github repo="tinkeringkiwi/bifrost" >}}
```

---

## Join Discord

Renders a link to the Discord server (URL configured in `hugo.toml` under `params.discordURL`).

**Syntax — default label**

```
{{< join-discord >}}
```

**Syntax — custom label**

```
{{< join-discord "Chat with us on Discord" >}}
```
