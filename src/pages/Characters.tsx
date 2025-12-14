import { useState, useMemo } from "react";
import { useCharactersInfinite } from "@/hooks/useCharacters";
import { CharacterCard } from "@/components/CharacterCard";
import { CharacterFilters } from "@/components/CharacterFilters";
import { InfiniteScroller } from "@/components/InfiniteScroller";
import { LoadingGrid } from "@/components/LoadingSpinner";
import { Users } from "lucide-react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

export default function CharactersPage() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("all");
  const [species, setSpecies] = useState("all");
  const [gender, setGender] = useState("all");

  const debouncedName = useDebouncedValue(name, 300);

  const filters = useMemo(
    () => ({ name: debouncedName, status, species, gender }),
    [debouncedName, status, species, gender]
  );

  const { characters, totalCount, isLoading, isLoadingMore, hasMore, loadMore } =
    useCharactersInfinite(filters);

  const handleClear = () => {
    setName("");
    setStatus("all");
    setSpecies("all");
    setGender("all");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Users className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold">Characters</h1>
        </div>
        <p className="text-muted-foreground">
          Explore {totalCount > 0 ? `${totalCount} characters` : "characters"} from the Rick and Morty universe
        </p>
      </div>

      <div className="mb-8">
        <CharacterFilters
          name={name}
          status={status}
          species={species}
          gender={gender}
          onNameChange={setName}
          onStatusChange={setStatus}
          onSpeciesChange={setSpecies}
          onGenderChange={setGender}
          onClear={handleClear}
        />
      </div>

      {isLoading ? (
        <LoadingGrid />
      ) : characters.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No characters found</p>
          <p className="text-muted-foreground text-sm mt-2">Try adjusting your filters</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
          <InfiniteScroller hasMore={hasMore} isLoading={isLoadingMore} onLoadMore={loadMore} />
        </>
      )}
    </div>
  );
}
