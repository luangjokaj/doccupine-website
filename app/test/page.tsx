import { Metadata } from "next";
import { Docs } from "@/components/Docs";

const content = `
# Just a test

This is some **markdown** content with MDX support.

You can include React components here too!

Test
`;

export const metadata: Metadata = {
  title: 'Test',
  description: 'This is my first blog post',
};

export default function Page() {
  return (
    <Docs content={content} />
  );
}