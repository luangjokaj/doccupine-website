import { Metadata } from "next";
import { Docs } from "@/components/Docs";
import configData from "@/config.json";

interface Config {
  name?: string;
  icon?: string;
  preview?: string;
}

const config = configData as Config;

const content = `# Accordion
Interactive panels for toggling visibility of content.

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
</Accordion>

## Properties

<Field value="title" type="string" required>
  The title of the accordion.
</Field>

<Field value="children" type="node" required>
  The content of the accordion.
</Field>
`;

export const metadata: Metadata = {
  title: `Accordion ${config.name ? "- " + config.name : "- Doccupine"}`,
  description: `Interactive panels for toggling visibility of content.`,
  icons: `${config.icon || "https://doccupine.com/favicon.ico"}`,
  openGraph: {
    title: `Accordion ${config.name ? "- " + config.name : "- Doccupine"}`,
    description: `Interactive panels for toggling visibility of content.`,
    images: `${config.preview || "https://doccupine.com/preview.png"}`,
  },
};

export default function Page() {
  return <Docs content={content} />;
}
