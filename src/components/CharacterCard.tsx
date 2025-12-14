import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Character } from "@/lib/api";

interface CharacterCardProps {
  character: Character;
}

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case "alive":
      return "bg-status-alive";
    case "dead":
      return "bg-status-dead";
    default:
      return "bg-status-unknown";
  }
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Link to={`/characters/${character.id}`}>
      <Card className="h-full overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 group">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={character.image}
            alt={character.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="backdrop-blur-sm bg-card/90">
              <span className={`h-2 w-2 rounded-full mr-1.5 ${getStatusColor(character.status)}`} />
              {character.status}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold truncate group-hover:text-primary transition-colors">
            {character.name}
          </h3>
          <p className="text-sm text-muted-foreground">{character.species}</p>
          <div className="mt-2 space-y-1 text-sm text-muted-foreground">
            <p className="truncate">
              <span className="font-medium text-foreground">Origin:</span> {character.origin.name}
            </p>
            <p className="truncate">
              <span className="font-medium text-foreground">Location:</span> {character.location.name}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
