import { Metadata } from "next";
import { Docs } from "@/components/Docs";

const content = `
# First

Sunt eiusmod magna mollit elit ullamco nulla excepteur aliquip eiusmod quis ad cupidatat excepteur id. Occaecat esse anim ea ex ex ea aliqua aliqua dolore pariatur ut mollit. Aliqua et nulla Lorem cillum labore qui commodo qui. Consectetur exercitation consequat elit esse voluptate irure cupidatat incididunt excepteur laborum tempor velit ex ad. Exercitation quis consequat mollit do. Non elit anim eu excepteur velit ullamco ullamco aute.`;

export const metadata: Metadata = {
  title: 'My First Blog Post',
  description: 'This is my first blog post',
};

export default function Page() {
  return (
    <Docs content={content} />
  );
}