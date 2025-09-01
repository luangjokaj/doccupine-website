import { Metadata } from "next";
import { Docs } from "@/components/Docs";

const content = `
# Hello

Eu enim laboris magna occaecat enim enim reprehenderit non incididunt exercitation cupidatat proident. Dolor excepteur pariatur esse. Enim incididunt anim id aliqua culpa quis nulla do laboris ullamco. Consequat aute quis esse eu eiusmod fugiat laboris qui elit esse aute amet. Ullamco nostrud eu reprehenderit voluptate nisi in. Ea Lorem est ea quis reprehenderit esse veniam laborum pariatur. Et laboris aliqua duis dolore in fugiat excepteur velit. Culpa id est et.`;

export const metadata: Metadata = {
  title: 'Sub directory',
  description: 'This is my first blog post',
};

export default function Page() {
  return (
    <Docs content={content} />
  );
}