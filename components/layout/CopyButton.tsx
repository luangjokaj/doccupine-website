"use client";
import { useState } from "react";
import styled, { css } from "styled-components";
import { Icon } from "@/components/layout/Icon";
import { mq, Theme } from "@/app/theme";
import { rgba } from "polished";
import { resetButton } from "cherry-styled-components/src/lib";

interface CopyButtonProps {
  content: string;
}

const StyledCopyWrapper = styled.div<{ theme: Theme }>`
  position: relative;
  border-bottom: solid 1px ${({ theme }) => theme.colors.grayLight};
  width: 100%;
  padding: 70px 0 20px 0;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;

  ${mq("lg")} {
    padding: 0 20px 20px 20px;
    margin: auto auto 20px auto;
    max-width: calc(100vw - 640px);
  }
`;

const StyledChildren = styled.div`
  margin: auto 0;
`;

const StyledCopyButton = styled.button<{ theme: Theme; $copied: boolean }>`
  background: transparent;
  border: solid 1px
    ${({ theme, $copied }) =>
      $copied ? theme.colors.success : theme.colors.grayLight};
  color: ${({ theme, $copied }) =>
    $copied ? theme.colors.success : theme.colors.primary};
  border-radius: ${({ theme }) => theme.spacing.radius.xs};
  padding: 6px 8px;
  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.mono};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-right: -6px;

  & svg.lucide {
    color: ${({ theme, $copied }) =>
      $copied ? theme.colors.success : theme.colors.primary};
  }

  &:hover {
    border-color: ${({ theme, $copied }) =>
      $copied ? theme.colors.success : theme.colors.primary};
  }

  &:active {
    transform: scale(0.95);
  }
`;

const StyledToggle = styled.button<{ theme: Theme; $hidden?: boolean }>`
  ${resetButton}
  width: 56px;
  height: 32px;
  border-radius: 30px;
  display: flex;
  position: relative;
  margin: auto 0;
  transform: scale(1);
  background: ${({ theme }) => theme.colors.light};
  border: solid 1px ${({ theme }) => theme.colors.grayLight};

  &::after {
    content: "";
    position: absolute;
    top: 3px;
    left: 3px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${({ theme }) => rgba(theme.colors.primaryLight, 0.2)};
    transition: all 0.3s ease;
    z-index: 1;
    ${({ theme }) =>
      theme.isDark &&
      css`
        transform: translateX(27px);
      `}
  }

  & svg {
    width: 16px;
    height: 16px;
    object-fit: contain;
    margin: auto;
    transition: all 0.3s ease;
    position: relative;
    z-index: 2;
  }

  & .lucide-eye {
    transform: translateX(1px);
  }

  & svg[stroke] {
    stroke: ${({ theme }) => theme.colors.primary};
  }

  @media (hover: hover) {
    &:hover {
      transform: scale(1.05);
      color: ${({ theme }) =>
        theme.isDark ? theme.colors.primaryLight : theme.colors.primaryDark};
      Toggle & svg[stroke] {
        stroke: ${({ theme }) =>
          theme.isDark ? theme.colors.primaryLight : theme.colors.primaryDark};
      }
    }
  }

  &:active {
    transform: scale(0.97);
  }
`;

function CopyButton({ content }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyContent = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <StyledCopyWrapper>
      <StyledCopyButton onClick={handleCopyContent} $copied={copied}>
        {copied ? (
          <>
            <Icon name="check" size={12} />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Icon name="copy" size={12} />
            <span>Copy Content</span>
          </>
        )}
      </StyledCopyButton>
      <StyledChildren>
        {" "}
        <StyledToggle onClick={async () => {}} aria-label="Toggle Theme">
          <Icon name="Eye" />
          <Icon name="CodeXml" />
        </StyledToggle>
      </StyledChildren>
    </StyledCopyWrapper>
  );
}

export { CopyButton };

