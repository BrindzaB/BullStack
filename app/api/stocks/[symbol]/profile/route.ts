import { auth } from "@/lib/auth"
import { getCompanyProfile } from "@/lib/finnhub"

export async function GET(request: Request, {params}: {params: {symbol: string}}) {

    const session = await auth();
    if (!session) return new Response("Unauthorized", { status: 401 });

    const data = await getCompanyProfile(params.symbol);
    return Response.json(data);
}