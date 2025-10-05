import { Metadata } from "next";
import { Docs } from "@/components/Docs";

const content = `# Cards
Duplicate a page or section with ease, then emphasize important information or links using customizable layouts and icons.

Cards act as visual containers for your content, giving you flexibility to combine text, icons, images, and links in a clean and organized way.

## Cards Usage
You can use the Cards component directly within your MDX files without any import. The following example shows a basic usage:

~~~mdx
<Card title="Note" icon="BadgeInfo">
  Doccupine CLI is a command-line tool that helps you create and manage your Doccupine project. It provides a simple and intuitive interface for creating and configuring your project.
</Card>
~~~

<Card title="Note" icon="BadgeInfo">
  Doccupine CLI is a command-line tool that helps you create and manage your Doccupine project. It provides a simple and intuitive interface for creating and configuring your project.
</Card>
`;

export const metadata: Metadata = {
  title: "Cards",
  description: "Doccupine CLI commands",
  icons: "https://doccupine.com/favicon.ico",
  openGraph: {
    title: "Cards",
    description: "Doccupine CLI commands",
    images: "https://doccupine.com/preview.png",
  },
};

export default function Page() {
  return <Docs content={content} />;
}
