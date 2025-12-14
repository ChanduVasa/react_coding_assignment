import useSWRInfinite from "swr/infinite";
import useSWR from "swr";
import { getCharacters, getCharacter, type Character, type ApiResponse } from "@/lib/api";

interface CharacterFilters {
  name: string;
  status: string;
  species: string;
  gender: string;
}

export function useCharactersInfinite(filters: CharacterFilters) {
  const getKey = (pageIndex: number, previousPageData: ApiResponse<Character> | null) => {
    if (previousPageData && !previousPageData.info.next) return null;
    return ["characters-infinite", pageIndex + 1, filters] as const;
  };

  const { data, error, isLoading, isValidating, size, setSize } = useSWRInfinite(
    getKey,
    ([, page, filters]) =>
      getCharacters({
        page,
        name: filters.name || undefined,
        status: filters.status !== "all" ? filters.status : undefined,
        species: filters.species !== "all" ? filters.species : undefined,
        gender: filters.gender !== "all" ? filters.gender : undefined,
      }),
    { revalidateFirstPage: false, revalidateOnFocus: false }
  );

  const characters = data ? data.flatMap((page) => page.results) : [];
  const totalCount = data?.[0]?.info.count || 0;
  const hasMore = data ? !!data[data.length - 1]?.info.next : false;

  return {
    characters,
    totalCount,
    isLoading,
    isLoadingMore: isValidating && size > 1,
    isError: !!error,
    error,
    hasMore,
    loadMore: () => setSize(size + 1),
  };
}

export function useCharacterDetail(id: number | null) {
  const { data, error, isLoading } = useSWR(
    id ? ["character", id] : null,
    () => getCharacter(id!)
  );

  return {
    character: data,
    isLoading,
    isError: !!error,
    error,
  };
}
