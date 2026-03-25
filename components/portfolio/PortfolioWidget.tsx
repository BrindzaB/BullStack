"use client"

import { usePortfolio } from "@/hooks/usePortfolio";
import { formatCurrency, formatPercent } from "@/lib/utils";
import Link from "next/link";
import { Skeleton } from "@/components/ui/Skeleton";

function PortfolioWidgetSkeleton() {
    return (
        <>
            <div className="divide-y divide-black/10">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between py-2.5 px-2">
                        <Skeleton className="h-4 w-12" />
                        <div className="text-right space-y-1.5">
                            <Skeleton className="h-4 w-20 ml-auto" />
                            <Skeleton className="h-3 w-12 ml-auto" />
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-4">
                <div>
                    <Skeleton className="h-3 w-16 mb-1.5" />
                    <Skeleton className="h-4 w-24" />
                </div>
                <div className="text-right">
                    <Skeleton className="h-3 w-20 mb-1.5 ml-auto" />
                    <Skeleton className="h-4 w-16 ml-auto" />
                </div>
            </div>
        </>
    )
}

export default function PortfolioWidget() {
  const { holdings, summary, isLoading } = usePortfolio();

  return (
    <div className="card p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-md font-semibold text-[var(--color-text-sub)]">Portfolio</h2>
        <div className="px-2 rounded-xl btn-view-all">
          <Link href="/portfolio" className="text-xs text-[var(--color-text-sub)] transition-colors hover:text-[var(--color-text-hover)]">
            View all →
          </Link>
        </div>
      </div>

      {isLoading && <PortfolioWidgetSkeleton />}

      {!isLoading && holdings.length === 0 && (
        <p className="text-sm text-[var(--color-text-main)]">No holdings yet.</p>
      )}

      {!isLoading && holdings.length > 0 && (
        <>
          <div className="">
            <div className="divide-y divide-black/10 px-4 py-3 widget-list">
              {holdings.slice(0, 3).map((holding) => {
                const isGain = holding.pnl >= 0;
                return (
                  <Link href={`/stocks/${holding.symbol}`} key={holding.id} className="flex items-center justify-between py-2.5 px-2 group hover:rounded-lg hover:bg-[var(--color-light-layer-1)]">
                    <span className="num font-semibold text-[var(--color-text-main)] transition-colors group-hover:text-[var(--color-text-hover)]">{holding.symbol}</span>
                    <div className="text-right">
                      <p className="num text-sm font-medium text-[var(--color-text-sub)]">
                        {formatCurrency(holding.currentValue)}
                      </p>
                      <p className={`num text-xs ${isGain ? "text-up" : "text-down"}`}>
                        {formatPercent(holding.pnlPercent)}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="p-4">
                <p className="section-label text-[var(--color-text-sub)]">Total Value</p>
                <p className="num mt-0.5 text-sm font-semibold text-[var(--color-text-main)]">
                  {formatCurrency(summary.totalValue)}
                </p>
              </div>
              <div className="text-right p-4">
                <p className="section-label text-[var(--color-text-sub)]">Total Return</p>
                <p className={`num mt-0.5 text-sm font-semibold ${summary.totalPnL >= 0 ? "text-up" : "text-down"}`}>
                  {formatPercent(summary.totalPnLPercent)}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
