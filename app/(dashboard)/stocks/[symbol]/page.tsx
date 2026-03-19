import StockQuoteCard from "@/components/stock/StockQuoteCard";
import StockChart from "@/components/stock/StockChart";
import AddToWatchlistButton from "@/components/watchlist/AddToWatchlistButton";

interface PageProps {
    params: { symbol: string};
}

export default function StockPage({params}: PageProps) {
    const symbol = params.symbol.toUpperCase();

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <h1 className="text-display-sm text-surface-900">{symbol}</h1>
                <AddToWatchlistButton symbol={symbol}/>
            </div>
            <StockQuoteCard symbol={symbol}/>
            <StockChart symbol={symbol} />
        </div>
    );
}