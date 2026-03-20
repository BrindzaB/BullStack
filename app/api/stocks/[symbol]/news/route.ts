import { auth } from "@/lib/auth"
import { getStockNews } from "@/lib/finnhub"

export async function GET(request: Request, {params}: {params: {symbol: string}}) {
    const session = await auth();
    if (!session) return new Response("Unauthorized", {status: 401});

    const data = await getStockNews(params.symbol);
    if (!data) return new Response("News not found", {status: 404});

    return Response.json(data);
}