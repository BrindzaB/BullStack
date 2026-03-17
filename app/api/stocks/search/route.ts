import { auth } from "@/lib/auth"
import { getSymbolSearch } from "@/lib/finnhub"

export async function GET(request: Request) {

    const session = await auth();
    if (!session) return new Response("Unauthorized", {status: 401});

    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") ?? "";
    if (!q) return Response.json({ count: 0, result: []});

    const data = await getSymbolSearch(q);
    return Response.json(data);

}