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
    "description": "Doccupine CLI commands",
    "date": "2025-01-15",
    "category": "Components",
    "path": "accordion.mdx",
    "categoryOrder": 1,
    "order": 4
  },
  {
    "slug": "callouts",
    "title": "Callouts",
    "description": "Doccupine CLI commands",
    "date": "2025-01-15",
    "category": "Components",
    "path": "callouts.mdx",
    "categoryOrder": 1,
    "order": 7
  },
  {
    "slug": "cards",
    "title": "Cards",
    "description": "Doccupine CLI commands",
    "date": "2025-01-15",
    "category": "Components",
    "path": "cards.mdx",
    "categoryOrder": 1,
    "order": 6
  },
  {
    "slug": "code",
    "title": "Code",
    "description": "Doccupine CLI commands",
    "date": "2025-01-15",
    "category": "Components",
    "path": "code.mdx",
    "categoryOrder": 1,
    "order": 3
  },
  {
    "slug": "commands",
    "title": "Commands",
    "description": "Doccupine CLI commands",
    "date": "2025-01-15",
    "category": "General",
    "path": "commands.mdx",
    "categoryOrder": 0,
    "order": 1
  },
  {
    "slug": "fields",
    "title": "Fields",
    "description": "This is my first Doccupine project",
    "date": "2025-01-15",
    "category": "Components",
    "path": "fields.mdx",
    "categoryOrder": 0,
    "order": 9
  },
  {
    "slug": "icons",
    "title": "Icons",
    "description": "This is my first Doccupine project",
    "date": "2025-01-15",
    "category": "Components",
    "path": "icons.mdx",
    "categoryOrder": 0,
    "order": 8
  },
  {
    "slug": "image-embeds",
    "title": "Images and embeds",
    "description": "This is my first Doccupine project",
    "date": "2025-01-15",
    "category": "Components",
    "path": "image-embeds.mdx",
    "categoryOrder": 0,
    "order": 7
  },
  {
    "slug": "",
    "title": "Getting Started",
    "description": "This is my first Doccupine project",
    "date": "2025-01-15",
    "category": "General",
    "path": "index.mdx",
    "categoryOrder": 0,
    "order": 0
  },
  {
    "slug": "list-table",
    "title": "Lists and tables",
    "description": "This is my first Doccupine project",
    "date": "2025-01-15",
    "category": "Components",
    "path": "list-table.mdx",
    "categoryOrder": 0,
    "order": 2
  },
  {
    "slug": "tabs",
    "title": "Tabs",
    "description": "Doccupine CLI commands",
    "date": "2025-01-15",
    "category": "Components",
    "path": "tabs.mdx",
    "categoryOrder": 1,
    "order": 5
  },
  {
    "slug": "text",
    "title": "Headers and Text",
    "description": "Doccupine CLI commands",
    "date": "2025-01-15",
    "category": "Components",
    "path": "text.mdx",
    "categoryOrder": 1,
    "order": 1
  }
];
  const result = transformPagesToGroupedStructure(pages);
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
