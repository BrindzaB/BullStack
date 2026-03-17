
import { cache } from "./cache"
import type { FinnhubQuote, FinnhubCompanyProfile, FinnhubSearchResult } from "@/types/finnhub"

const BASE_URL = "https://finnhub.io/api/v1"

export async function getQuote(symbol: string): Promise<FinnhubQuote> {
    const cacheKey = `quote:${symbol}`;
    const cached = cache.get<FinnhubQuote>(cacheKey);

    if (cached) return cached;

    const res = await fetch(`${BASE_URL}/quote?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`);
    const data: FinnhubQuote = await res.json();
    cache.set(cacheKey, data, 60_000);

    return data
}

export async function getCompanyProfile(symbol: string): Promise<FinnhubCompanyProfile> {
    const cacheKey = `profile:${symbol}`;
    const cached = cache.get<FinnhubCompanyProfile>(cacheKey);

    if (cached) return cached;

    const res = await fetch(`${BASE_URL}/stock/profile2?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`);
    const data: FinnhubCompanyProfile = await res.json();
    cache.set(cacheKey, data, 24 * 60 * 60_000);

    return data;
}

export async function getSymbolSearch(query: string): Promise<FinnhubSearchResult> {
    const cacheKey = `search:${query}`
    const cached = cache.get<FinnhubSearchResult>(cacheKey);

    if (cached) return cached;

    const res = await fetch(`${BASE_URL}/search?q=${query}&token=${process.env.FINNHUB_API_KEY}`)
    const data: FinnhubSearchResult = await res.json();
    cache.set(cacheKey, data, 5 * 60_000)

    return data;
}

