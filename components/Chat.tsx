"use client";
import React, { useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { Button, Input } from "cherry-styled-components/src/lib";
import { ArrowUp, LoaderPinwheel, X } from "lucide-react";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { Theme } from "@/app/theme";
import { useMDXComponents } from "@/components/MDXComponents";

const StyledChat = styled.div<{ theme: Theme; $isVisible: boolean }>`
  margin: 0;
  position: fixed;
  top: 0;
  right: 0;
  width: 319px;
  height: calc(100vh - 90px);
  overflow-y: scroll;
  z-index: 1000;
  pointer-events: none;

  ${({ $isVisible }) => $isVisible && `pointer-events: all;`}
`;

const loadingAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledChatForm = styled.form<{ theme: Theme; $isVisible: boolean }>`
  display: flex;
  gap: 10px;
  justify-content: center;
  background: ${({ theme }) => theme.colors.light};
  padding: 20px;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 1000;
  width: 319px;
  border-top: solid 1px ${({ theme }) => theme.colors.grayLight};
  transition: all 0.3s ease;
  transform: translateY(90px);

  ${({ $isVisible }) =>
    $isVisible &&
    css`
      transform: translateY(0);
    `}

  & input {
    width: 100%;
  }

  & .loading {
    animation: ${loadingAnimation} 1s linear infinite;
  }

  & button {
    &:disabled,
    &:disabled:hover {
      background: ${({ theme }) => theme.colors.primaryDark};
      color: ${({ theme }) => theme.colors.light};
    }
  }
`;

const StyledChatFixedForm = styled.form<{ theme: Theme; $hide: boolean }>`
  display: flex;
  gap: 10px;
  justify-content: center;
  position: absolute;
  z-index: 1000;
  top: 11px;
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.3s ease;

  ${({ $hide }) =>
    $hide &&
    css`
      transform: translateX(-50%) translateY(-100px);
    `}

  & .loading {
    animation: ${loadingAnimation} 1s linear infinite;
  }

  & button {
    &:disabled,
    &:disabled:hover {
      background: ${({ theme }) => theme.colors.primaryDark};
      color: ${({ theme }) => theme.colors.light};
    }
  }
`;

const StyledAnswer = styled.div<{ theme: Theme; $isAnswer: boolean }>`
  overflow-x: auto;
  background: ${({ theme }) => theme.colors.grayLight};
  padding: 16px;
  border-radius: 8px;
  margin: 20px 0;
  width: 100%;
  white-space: pre-wrap;

  ${({ $isAnswer }) =>
    $isAnswer &&
    css`
      background: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) =>
        theme.isDark ? theme.colors.dark : theme.colors.light};
    `}

  & > * {
    margin: 0;
    white-space: normal;
  }

  & > * + * {
    margin-top: 1em;
  }

  & code {
    background: ${({ theme }) =>
      theme.isDark ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)"};
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.9em;
  }

  & pre {
    background: ${({ theme }) =>
      theme.isDark ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.3)"};
    padding: 12px;
    border-radius: 6px;
    overflow-x: auto;
  }

  & pre code {
    background: transparent;
    padding: 0;
  }

  & ul,
  & ol {
    padding-left: 1.5em;
  }

  & li {
    margin: 0.5em 0;
  }

  & p {
    margin: 0.5em 0;
  }

  & h1,
  & h2,
  & h3,
  & h4,
  & h5,
  & h6 {
    margin-top: 1em;
    margin-bottom: 0.5em;
  }
`;

const StyledChatWrapper = styled.div<{ theme: Theme; $isVisible: boolean }>`
  min-height: 100%;
  width: 100%;
  padding: 0 20px;
  position: relative;
  transition: all 0.3s ease;
  transform: translateX(-100%);
  background: ${({ theme }) => theme.colors.light};

  ${({ $isVisible }) =>
    $isVisible &&
    css`
      transform: translateX(0);
    `}
`;

const StyledChatTitle = styled.div<{ theme: Theme }>`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  position: sticky;
  margin: 0 -20px;
  padding: 22px 20px;
  min-height: 73px;
  top: 0;
  background: ${({ theme }) => theme.colors.light};
  border-bottom: solid 1px ${({ theme }) => theme.colors.grayLight};
`;

const StyledChatCloseButton = styled.button<{ theme: Theme }>`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  color: ${({ theme }) => theme.colors.dark};
`;

type Source = { id: string; path: string; score: number };
type Answer = {
  text: string;
  answer?: boolean;
  mdx?: MDXRemoteSerializeResult;
};

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
  const endRef = useRef<HTMLDivElement | null>(null);
  const mdxComponents = useMDXComponents({});

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [answer]);

  useEffect(() => {
    if (answer?.length > 0) {
      const el = document.getElementById(
        "chat-bottom-input",
      ) as HTMLInputElement | null;
      el?.focus();
    }
  }, [answer]);

  async function ask(e: React.FormEvent) {
    if (loading || question.trim() === "") return;
    setQuestion("");
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSources([]);

    const mergedQuestions =
      answer.length > 0
        ? [...answer, { text: question, answer: false }]
        : [{ text: question, answer: false }];

    setAnswer(mergedQuestions);

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

      // Serialize the markdown content to MDX
      let mdxSource: MDXRemoteSerializeResult | null = null;
      try {
        mdxSource = await serialize(content, {
          parseFrontmatter: false,
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeHighlight],
            format: "mdx",
            development: false,
          },
        });
      } catch (mdxError: any) {
        console.error("MDX serialization error:", mdxError);
        // If MDX fails, we'll fall back to plain text rendering
        mdxSource = null;
      }

      const mergedAnswes =
        answer.length > 0
          ? [
              ...answer,
              { text: question, answer: false },
              { text: content, answer: true, mdx: mdxSource || undefined },
            ]
          : [
              { text: question, answer: false },
              { text: content, answer: true, mdx: mdxSource || undefined },
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
      <StyledChatFixedForm onSubmit={ask} $hide={answer?.length > 0}>
        <Input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask AI Assistant..."
        />
        <Button type="submit" disabled={loading}>
          {loading ? <LoaderPinwheel className="loading" /> : <ArrowUp />}
        </Button>
      </StyledChatFixedForm>

      <StyledChat $isVisible={answer?.length > 0}>
        <StyledChatWrapper $isVisible={answer?.length > 0}>
          <StyledChatTitle>
            <h3>AI Assistant</h3>
            <StyledChatCloseButton onClick={() => setAnswer([])}>
              <X />
            </StyledChatCloseButton>
          </StyledChatTitle>
          {error && (
            <div style={{ marginTop: 16, color: "#b00020" }}>
              <strong>Error:</strong> {error}
            </div>
          )}
          {answer &&
            answer.map((a, i) => (
              <StyledAnswer key={i} $isAnswer={a.answer ?? false}>
                {a.answer && a.mdx ? (
                  <MDXRemote {...a.mdx} components={mdxComponents} />
                ) : (
                  a.text
                )}
              </StyledAnswer>
            ))}
          <div ref={endRef} />
        </StyledChatWrapper>

        <StyledChatForm onSubmit={ask} $isVisible={answer?.length > 0}>
          <Input
            id="chat-bottom-input"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask AI Assistant..."
          />
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderPinwheel className="loading" /> : <ArrowUp />}
          </Button>
        </StyledChatForm>
      </StyledChat>
    </>
  );
}

export { Chat };
