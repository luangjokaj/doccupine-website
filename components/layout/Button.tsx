"use client";
import Link from "next/link";
import styled from "styled-components";
import {
  theme as localTheme,
  ButtonProps,
  buttonStyles,
} from "cherry-styled-components/src/lib";
import { Icon, IconProps } from "@/components/layout/Icon";

interface LinkButtonProps extends ButtonProps {
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  variant?: "primary" | "secondary" | "tertiary";
  size?: "default" | "big";
  outline?: boolean;
  fullWidth?: boolean;
  icon?: IconProps;
  iconPosition?: "left" | "right";
}

const StyledLinkButton = styled(Link)<LinkButtonProps>`
  ${({ theme, $variant, $size, $outline, $fullWidth, disabled }) =>
    buttonStyles(theme, $variant, $size, $outline, $fullWidth, disabled)}

  & svg.lucide {
    margin: auto 0;
    min-width: min-content;
    color: ${({ theme, $outline }) =>
      $outline ? "inherit" : theme.colors.light};
    stroke: ${({ theme, $outline }) =>
      $outline ? "currentColor" : theme.colors.light};
  }
`;

const ButtonBase = styled.button<ButtonProps>`
  ${({ theme, $variant, $size, $outline, $fullWidth, disabled }) =>
    buttonStyles(theme, $variant, $size, $outline, $fullWidth, disabled)}

  & svg.lucide {
    margin: auto 0;
    min-width: min-content;
    color: ${({ theme, $outline }) =>
      $outline ? "inherit" : theme.colors.light};
    stroke: ${({ theme, $outline }) =>
      $outline ? "currentColor" : theme.colors.light};
  }
`;

function Button({
  variant = "primary",
  size,
  outline,
  fullWidth,
  icon,
  iconPosition = "left",
  theme = localTheme,
  href,
  ...props
}: LinkButtonProps) {
  return href ? (
    <div>
      <StyledLinkButton
        {...props}
        href={href}
        $variant={variant}
        $size={size}
        $outline={outline}
        $fullWidth={fullWidth}
      >
        {iconPosition === "left" && icon && (
          <Icon name={icon} color={theme.colors.light} size={16} />
        )}
        {props.children}
        {iconPosition === "right" && icon && (
          <Icon name={icon} color={theme.colors.light} size={16} />
        )}
      </StyledLinkButton>
    </div>
  ) : (
    <div>
      <ButtonBase
        {...props}
        $variant={variant}
        $size={size}
        $outline={outline}
        $fullWidth={fullWidth}
      >
        {iconPosition === "left" && icon && (
          <Icon name={icon} color={theme.colors.light} size={16} />
        )}
        {props.children}
        {iconPosition === "right" && icon && (
          <Icon name={icon} color={theme.colors.light} size={16} />
        )}
      </ButtonBase>
    </div>
  );
}

export { Button };
