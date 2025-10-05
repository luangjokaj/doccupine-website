import { Metadata } from "next";
import { Docs } from "@/components/Docs";

const content = `# Commands

In this page, you can find all the commands available in Doccupine CLI.

## Run Doccupine CLI

Create a new directory for your project and navigate to it in your terminal. Run the following command to create a new Doccupine project:

~~~bash
npx doccupine
~~~

Once you run the command, Doccupine will ask you to select a directory to store your MDX files. Choose the directory where you want to create your documentation files.
After selecting the directory, Doccupine will ask you to enter the name of the directory for the generated website. Enter the name of the directory where you want to create your website.

This will start the development server on port 3000. Open your browser and navigate to http://localhost:3000 to view your documentation.

## Generate the website

~~~bash
npx doccupine build
~~~

This will generate the build files for your documentation website without starting the development server. You can then deploy the generated files to a hosting service of your choice.

## Show current configuration

~~~bash
npx doccupine config --show
~~~

This will show the current configuration for Doccupine.

## Reset configuration

~~~bash
npx doccupine config --reset
~~~
  
This will reset the current configuration for Doccupine.`;

export const metadata: Metadata = {
  title: "Commands",
  description: "Doccupine CLI commands",
  icons: "https://doccupine.com/favicon.ico",
  openGraph: {
    title: "Commands",
    description: "Doccupine CLI commands",
    images: "https://doccupine.com/preview.png",
  },
};

export default function Page() {
  return <Docs content={content} />;
}
