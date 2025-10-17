import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { 
  Container,
  StyledComponentsRegistry,
} from "cherry-styled-components/src/lib";
import { theme, themeDark } from "@/app/theme";
import { CherryThemeProvider } from "@/components/layout/CherryThemeProvider";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { DocsWrapper } from "@/components/layout/DocsComponents";
import { SideBar } from "@/components/SideBar";
import { transformPagesToGroupedStructure } from "@/utils/orderNavItems";
import navigation from "@/navigation.json";

const inter = Inter({ subsets: ["latin"] });

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
    "slug": "config",
    "title": "Globals",
    "description": "Configure global settings for your documentation.",
    "date": "2025-01-15",
    "category": "Configuration",
    "path": "config.mdx",
    "categoryOrder": 3,
    "order": 1
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
    "slug": "image-embeds",
    "title": "Images and embeds",
    "description": "Enrich your documentation with visuals, videos, and interactive embeds.",
    "date": "2025-01-15",
    "category": "Components",
    "path": "image-embeds.mdx",
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
    "slug": "list-table",
    "title": "Lists and tables",
    "description": "Present structured information using lists or tables.",
    "date": "2025-01-15",
    "category": "Components",
    "path": "list-table.mdx",
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
    "slug": "text",
    "title": "Headers and Text",
    "description": "Learn how to structure and style your content with headers, formatting, and links.",
    "date": "2025-01-15",
    "category": "Components",
    "path": "text.mdx",
    "categoryOrder": 1,
    "order": 1
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
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <CherryThemeProvider theme={theme} themeDark={themeDark}>
            <Header />
            <Container $padding={20}>
              <DocsWrapper>
                <SideBar result={result.length ? result : defaultResults} />
                {children}
              </DocsWrapper>
            </Container>
            <Footer />
          </CherryThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
