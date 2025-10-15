import { Metadata } from "next";
import { Docs } from "@/components/Docs";
import config from "@/config.json";

const content = `# Code
Learn how to display inline code and code blocks in documentation.

## Adding Code Samples
Both inline code snippets and full code blocks are supported. Code blocks offer customization for syntax highlighting and more to improve readability and user experience.

### Inline Code
Highlight code within text by wrapping it with backticks:

\`\`\`text
Enclose any \`word\` or \`phrase\` in backticks to format it as code.
\`\`\`

Enclose any \`word\` or \`phrase\` in backticks to format it as code.

## Code Blocks
To present larger code samples, use triple backticks for fenced code blocks. Each block can be copied, and—if assistant features are enabled—users can request explanations.

You may specify the language for highlighting:

~~~text
\`\`\`java
class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`
~~~


\`\`\`java
class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`
`;

export const metadata: Metadata = {
  title: `Code ${config.name ? "- " + config.name : "- Doccupine"}`,
  description: `Learn how to display inline code and code blocks in documentation.`,
  icons: `${config.icon || 'https://doccupine.com/favicon.ico'}`,
  openGraph: {
    title: `Code ${config.name ? "- " + config.name : "- Doccupine"}`,
    description: `Learn how to display inline code and code blocks in documentation.`,
    images: `${config.preview || 'https://doccupine.com/preview.png'}`,
  },
};

export default function Page() {
  return <Docs content={content} />;
}
