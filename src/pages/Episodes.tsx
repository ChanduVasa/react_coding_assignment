import { useState, useMemo } from "react";
import { useEpisodesInfinite } from "@/hooks/useEpisodes";
import { EpisodeCard } from "@/components/EpisodeCard";
import { InfiniteScroller } from "@/components/InfiniteScroller";
import { LoadingGrid } from "@/components/LoadingSpinner";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tv, Search, X } from "lucide-react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

export default function EpisodesPage() {
  const [name, setName] = useState("");
  const [season, setSeason] = useState("all");

  const debouncedName = useDebouncedValue(name, 300);

  const filters = useMemo(() => ({ name: debouncedName, season }), [debouncedName, season]);

  const { episodes, totalCount, isLoading, isLoadingMore, hasMore, loadMore } =
    useEpisodesInfinite(filters);

  const hasFilters = name || season !== "all";

  const handleClear = () => {
    setName("");
    setSeason("all");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Tv className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold">Episodes</h1>
        </div>
        <p className="text-muted-foreground">
          Browse {totalCount > 0 ? `${totalCount} episodes` : "episodes"} from Rick and Morty
        </p>
      </div>

      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search episodes..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={season} onValueChange={setSeason}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="All Seasons" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Seasons</SelectItem>
                <SelectItem value="S01">Season 1</SelectItem>
                <SelectItem value="S02">Season 2</SelectItem>
                <SelectItem value="S03">Season 3</SelectItem>
                <SelectItem value="S04">Season 4</SelectItem>
                <SelectItem value="S05">Season 5</SelectItem>
              </SelectContent>
            </Select>
            {hasFilters && (
              <Button variant="ghost" size="icon" onClick={handleClear}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {isLoading ? (
        <LoadingGrid />
      ) : episodes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No episodes found</p>
          <p className="text-muted-foreground text-sm mt-2">Try adjusting your filters</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {episodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>
          <InfiniteScroller hasMore={hasMore} isLoading={isLoadingMore} onLoadMore={loadMore} />
        </>
      )}
    </div>
  );
}
