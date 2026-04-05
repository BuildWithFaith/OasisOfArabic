import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest } from "next/server";

const handler = toNextJsHandler(auth);

async function withErrorLogging(
  fn: (req: NextRequest) => Promise<Response>,
  req: NextRequest
): Promise<Response> {
  try {
    return await fn(req);
  } catch (error) {
    console.error("[Better Auth] Unhandled error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export const GET = (req: NextRequest) => withErrorLogging(handler.GET, req);
export const POST = (req: NextRequest) => withErrorLogging(handler.POST, req);
