"use client";
import React, { useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { rgba } from "polished";
import { Button, Input } from "cherry-styled-components/src/lib";
import { ArrowUp, LoaderPinwheel, X } from "lucide-react";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { mq, Theme } from "@/app/theme";
import { useMDXComponents } from "@/components/MDXComponents";
import { stylesLists } from "@/components/layout/SharedStyled";

const StyledChat = styled.div<{ theme: Theme; $isVisible: boolean }>`
  margin: 0;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: calc(100vh - 90px);
  overflow-y: scroll;
  z-index: 1000;
  pointer-events: none;

  ${({ $isVisible }) => $isVisible && `pointer-events: all;`}

  ${mq("lg")} {
    width: 319px;
  }
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
  width: 100%;
  border-top: solid 1px ${({ theme }) => theme.colors.grayLight};
  transition: all 0.3s ease;
  transform: translateY(90px);

  ${mq("lg")} {
    width: 319px;
  }

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

const StyledError = styled.div<{ theme: Theme }>`
  overflow-x: auto;
  background: ${({ theme }) => theme.colors.error};
  color: ${({ theme }) =>
    theme.isDark ? theme.colors.dark : theme.colors.light};
  padding: 16px;
  border-radius: 8px;
  margin: 20px 0;
  width: 100%;
`;

const StyledLoading = styled.div<{ theme: Theme }>`
  overflow-x: auto;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) =>
    theme.isDark ? theme.colors.dark : theme.colors.light};
  padding: 16px;
  border-radius: 8px;
  margin: 20px 0;
  width: 100%;
  animation: ${({ theme }) => keyframes`
    0% {
      box-shadow: 0 0 0 0px ${theme.colors.primaryLight};
      transform: scale(1);
    }
    50% {
      box-shadow: 0 0 0 5px ${theme.colors.primaryLight};
      scale: 0.95;
    }
    100% {
      box-shadow: 0 0 0 0px ${theme.colors.primaryLight};
      transform: scale(1);
    }
  `}
    1s ease infinite;
`;

const StyledAnswer = styled.div<{ theme: Theme; $isAnswer: boolean }>`
  overflow-x: auto;
  background: ${({ theme }) => theme.colors.grayLight};
  color: ${({ theme }) => theme.colors.dark};
  padding: 16px;
  border-radius: 8px;
  margin: 20px 0;
  width: 100%;
  white-space: pre-wrap;

  ${({ $isAnswer }) =>
    $isAnswer &&
    css`
      background: ${({ theme }) => theme.colors.primary};
    `}

  & code:not([class]) {
    background: ${({ theme }) => rgba(theme.colors.primaryLight, 0.5)};
    color: ${({ theme }) =>
      theme.isDark ? theme.colors.dark : theme.colors.light};
    padding: 2px 4px;
    border-radius: ${({ theme }) => theme.spacing.radius.xs};
  }

  ${stylesLists};

  & ul,
  & ol {
    margin: -20px 0;

    & li {
      margin: -10px 0;
      color: ${({ theme }) =>
        theme.isDark ? theme.colors.dark : theme.colors.light};
    }
  }

  & ul {
    & li {
      &::before {
        background: ${({ theme }) => theme.colors.primaryLight};
      }
    }
  }

  & h1,
  & h2,
  & h3,
  & h4,
  & h5,
  & h6 {
    margin: 0;
    padding: 0;
  }

  & > * {
    color: ${({ theme }) =>
      theme.isDark ? theme.colors.dark : theme.colors.light};
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
  padding: 25px 20px;
  height: 73px;
  top: 0;
  background: ${({ theme }) => theme.colors.light};
  border-bottom: solid 1px ${({ theme }) => theme.colors.grayLight};
  z-index: 1000;
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
            format: "md", // Use markdown format to handle nested code blocks better
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
          {loading && <StyledLoading>Answering...</StyledLoading>}
          {error && (
            <StyledError>
              <strong>Error:</strong> {error}
            </StyledError>
          )}
          <div ref={endRef} />
        </StyledChatWrapper>

        <StyledChatForm onSubmit={ask} $isVisible={answer?.length > 0}>
          <Input
            id="chat-bottom-input"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask AI Assistant..."
            $fullWidth
          />
          <Button type="submit" disabled={loading || question.trim() === ""}>
            {loading ? <LoaderPinwheel className="loading" /> : <ArrowUp />}
          </Button>
        </StyledChatForm>
      </StyledChat>
    </>
  );
}

export { Chat };
