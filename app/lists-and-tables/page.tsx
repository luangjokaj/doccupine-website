import { Metadata } from "next";
import { Docs } from "@/components/Docs";
import configData from "@/config.json";

interface Config {
  name?: string;
  icon?: string;
  preview?: string;
}

const config = configData as Config;

const content = `# Lists and Tables
Present structured information using lists or tables.

## Lists
Markdown supports both *ordered* and *unordered* lists, as well as nested list structures.

### Ordered List
Start each item with a number followed by a period to create an ordered list.

\`\`\`md
1. First item
2. Second item
3. Third item
4. Fourth item
\`\`\`

1. First item
2. Second item
3. Third item
4. Fourth item


### Unordered List
Use dashes (\`-\`), asterisks (\`*\`), or plus signs (\`+\`) before each item for unordered lists.

\`\`\`md
- First item
- Second item
- Third item
- Fourth item
\`\`\`

- First item
- Second item
- Third item
- Fourth item

### Nested List
Indent items under another to create nested lists.

\`\`\`md
- First item
- Second item  
  - Additional item  
  - Additional item  
- Third item
\`\`\`

- First item
- Second item  
  - Additional item  
  - Additional item  
- Third item

## Tables
Markdown tables use pipes (\`|\`) to separate columns and hyphens (\`---\`) to define the header row. Place a pipe at the start and end of each row for better compatibility.

\`\`\`md
| Property | Description                            |
| -------- | -------------------------------------- |
| Name     | Full name of the user                  |
| Age      | Age in years                           |
| Joined   | Indicates if user joined the community |
\`\`\`

| Property | Description                            |
| -------- | -------------------------------------- |
| Name     | Full name of the user                  |
| Age      | Age in years                           |
| Joined   | Indicates if user joined the community |`;

export const metadata: Metadata = {
  title: `Lists and tables ${config.name ? "- " + config.name : "- Doccupine"}`,
  description: `Present structured information using lists or tables.`,
  icons: `${config.icon || 'https://doccupine.com/favicon.ico'}`,
  openGraph: {
    title: `Lists and tables ${config.name ? "- " + config.name : "- Doccupine"}`,
    description: `Present structured information using lists or tables.`,
    images: `${config.preview || 'https://doccupine.com/preview.png'}`,
  },
};

export default function Page() {
  return <Docs content={content} />;
}
