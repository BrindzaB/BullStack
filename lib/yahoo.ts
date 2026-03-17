import YahooFinance from "yahoo-finance2"
import { cache } from "./cache"
import type { FinnhubCandles } from "@/types/finnhub"

const yahooFinance = new YahooFinance()

export async function getCandles(
    symbol:string,
    resolution: string,
    from: number,
    to: number
): Promise<FinnhubCandles> {
    const cacheKey = `candles:${symbol}:${resolution}:${from}`
    const cached = cache.get<FinnhubCandles>(cacheKey)

    if (cached) return cached

    const result = await yahooFinance.chart(symbol, {
        period1: new Date(from * 1000),
        period2: new Date(to * 1000),
        interval: "1d",
    });

    const validResults = result.quotes.filter(d => d.close !== null)

    const data: FinnhubCandles = {
    s: validResults.length > 0 ? "ok" : "no_data",
        c: validResults.map(d => d.close!),
        o: validResults.map(d => d.open ?? 0),
        h: validResults.map(d => d.high ?? 0),
        l: validResults.map(d => d.low ?? 0),
        v: validResults.map(d => d.volume ?? 0),
        t: validResults.map(d => Math.floor(d.date.getTime() / 1000)),
    }

    const ttl = resolution === "D" ? 30 * 60_000 : 6 * 60 * 60_000
    cache.set(cacheKey, data, ttl)
    return data
}

