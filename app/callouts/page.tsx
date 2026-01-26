import { Metadata } from "next";
import { Docs } from "@/components/Docs";
import configData from "@/config.json";

interface Config {
  name?: string;
  icon?: string;
  preview?: string;
}

const config = configData as Config;

const content = `# Callouts
Make your content stand out by using callouts for extra emphasis.

You can format them as Note, Warning, Info, Danger and Success.

## Callouts Usage
You can use the Callouts component directly within your MDX files without any import. The following example shows a basic usage:

~~~mdx
<Callout type="note">
  This is a note callout
</Callout>

<Callout type="warning">
  This is a warning callout
</Callout>

<Callout type="info">
  This is an info callout
</Callout>

<Callout type="danger">
  This is a danger callout
</Callout>

<Callout type="success">
 This is a success callout
</Callout>
~~~

<Callout type="note">
  This is a note callout
</Callout>

<Callout type="warning">
  This is a warning callout
</Callout>

<Callout type="info">
  This is an info callout
</Callout>

<Callout type="danger">
  This is a danger callout
</Callout>

<Callout type="success">
 This is a success callout
</Callout>

## Properties

<Field value="type" type="string" required>
  The type of the callout.
</Field>

<Field value="children" type="node" required>
  The content of the callout.
</Field>`;

export const metadata: Metadata = {
  title: `Callouts ${config.name ? "- " + config.name : "- Doccupine"}`,
  description: `Make your content stand out by using callouts for extra emphasis.`,
  icons: `${config.icon || "https://doccupine.com/favicon.ico"}`,
  openGraph: {
    title: `Callouts ${config.name ? "- " + config.name : "- Doccupine"}`,
    description: `Make your content stand out by using callouts for extra emphasis.`,
    images: `${config.preview || "https://doccupine.com/preview.png"}`,
  },
};

export default function Page() {
  return <Docs content={content} />;
}
