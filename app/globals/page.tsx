import { Metadata } from "next";
import { Docs } from "@/components/Docs";
import configData from "@/config.json";

interface Config {
  name?: string;
  icon?: string;
  preview?: string;
}

const config = configData as Config;

const content = `# Global Configuration
Use a \`config.json\` file to define project‑wide metadata for your documentation site. These values are applied to every generated page unless a page overrides them in its own frontmatter.

## config.json
Place a \`config.json\` at your project root (the same folder where you execute \`npx doccupine\`) to define global metadata for your documentation site.

\`\`\`json
{
  "name": "Doccupine",
  "description": "Doccupine is a free and open-source document management system that allows you to store, organize, and share your documentation with ease.",
  "icon": "https://doccupine.com/favicon.ico",
  "preview": "https://doccupine.com/preview.png"
}
\`\`\`

## Fields
- **name**: The primary name of your documentation website. Displayed in the site title and used in various UI elements.
- **description**: A concise summary of your project, used in site metadata (e.g., HTML meta description) and social previews when not overridden.
- **icon**: The favicon for your site. You can provide a full URL or a relative path to an asset in your project.
- **preview**: The Open Graph image used when links to your docs are shared. Accepts a full URL or a relative path.

## Per‑page overrides
Any page can override these global values by defining the same keys in its frontmatter. When present, the page’s values take precedence over \`config.json\` for that page only.

Example frontmatter in an \`.mdx\` file:

\`\`\`text
---
title: "My Feature"
description: "A focused description just for this page."
name: "My Product Docs"
icon: "https://doccupine.com/favicon.ico"
preview: "https://doccupine.com/preview.png"
date: "2025-01-15"
category: "Guides"
---
\`\`\`

If a key is not specified in a page’s frontmatter, Doccupine falls back to the corresponding value in \`config.json\`.`;

export const metadata: Metadata = {
  title: `Globals ${config.name ? "- " + config.name : "- Doccupine"}`,
  description: `Configure global settings for your documentation.`,
  icons: `${config.icon || "https://doccupine.com/favicon.ico"}`,
  openGraph: {
    title: `Globals ${config.name ? "- " + config.name : "- Doccupine"}`,
    description: `Configure global settings for your documentation.`,
    images: `${config.preview || "https://doccupine.com/preview.png"}`,
  },
};

export default function Page() {
  return <Docs content={content} />;
}
