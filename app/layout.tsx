import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { StyledComponentsRegistry } from "cherry-styled-components/src/lib";
import { theme, themeDark } from "@/app/theme";
import { CherryThemeProvider } from "@/components/layout/CherryThemeProvider";
import { Chat, ChtProvider } from "@/components/Chat";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { DocsWrapper } from "@/components/layout/DocsComponents";
import { SideBar } from "@/components/SideBar";
import { DocsNavigation } from "@/components/layout/DocsNavigation";
import { transformPagesToGroupedStructure } from "@/utils/orderNavItems";
import navigation from "@/navigation.json";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Doccupine",
  description: "Doccupine is a free and open-source document management system that allows you to store, organize, and share your documentation with ease.",
  openGraph: {
    title: "Doccupine",
    description: "Doccupine is a free and open-source document management system that allows you to store, organize, and share your documentation with ease.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const defaultPages = [
  {
    "slug": "",
    "title": "Getting Started",
    "description": "Doccupine is a free and open-source document management system that allows you to store, organize, and share your documentation with ease.",
    "date": "2025-01-15",
    "category": "Introduction",
    "categoryOrder": 0,
    "order": 0
  },
];

  const pages: any = [
  {
    "slug": "accordion",
    "title": "Accordion",
    "description": "Interactive panels for toggling visibility of content.",
    "date": "2025-01-15",
    "category": "Components",
    "path": "accordion.mdx",
    "categoryOrder": 1,
    "order": 4
  },
  {
    "slug": "ai-assistant",
    "title": "AI Assistant",
    "description": "Integrate AI capabilities into your Doccupine documentation using OpenAI, Anthropic, or Google Gemini.",
    "date": "2025-01-24",
    "category": "Configuration",
    "path": "ai-assistant.mdx",
    "categoryOrder": 3,
    "order": 6
  },
  {
    "slug": "buttons",
    "title": "Buttons",
    "description": "A flexible action component supporting variants, sizes, icons, and links.",
    "date": "2025-01-15",
    "category": "Components",
    "path": "buttons.mdx",
    "categoryOrder": 1,
    "order": 7
  },
  {
    "slug": "callouts",
    "title": "Callouts",
    "description": "Make your content stand out by using callouts for extra emphasis.",
    "date": "2025-01-15",
    "category": "Components",
    "path": "callouts.mdx",
    "categoryOrder": 1,
    "order": 7
  },
  {
    "slug": "cards",
    "title": "Cards",
    "description": "Cards act as visual containers for your content, giving you flexibility to combine text, icons, images, and links in a clean and organized way.",
    "date": "2025-01-15",
    "category": "Components",
    "path": "cards.mdx",
    "categoryOrder": 1,
    "order": 6
  },
  {
    "slug": "code",
    "title": "Code",
    "description": "Learn how to display inline code and code blocks in documentation.",
    "date": "2025-01-15",
    "category": "Components",
    "path": "code.mdx",
    "categoryOrder": 1,
    "order": 3
  },
  {
    "slug": "columns",
    "title": "Columns",
    "description": "Columns are used to organize content in a grid-like structure.",
    "date": "2025-01-15",
    "category": "Components",
    "path": "columns.mdx",
    "categoryOrder": 1,
    "order": 12
  },
  {
    "slug": "commands",
    "title": "Commands",
    "description": "In this page, you can find all the commands available in Doccupine CLI.",
    "date": "2025-01-15",
    "category": "General",
    "path": "commands.mdx",
    "categoryOrder": 0,
    "order": 1
  },
  {
    "slug": "deployment",
    "title": "Deployment",
    "description": "Deploy your Doccupine Next.js app to Vercel.",
    "date": "2025-01-15",
    "category": "Configuration",
    "path": "deployment.mdx",
    "categoryOrder": 3,
    "order": 5
  },
  {
    "slug": "fields",
    "title": "Fields",
    "description": "Configure parameters for your API or SDK documentation.",
    "date": "2025-01-15",
    "category": "Components",
    "path": "fields.mdx",
    "categoryOrder": 1,
    "order": 10
  },
  {
    "slug": "fonts",
    "title": "Fonts",
    "description": "Customize the documentation typography with a fonts.json file (Google Fonts or local custom fonts).",
    "date": "2025-01-15",
    "category": "Configuration",
    "path": "fonts.mdx",
    "categoryOrder": 3,
    "order": 4
  },
  {
    "slug": "globals",
    "title": "Globals",
    "description": "Configure global settings for your documentation.",
    "date": "2025-01-15",
    "category": "Configuration",
    "path": "globals.mdx",
    "categoryOrder": 3,
    "order": 1
  },
  {
    "slug": "headers-and-text",
    "title": "Headers and Text",
    "description": "Learn how to structure and style your content with headers, formatting, and links.",
    "date": "2025-01-15",
    "category": "Components",
    "path": "headers-and-text.mdx",
    "categoryOrder": 1,
    "order": 1
  },
  {
    "slug": "icons",
    "title": "Icons",
    "description": "Integrate visual icons from well-known libraries to enrich your documentation.",
    "date": "2025-01-15",
    "category": "Components",
    "path": "icons.mdx",
    "categoryOrder": 1,
    "order": 9
  },
  {
    "slug": "image-and-embeds",
    "title": "Images and embeds",
    "description": "Enrich your documentation with visuals, videos, and interactive embeds.",
    "date": "2025-01-15",
    "category": "Components",
    "path": "image-and-embeds.mdx",
    "categoryOrder": 1,
    "order": 8
  },
  {
    "slug": "",
    "title": "Getting Started",
    "description": "Doccupine is a free and open-source document management system that allows you to store, organize, and share your documentation with ease.",
    "date": "2025-01-15",
    "category": "General",
    "path": "index.mdx",
    "categoryOrder": 0,
    "order": 0
  },
  {
    "slug": "lists-and-tables",
    "title": "Lists and tables",
    "description": "Present structured information using lists or tables.",
    "date": "2025-01-15",
    "category": "Components",
    "path": "lists-and-tables.mdx",
    "categoryOrder": 1,
    "order": 2
  },
  {
    "slug": "navigation",
    "title": "Navigation",
    "description": "Organize and structure your navigation.",
    "date": "2025-01-15",
    "category": "Configuration",
    "path": "navigation.mdx",
    "categoryOrder": 3,
    "order": 2
  },
  {
    "slug": "steps",
    "title": "Steps",
    "description": "Guide readers step-by-step using the Steps component.",
    "date": "2025-01-15",
    "category": "Components",
    "path": "steps.mdx",
    "categoryOrder": 1,
    "order": 13
  },
  {
    "slug": "tabs",
    "title": "Tabs",
    "description": "Use the Tabs component to display different content sections in a switchable panel layout.",
    "date": "2025-01-15",
    "category": "Components",
    "path": "tabs.mdx",
    "categoryOrder": 1,
    "order": 5
  },
  {
    "slug": "theme",
    "title": "Theme",
    "description": "Customize the documentation UI colors with a theme.json file.",
    "date": "2025-01-15",
    "category": "Configuration",
    "path": "theme.mdx",
    "categoryOrder": 3,
    "order": 3
  },
  {
    "slug": "update",
    "title": "Update",
    "description": "Easily manage and present change history.",
    "date": "2025-01-15",
    "category": "Components",
    "path": "update.mdx",
    "categoryOrder": 1,
    "order": 11
  }
];
  const result = navigation.length
    ? navigation
    : transformPagesToGroupedStructure(pages);
  const defaultResults = transformPagesToGroupedStructure(defaultPages);

  return (
    <html lang="en">
      <body className={font.className}>
        <StyledComponentsRegistry>
          <CherryThemeProvider theme={theme} themeDark={themeDark}>
            <ChtProvider isChatActive={process.env.LLM_PROVIDER ? true : false}>
              <Header />
              {process.env.LLM_PROVIDER && <Chat />}
              <DocsWrapper>
                <SideBar result={result.length ? result : defaultResults} />
                {children}
                <DocsNavigation
                  result={result.length ? result : defaultResults}
                />
              </DocsWrapper>
              <Footer />
            </ChtProvider>
          </CherryThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}