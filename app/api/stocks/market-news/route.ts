import { auth } from "@/lib/auth";
import { getMarketNews } from "@/lib/finnhub";

export async function GET() {
    const session = await auth();
    if (!session) return new Response("Unauthorized", { status: 401});

    const data = await getMarketNews();
    if (!data) return new Response("News not found", {status: 404});

    return Response.json(data);
}