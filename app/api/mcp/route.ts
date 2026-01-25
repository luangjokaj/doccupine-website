import { createMCPServer } from "@/services/mcp/server";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";

// Create a stateless transport for serverless environment
function createTransport() {
  return new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined, // Stateless mode for serverless
    enableJsonResponse: true,
  });
}

export async function POST(req: Request) {
  const transport = createTransport();
  const server = createMCPServer();

  try {
    await server.connect(transport);
    const response = await transport.handleRequest(req);

    // Clean up after response is done
    response
      .clone()
      .body?.pipeTo(
        new WritableStream({
          close() {
            transport.close();
            server.close();
          },
        }),
      )
      .catch(() => {
        // Ignore errors during cleanup
      });

    return response;
  } catch (error) {
    console.error("MCP request error:", error);
    return new Response(
      JSON.stringify({
        jsonrpc: "2.0",
        error: {
          code: -32603,
          message: "Internal server error",
        },
        id: null,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

export async function GET(req: Request) {
  const transport = createTransport();
  const server = createMCPServer();

  try {
    await server.connect(transport);
    const response = await transport.handleRequest(req);

    response
      .clone()
      .body?.pipeTo(
        new WritableStream({
          close() {
            transport.close();
            server.close();
          },
        }),
      )
      .catch(() => {});

    return response;
  } catch (error) {
    console.error("MCP GET error:", error);
    return new Response(
      JSON.stringify({
        jsonrpc: "2.0",
        error: {
          code: -32000,
          message: "Method not allowed",
        },
        id: null,
      }),
      {
        status: 405,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

export async function DELETE(req: Request) {
  const transport = createTransport();
  const server = createMCPServer();

  try {
    await server.connect(transport);
    const response = await transport.handleRequest(req);

    response
      .clone()
      .body?.pipeTo(
        new WritableStream({
          close() {
            transport.close();
            server.close();
          },
        }),
      )
      .catch(() => {});

    return response;
  } catch (error) {
    console.error("MCP DELETE error:", error);
    return new Response(
      JSON.stringify({
        jsonrpc: "2.0",
        error: {
          code: -32000,
          message: "Method not allowed",
        },
        id: null,
      }),
      {
        status: 405,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

