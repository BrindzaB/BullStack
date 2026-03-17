import { auth } from "@/lib/auth"
import { getQuote } from "@/lib/finnhub"

export async function GET(request: Request, {params}: { params: { symbol: string}}) {
    const session = await auth();
    if (!session) return new Response("Unauthorized", {status: 401})

    const data = await getQuote(params.symbol)
    if (!data || data.c === 0) return new Response("Symbol not found", { status: 404 })
    return Response.json(data);
}