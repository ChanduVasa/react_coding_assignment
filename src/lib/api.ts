const API_BASE = "https://rickandmortyapi.com/api";

export interface Character {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface ApiResponse<T> {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T[];
}

interface CharacterFilters {
  page?: number;
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
}

interface EpisodeFilters {
  page?: number;
  name?: string;
  episode?: string;
}

interface LocationFilters {
  page?: number;
  name?: string;
  type?: string;
  dimension?: string;
}

function buildQueryString(params: { [key: string]: string | number | undefined }): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      searchParams.append(key, String(value));
    }
  });
  return searchParams.toString();
}

export async function getCharacters(filters: CharacterFilters = {}): Promise<ApiResponse<Character>> {
  const query = buildQueryString(filters as unknown as { [key: string]: string | number | undefined });
  const response = await fetch(`${API_BASE}/character${query ? `?${query}` : ""}`);
  if (!response.ok) {
    if (response.status === 404) {
      return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
    }
    throw new Error("Failed to fetch characters");
  }
  return response.json();
}

export async function getCharacter(id: number): Promise<Character> {
  const response = await fetch(`${API_BASE}/character/${id}`);
  if (!response.ok) throw new Error("Failed to fetch character");
  return response.json();
}

export async function getMultipleCharacters(ids: number[]): Promise<Character[]> {
  if (ids.length === 0) return [];
  if (ids.length === 1) {
    const char = await getCharacter(ids[0]);
    return [char];
  }
  const response = await fetch(`${API_BASE}/character/${ids.join(",")}`);
  if (!response.ok) throw new Error("Failed to fetch characters");
  return response.json();
}

export async function getEpisodes(filters: EpisodeFilters = {}): Promise<ApiResponse<Episode>> {
  const query = buildQueryString(filters as unknown as { [key: string]: string | number | undefined });
  const response = await fetch(`${API_BASE}/episode${query ? `?${query}` : ""}`);
  if (!response.ok) {
    if (response.status === 404) {
      return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
    }
    throw new Error("Failed to fetch episodes");
  }
  return response.json();
}

export async function getEpisode(id: number): Promise<Episode> {
  const response = await fetch(`${API_BASE}/episode/${id}`);
  if (!response.ok) throw new Error("Failed to fetch episode");
  return response.json();
}

export async function getLocations(filters: LocationFilters = {}): Promise<ApiResponse<Location>> {
  const query = buildQueryString(filters as unknown as { [key: string]: string | number | undefined });
  const response = await fetch(`${API_BASE}/location${query ? `?${query}` : ""}`);
  if (!response.ok) {
    if (response.status === 404) {
      return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
    }
    throw new Error("Failed to fetch locations");
  }
  return response.json();
}

export async function getLocation(id: number): Promise<Location> {
  const response = await fetch(`${API_BASE}/location/${id}`);
  if (!response.ok) throw new Error("Failed to fetch location");
  return response.json();
}
