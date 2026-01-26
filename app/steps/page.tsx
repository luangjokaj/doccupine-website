import { Metadata } from "next";
import { Docs } from "@/components/Docs";
import configData from "@/config.json";

interface Config {
  name?: string;
  icon?: string;
  preview?: string;
}

const config = configData as Config;

const content = `# Steps
Guide readers step-by-step using the Steps component.

The Steps component is perfect for organizing procedures or workflows in a clear sequence. Include as many individual steps as necessary to outline your process.

## Steps Usage
You can use the \`Steps\` component to create a step-by-step guide. Each step is represented by a \`Step\` component, which includes a title and content.

\`\`\`mdx
<Steps>
  <Step title="Step 1">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </Step>

  <Step title="Step 2">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </Step>

  <Step title="Step 3">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </Step>
</Steps>
\`\`\`

<Steps>
  <Step title="Step 1">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </Step>

  <Step title="Step 2">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </Step>

  <Step title="Step 3">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </Step>
</Steps>

## Properties

<Field value="title" type="string" required>
  The title of the step.
</Field>

<Field value="children" type="node" required>
  The content of the step.
</Field>
`;

export const metadata: Metadata = {
  title: `Steps ${config.name ? "- " + config.name : "- Doccupine"}`,
  description: `Guide readers step-by-step using the Steps component.`,
  icons: `${config.icon || "https://doccupine.com/favicon.ico"}`,
  openGraph: {
    title: `Steps ${config.name ? "- " + config.name : "- Doccupine"}`,
    description: `Guide readers step-by-step using the Steps component.`,
    images: `${config.preview || "https://doccupine.com/preview.png"}`,
  },
};

export default function Page() {
  return <Docs content={content} />;
}
