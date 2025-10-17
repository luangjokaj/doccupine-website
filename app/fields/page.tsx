import { Metadata } from "next";
import { Docs } from "@/components/Docs";
import config from "@/config.json";

const content = `# Fields
Configure parameters for your API or SDK documentation.

Fields allow you to describe both the **inputs** (parameters) and **outputs** (responses) of your API. The main field component is available: \`Field\` for parameters and for responses.

## Fields Usage
Use the \`<Field>\` component to declare API or SDK parameters, or define the return values of an API.

<Field value="param" type="string" required>
  Example definition of a parameter field.
</Field>

\`\`\`mdx
<Field value="param" type="string" required>
  Example definition of a parameter field.
</Field>
\`\`\`

## Properties

<Field value="value" type="string" required>
  The name of the field.
</Field>

<Field value="type" type="string" required>
  The type of the field.
</Field>

<Field value="required" type="boolean">
  Whether the field is required.
</Field>`;

export const metadata: Metadata = {
  title: `Fields ${config.name ? "- " + config.name : "- Doccupine"}`,
  description: `Configure parameters for your API or SDK documentation.`,
  icons: `${config.icon || 'https://doccupine.com/favicon.ico'}`,
  openGraph: {
    title: `Fields ${config.name ? "- " + config.name : "- Doccupine"}`,
    description: `Configure parameters for your API or SDK documentation.`,
    images: `${config.preview || 'https://doccupine.com/preview.png'}`,
  },
};

export default function Page() {
  return <Docs content={content} />;
}
