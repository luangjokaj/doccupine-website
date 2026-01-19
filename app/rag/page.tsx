"use client";
import React, { useState } from "react";

type Source = { id: string; path: string; score: number };

type ApiResponse = {
  answer?: string | any;
  sources?: Source[];
  chunkCount?: number;
  error?: string;
};

export default function RagPage() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string>("");
  const [sources, setSources] = useState<Source[]>([]);
  const [chunkCount, setChunkCount] = useState<number | null>(null);
  const [refresh, setRefresh] = useState(false);

  async function ask(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setAnswer("");
    setSources([]);

    try {
      const res = await fetch("/api/rag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, refresh }),
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

      setAnswer(content);
      setSources(data.sources || []);
      setChunkCount(data.chunkCount ?? null);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>
      <h1>RAG over app/</h1>
      <p>
        Ask questions about the documentation and code inside the{" "}
        <code>app/</code> directory.
      </p>

      <form
        onSubmit={ask}
        style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 16 }}
      >
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question..."
          style={{
            flex: 1,
            padding: 10,
            border: "1px solid #ccc",
            borderRadius: 8,
          }}
        />
        <button
          type="submit"
          disabled={loading || !question.trim()}
          style={{ padding: "10px 14px" }}
        >
          {loading ? "Asking..." : "Ask"}
        </button>
      </form>

      <label
        style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}
      >
        <input
          type="checkbox"
          checked={refresh}
          onChange={(e) => setRefresh(e.target.checked)}
        />
        Rebuild index (may take time)
      </label>

      {error && (
        <div style={{ marginTop: 16, color: "#b00020" }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {chunkCount !== null && (
        <div style={{ marginTop: 8, color: "#555" }}>
          Indexed chunks: {chunkCount}
        </div>
      )}

      {answer && (
        <div style={{ marginTop: 24 }}>
          <h2>Answer</h2>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              background: "#f6f8fa",
              padding: 16,
              borderRadius: 8,
            }}
          >
            {answer}
          </pre>
        </div>
      )}

      {sources.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <h3>Top Sources</h3>
          <ul>
            {sources.map((s) => (
              <li key={s.id}>
                <code>{s.path}</code> — score {s.score.toFixed(3)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
