  import { format } from "date-fns"
  import Image from "next/image"
  import type { FinnhubNewsItem } from "@/types/finnhub"                          
                                                                                  
  interface NewsCardProps {                                                       
      article: FinnhubNewsItem                                                    
  }                                                                             

  export default function NewsCard({ article }: NewsCardProps) {                  
      return (
          <a                                                                      
              href={article.url}                                                
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 py-3 group"
          >         
            {article.image && (
                  <Image
                      src={article.image}
                      alt={article.headline}
                      width={96}
                      height={64}
                      unoptimized
                      className="h-16 w-24 shrink-0 rounded-lg object-cover ml-auto"
                  />
              )}                                                                  
              <div className="min-w-0 flex-1">
                  <p className="section-label mb-1 text-[var(--color-text-sub)]">                              
                      {article.source} · {format(new Date(article.datetime * 1000), "MMM d")}                                                                
                  </p>                                                          
                  <p className="text-sm font-semibold text-[var(--color-text-main)] line-clamp-2 group-hover:text-[var(--color-text-hover)] transition-colors">
                      {article.headline}
                  </p>
                  <p className="text-xs text-[var(--color-text-sub)] line-clamp-2 mt-0.5">
                      {article.summary}                                           
                  </p>                                                            
              </div>                                                                                                                                                                                    
          </a>                                                                  
      )
  }
