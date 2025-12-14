import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface CharacterFiltersProps {
  name: string;
  status: string;
  species: string;
  gender: string;
  onNameChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSpeciesChange: (value: string) => void;
  onGenderChange: (value: string) => void;
  onClear: () => void;
}

export function CharacterFilters({
  name,
  status,
  species,
  gender,
  onNameChange,
  onStatusChange,
  onSpeciesChange,
  onGenderChange,
  onClear,
}: CharacterFiltersProps) {
  const hasFilters = name || status !== "all" || species !== "all" || gender !== "all";

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search characters..."
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Select value={status} onValueChange={onStatusChange}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="alive">Alive</SelectItem>
              <SelectItem value="dead">Dead</SelectItem>
              <SelectItem value="unknown">Unknown</SelectItem>
            </SelectContent>
          </Select>

          <Select value={species} onValueChange={onSpeciesChange}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="All Species" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Species</SelectItem>
              <SelectItem value="Human">Human</SelectItem>
              <SelectItem value="Alien">Alien</SelectItem>
              <SelectItem value="Humanoid">Humanoid</SelectItem>
              <SelectItem value="Robot">Robot</SelectItem>
              <SelectItem value="Animal">Animal</SelectItem>
            </SelectContent>
          </Select>

          <Select value={gender} onValueChange={onGenderChange}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="All Genders" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genders</SelectItem>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Genderless">Genderless</SelectItem>
              <SelectItem value="unknown">Unknown</SelectItem>
            </SelectContent>
          </Select>

          {hasFilters && (
            <Button variant="ghost" size="icon" onClick={onClear}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
