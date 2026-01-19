"use client";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Button, Input } from "cherry-styled-components/src/lib";
import { Theme } from "@/app/theme";

const StyledChat = styled.div<{ theme: Theme; $isVisible: boolean }>`
  margin: 0;
  padding: 0 20px;
  position: fixed;
  background: ${({ theme }) => theme.colors.light};
  top: 0;
  right: 0;
  width: 319px;
  height: 100vh;
  overflow-y: scroll;
  z-index: 1000;
  display: none;

  ${({ $isVisible }) =>
    $isVisible &&
    css`
      display: block;
    `}
`;

const StyledChatForm = styled.form`
  display: flex;
  gap: 10px;
  justify-content: center;
  position: absolute;
  z-index: 1000;
  top: 11px;
  left: 50%;
  transform: translateX(-50%);
`;

const StyledAnswer = styled.pre<{ theme: Theme; $isAnswer: boolean }>`
  white-space: pre-wrap;
  overflow-x: auto;
  background: ${({ theme }) => theme.colors.grayLight};
  padding: 16px;
  border-radius: 8px;
  margin: 20px 0;
  width: 100%;

  ${({ $isAnswer }) =>
    $isAnswer &&
    css`
      background: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.light};
    `}
`;

type Source = { id: string; path: string; score: number };
type Answer = { text: string; answer?: boolean };

type ApiResponse = {
  answer?: string | any;
  sources?: Source[];
  chunkCount?: number;
  error?: string;
};

function Chat() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [answer, setAnswer] = useState<Answer[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const [chunkCount, setChunkCount] = useState<number | null>(null);

  async function ask(e: React.FormEvent) {
    if (question.trim() === "") return;
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSources([]);

    try {
      const res = await fetch("/api/rag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data: ApiResponse = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Request failed");
      }
      let content = "";
      if (typeof data.answer === "string") content = data.answer;
      else if (Array.isArray(data.answer))
        content = data.answer
          .map((p: any) => (typeof p === "string" ? p : p?.text || ""))
          .join("\n");
      else content = String(data.answer ?? "");

      const mergedAnswes =
        answer.length > 0
          ? [
              ...answer,
              { text: question, answer: false },
              { text: content, answer: true },
            ]
          : [
              { text: question, answer: false },
              { text: content, answer: true },
            ];

      setAnswer(mergedAnswes);
      setSources(data.sources || []);
      setChunkCount(data.chunkCount ?? null);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <StyledChatForm onSubmit={ask}>
        <Input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask AI Assistant..."
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Asking..." : "Ask"}
        </Button>
      </StyledChatForm>

      <StyledChat $isVisible={answer?.length > 0}>
        {error && (
          <div style={{ marginTop: 16, color: "#b00020" }}>
            <strong>Error:</strong> {error}
          </div>
        )}
        {answer &&
          answer.map((a, i) => (
            <StyledAnswer key={i} $isAnswer={a.answer ?? false}>
              {a.text}
            </StyledAnswer>
          ))}
      </StyledChat>
    </>
  );
}

export { Chat };
