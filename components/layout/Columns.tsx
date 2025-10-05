"use client";
import styled from "styled-components";
import { mq, Theme } from "cherry-styled-components/src/lib";

const StyledColumns = styled.div<{ theme: Theme; $columns?: number }>`
  display: flex;
  flex-direction: column;
  gap: 20px;

  ${mq("lg")} {
    display: grid;
    grid-template-columns: repeat(${({ $columns }) => $columns ?? 1}, 1fr);
  }
`;

export interface ColumnsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  columns?: number;
}

function Columns({ children, columns }: ColumnsProps) {
  return <StyledColumns $columns={columns}>{children}</StyledColumns>;
}

export { Columns };