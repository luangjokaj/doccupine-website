import { Metadata } from "next";
import { Docs } from "@/components/Docs";

const content = `
# Other cat test two

This is some **markdown** content with MDX support.

You can include React components here too!

Test

\`\`\`js
console.log("test")
\`\`\``;

export const metadata: Metadata = {
  title: 'Cateogry Test Two',
  description: 'This is just a test',
};

export default function Page() {
  return (
    <Docs content={content} />
  );
}