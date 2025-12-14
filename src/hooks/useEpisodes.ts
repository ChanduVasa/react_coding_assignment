import useSWRInfinite from "swr/infinite";
import useSWR from "swr";
import { getEpisodes, getEpisode, getMultipleCharacters, type Episode, type ApiResponse } from "@/lib/api";

interface EpisodeFilters {
  name: string;
  season: string;
}

export function useEpisodesInfinite(filters: EpisodeFilters) {
  const getKey = (pageIndex: number, previousPageData: ApiResponse<Episode> | null) => {
    if (previousPageData && !previousPageData.info.next) return null;
    return ["episodes-infinite", pageIndex + 1, filters] as const;
  };

  const { data, error, isLoading, isValidating, size, setSize } = useSWRInfinite(
    getKey,
    ([, page, filters]) =>
      getEpisodes({
        page,
        name: filters.name || undefined,
        episode: filters.season && filters.season !== "all" ? filters.season : undefined,
      }),
    { revalidateFirstPage: false, revalidateOnFocus: false }
  );

  const episodes = data ? data.flatMap((page) => page.results) : [];
  const totalCount = data?.[0]?.info.count || 0;
  const hasMore = data ? !!data[data.length - 1]?.info.next : false;

  return {
    episodes,
    totalCount,
    isLoading,
    isLoadingMore: isValidating && size > 1,
    isError: !!error,
    error,
    hasMore,
    loadMore: () => setSize(size + 1),
  };
}

export function useEpisodeDetail(id: number | null) {
  const { data: episode, error: episodeError, isLoading: episodeLoading } = useSWR(
    id ? ["episode", id] : null,
    () => getEpisode(id!)
  );

  const characterIds = episode?.characters.map((url) => Number(url.split("/").pop())) || [];

  const { data: characters, isLoading: charactersLoading } = useSWR(
    episode && characterIds.length > 0 ? ["episode-characters", id] : null,
    () => getMultipleCharacters(characterIds.slice(0, 12)),
    { fallbackData: [] }
  );

  return {
    episode,
    characters: characters || [],
    isLoading: episodeLoading || charactersLoading,
    isError: !!episodeError,
    error: episodeError,
  };
}
