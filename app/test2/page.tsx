import { Metadata } from "next";
import { Docs } from "@/components/Docs";

const content = `
# Welcome to my blog!

This is some **markdown** content with MDX support.

You can include React components here too!

Test

\`\`\`js
console.log("test")
\`\`\``;

export const metadata: Metadata = {
  title: 'My First Blog Post',
  description: 'This is my first blog post',
};

export default function Page() {
  return (
    <Docs content={content} />
  );
}