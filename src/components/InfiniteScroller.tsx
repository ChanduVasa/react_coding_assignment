import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";

interface InfiniteScrollerProps {
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
}

export function InfiniteScroller({ hasMore, isLoading, onLoadMore }: InfiniteScrollerProps) {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = loaderRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          onLoadMore();
        }
      },
      { rootMargin: "400px", threshold: 0 }
    );

    observer.observe(currentRef);
    return () => observer.disconnect();
  }, [hasMore, isLoading, onLoadMore]);

  if (!hasMore && !isLoading) {
    return (
      <div className="flex justify-center py-8">
        <p className="text-muted-foreground">No more items to load</p>
      </div>
    );
  }

  return (
    <div ref={loaderRef} className="flex justify-center py-8">
      {isLoading && (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <span>Loading more...</span>
        </div>
      )}
    </div>
  );
}
