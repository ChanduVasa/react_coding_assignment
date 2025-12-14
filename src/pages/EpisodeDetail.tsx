import { useParams, Link } from "react-router-dom";
import { useEpisodeDetail } from "@/hooks/useEpisodes";
import { CharacterCard } from "@/components/CharacterCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Tv, Calendar, Users } from "lucide-react";

export default function EpisodeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { episode, characters, isLoading, isError } = useEpisodeDetail(id ? Number(id) : null);

  if (isLoading) return <LoadingSpinner />;

  if (isError || !episode) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">Episode not found</p>
          <Link to="/episodes">
            <Button variant="outline" className="mt-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Episodes
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/episodes">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Episodes
        </Button>
      </Link>

      <div className="space-y-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="outline" className="text-primary border-primary/50">
              <Tv className="h-3 w-3 mr-1" />
              {episode.episode}
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{episode.name}</h1>

          <div className="flex flex-wrap gap-4">
            <Card className="inline-flex">
              <CardContent className="p-4 flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Air Date</p>
                  <p className="font-medium">{episode.air_date}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="inline-flex">
              <CardContent className="p-4 flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Characters</p>
                  <p className="font-medium">{episode.characters.length} characters</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {characters.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Featured Characters</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {characters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
