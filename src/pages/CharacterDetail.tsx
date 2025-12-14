import { useParams, Link } from "react-router-dom";
import { useCharacterDetail } from "@/hooks/useCharacters";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Globe, Tv } from "lucide-react";

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

export default function CharacterDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { character, isLoading, isError } = useCharacterDetail(id ? Number(id) : null);

  if (isLoading) return <LoadingSpinner />;

  if (isError || !character) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">Character not found</p>
          <Link to="/characters">
            <Button variant="outline" className="mt-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Characters
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/characters">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Characters
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="overflow-hidden">
            <img
              src={character.image}
              alt={character.name}
              className="w-full aspect-square object-cover"
            />
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-bold">{character.name}</h1>
              <Badge variant="secondary" className="text-sm">
                <span className={`h-2 w-2 rounded-full mr-1.5 ${getStatusColor(character.status)}`} />
                {character.status}
              </Badge>
            </div>
            <p className="text-lg text-muted-foreground">
              {character.species} {character.type && `• ${character.type}`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Origin</p>
                    <p className="font-medium">{character.origin.name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last Known Location</p>
                    <p className="font-medium">{character.location.name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Tv className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Episodes</p>
                  <p className="font-medium">Appeared in {character.episode.length} episode{character.episode.length !== 1 ? 's' : ''}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Gender: {character.gender}</Badge>
            <Badge variant="outline">Species: {character.species}</Badge>
            {character.type && <Badge variant="outline">Type: {character.type}</Badge>}
          </div>
        </div>
      </div>
    </div>
  );
}
