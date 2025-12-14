import { useState, useMemo } from "react";
import { useLocationsInfinite } from "@/hooks/useLocations";
import { LocationCard } from "@/components/LocationCard";
import { InfiniteScroller } from "@/components/InfiniteScroller";
import { LoadingGrid } from "@/components/LoadingSpinner";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MapPin, Search, X } from "lucide-react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

export default function LocationsPage() {
  const [name, setName] = useState("");
  const [type, setType] = useState("all");
  const [dimension, setDimension] = useState("all");

  const debouncedName = useDebouncedValue(name, 300);

  const filters = useMemo(
    () => ({ name: debouncedName, type, dimension }),
    [debouncedName, type, dimension]
  );

  const { locations, totalCount, isLoading, isLoadingMore, hasMore, loadMore } =
    useLocationsInfinite(filters);

  const hasFilters = name || type !== "all" || dimension !== "all";

  const handleClear = () => {
    setName("");
    setType("all");
    setDimension("all");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <MapPin className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold">Locations</h1>
        </div>
        <p className="text-muted-foreground">
          Discover {totalCount > 0 ? `${totalCount} locations` : "locations"} across the multiverse
        </p>
      </div>

      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search locations..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Planet">Planet</SelectItem>
                <SelectItem value="Space station">Space Station</SelectItem>
                <SelectItem value="Microverse">Microverse</SelectItem>
                <SelectItem value="Dimension">Dimension</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dimension} onValueChange={setDimension}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="All Dimensions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dimensions</SelectItem>
                <SelectItem value="Dimension C-137">C-137</SelectItem>
                <SelectItem value="unknown">Unknown</SelectItem>
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
      ) : locations.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No locations found</p>
          <p className="text-muted-foreground text-sm mt-2">Try adjusting your filters</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
          <InfiniteScroller hasMore={hasMore} isLoading={isLoadingMore} onLoadMore={loadMore} />
        </>
      )}
    </div>
  );
}
