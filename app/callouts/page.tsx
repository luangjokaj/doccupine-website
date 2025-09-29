import { Metadata } from "next";
import { Docs } from "@/components/Docs";

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
</Callout>`;

export const metadata: Metadata = {
  title: "Callouts",
  description: "Doccupine CLI commands",
  icons: "https://doccupine.com/favicon.ico",
  openGraph: {
    title: "Callouts",
    description: "Doccupine CLI commands",
    images: "https://doccupine.com/preview.png",
  }
};

export default function Page() {
  return (
    <Docs content={content} />
  );
}