"use client";
import styled from "styled-components";
import { mq, Theme } from "cherry-styled-components/src/lib";

const StyledUpdate = styled.div<{ theme: Theme; $columns?: number }>`
  display: flex;
  flex-direction: column;
  gap: 20px;

  ${mq("lg")} {
    display: grid;
    grid-template-columns: repeat(${({ $columns }) => $columns ?? 1}, 1fr);
  }
`;

export interface UpdateProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  label: string;
  description: string;
}

function Update({ children, label, description }: UpdateProps) {
  return <StyledUpdate>{children}</StyledUpdate>;
}

export { Update };
