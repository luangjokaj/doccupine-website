"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Space } from "cherry-styled-components/src/lib";
import { 
  DocsSidebar,
  StyledSidebar,
  StyledSidebarList,
  StyledSidebarListItem,
  StyledStrong,
  StyledSidebarListItemLink,
  StyleMobileBar,
  StyledMobileBurger
} from "@/components/layout/DocsComponents";

type NavItem = {
  label: string;
  links: NavItemLink[];
};

type NavItemLink = {
  slug: string;
  title: string;
};

interface SideBarProps {
  result: NavItem[];
}

function SideBar({ result }: SideBarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <DocsSidebar>
      <StyleMobileBar
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        $isActive={isMobileMenuOpen}
      >
        <StyledMobileBurger $isActive={isMobileMenuOpen} />
      </StyleMobileBar>

      <StyledSidebar $isActive={isMobileMenuOpen}>
        {result && result.map((item: any, index: number) => {
          return (
            <StyledSidebarList key={index}>
              <StyledSidebarListItem>
                <StyledStrong>{item.label}</StyledStrong>{" "}
              </StyledSidebarListItem>
              <li>
                <Space $size={20} />
              </li>
              {item.links &&
                item.links.map((link: any, indexChild: number) => {
                  return (
                    <StyledSidebarListItem key={indexChild}>
                      <StyledSidebarListItemLink
                        href={`/${link.slug}`}
                        $isActive={
                          pathname ===
                          `/${link.slug}`
                        }
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.title}
                      </StyledSidebarListItemLink>
                    </StyledSidebarListItem>
                  );
                })}
              <Space $size={20} />
            </StyledSidebarList>
          );
        })}
      </StyledSidebar>
    </DocsSidebar>
  );
}

export { SideBar };
