import { Metadata } from "next";
import { Docs } from "@/components/Docs";

const content = `# Accordion
Interactive panels for toggling visibility of content

Accordion elements help organize information by letting users show or hide sections as needed. They’re an effective way to manage progressive disclosure and simplify navigation through dense or optional content.

## Accordion Usage
You can use the Accordion component directly within your MDX files without any import. The following example shows a basic usage:

~~~mdx
<Accordion title="What is MDX?">
    You can put any content in here, including other components, like code:

   \`\`\`java HelloWorld.java
    class HelloWorld {
        public static void main(String[] args) {
            System.out.println("Hello, World!");
        }
    }
  \`\`\`
</Accordion>
~~~

<Accordion title="What is MDX?">
    You can put any content in here, including other components, like code:

   \`\`\`java HelloWorld.java
    class HelloWorld {
        public static void main(String[] args) {
            System.out.println("Hello, World!");
        }
    }
  \`\`\`
</Accordion>`;

export const metadata: Metadata = {
  title: "Accordion",
  description: "Doccupine CLI commands",
  icons: "https://doccupine.com/favicon.ico",
  openGraph: {
    title: "Accordion",
    description: "Doccupine CLI commands",
    images: "https://doccupine.com/preview.png",
  }
};

export default function Page() {
  return (
    <Docs content={content} />
  );
}