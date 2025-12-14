import useSWRInfinite from "swr/infinite";
import useSWR from "swr";
import { getLocations, getLocation, getMultipleCharacters, type Location, type ApiResponse } from "@/lib/api";

interface LocationFilters {
  name: string;
  type: string;
  dimension: string;
}

export function useLocationsInfinite(filters: LocationFilters) {
  const getKey = (pageIndex: number, previousPageData: ApiResponse<Location> | null) => {
    if (previousPageData && !previousPageData.info.next) return null;
    return ["locations-infinite", pageIndex + 1, filters] as const;
  };

  const { data, error, isLoading, isValidating, size, setSize } = useSWRInfinite(
    getKey,
    ([, page, filters]) =>
      getLocations({
        page,
        name: filters.name || undefined,
        type: filters.type !== "all" ? filters.type : undefined,
        dimension: filters.dimension !== "all" ? filters.dimension : undefined,
      }),
    { revalidateFirstPage: false, revalidateOnFocus: false }
  );

  const locations = data ? data.flatMap((page) => page.results) : [];
  const totalCount = data?.[0]?.info.count || 0;
  const hasMore = data ? !!data[data.length - 1]?.info.next : false;

  return {
    locations,
    totalCount,
    isLoading,
    isLoadingMore: isValidating && size > 1,
    isError: !!error,
    error,
    hasMore,
    loadMore: () => setSize(size + 1),
  };
}

export function useLocationDetail(id: number | null) {
  const { data: location, error: locationError, isLoading: locationLoading } = useSWR(
    id ? ["location", id] : null,
    () => getLocation(id!)
  );

  const residentIds = location?.residents.map((url) => Number(url.split("/").pop())) || [];

  const { data: residents, isLoading: residentsLoading } = useSWR(
    location && residentIds.length > 0 ? ["location-residents", id] : null,
    () => getMultipleCharacters(residentIds.slice(0, 12)),
    { fallbackData: [] }
  );

  return {
    location,
    residents: residents || [],
    isLoading: locationLoading || residentsLoading,
    isError: !!locationError,
    error: locationError,
  };
}
