import { auth } from "@/lib/auth"
import { getCandles } from "@/lib/yahoo"

export async function GET(request: Request, {params}: {params: {symbol: string}}) {
    const session = await auth();
    if (!session) return new Response("Unauthorized", { status: 401});

    const { searchParams } = new URL(request.url)
    const resolution = searchParams.get("resolution") ?? "D"
    const from = Number(searchParams.get("from"))
    const to = Number(searchParams.get("to"))

    try {
        const data = await getCandles(params.symbol, resolution, from, to)
        return Response.json(data);
    } catch {
        return new Response("No data found for symbol", { status: 404 })
    }
}