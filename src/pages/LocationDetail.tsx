import { useParams, Link } from "react-router-dom";
import { useLocationDetail } from "@/hooks/useLocations";
import { CharacterCard } from "@/components/CharacterCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Globe, Sparkles, Users } from "lucide-react";

export default function LocationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { location, residents, isLoading, isError } = useLocationDetail(id ? Number(id) : null);

  if (isLoading) return <LoadingSpinner />;

  if (isError || !location) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">Location not found</p>
          <Link to="/locations">
            <Button variant="outline" className="mt-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Locations
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/locations">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Locations
        </Button>
      </Link>

      <div className="space-y-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="outline" className="text-primary border-primary/50">
              <Globe className="h-3 w-3 mr-1" />
              {location.type || "Unknown Type"}
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{location.name}</h1>

          <div className="flex flex-wrap gap-4">
            <Card className="inline-flex">
              <CardContent className="p-4 flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Dimension</p>
                  <p className="font-medium">{location.dimension || "Unknown"}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="inline-flex">
              <CardContent className="p-4 flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Residents</p>
                  <p className="font-medium">{location.residents.length} residents</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {residents.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Notable Residents</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {residents.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
