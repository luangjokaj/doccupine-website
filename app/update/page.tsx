import { Metadata } from "next";
import { Docs } from "@/components/Docs";
import config from "@/config.json";

const content = `# Update
Easily manage and present change history.

The \`Update\` component helps you display release notes, version details, and changelogs in a standardized format.

<Update label="Example" description="v0.0.1">
  ## Example entry

  You can include anything here—images, code snippets, or a bullet list of modifications.

  ![Demo Image](https://doccupine.com/demo.png)

  ### Key additions

  - Fully responsive layout
  - Individual anchor for each update
  - Automatic RSS feed entry generation
</Update>

## Update Usage
You can combine multiple \`Update\` components to build complete changelogs.

\`\`\`mdx
<Update label="Example" description="v0.0.1">
  ## Example entry

  You can include anything here—images, code snippets, or a bullet list of modifications.

  ![Demo Image](https://doccupine.com/demo.png)

  ### Key additions

  - Fully responsive layout
  - Individual anchor for each update
  - Automatic RSS feed entry generation
</Update>
\`\`\`

## Properties

<Field value="label" type="string" required>
  The label of the update.
</Field>

<Field value="description" type="string" required>
  The description of the update.
</Field>

<Field value="children" type="node" required>
  The content of the update.
</Field>`;

export const metadata: Metadata = {
  title: `Update ${config.name ? "- " + config.name : "- Doccupine"}`,
  description: `Easily manage and present change history.`,
  icons: `${config.icon || 'https://doccupine.com/favicon.ico'}`,
  openGraph: {
    title: `Update ${config.name ? "- " + config.name : "- Doccupine"}`,
    description: `Easily manage and present change history.`,
    images: `${config.preview || 'https://doccupine.com/preview.png'}`,
  },
};

export default function Page() {
  return <Docs content={content} />;
}
