import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Users, Sparkles } from "lucide-react";
import type { Location } from "@/lib/api";

interface LocationCardProps {
  location: Location;
}

export function LocationCard({ location }: LocationCardProps) {
  return (
    <Link to={`/locations/${location.id}`}>
      <Card className="h-full transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 group">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <Badge variant="outline" className="text-primary border-primary/50">
              <Globe className="h-3 w-3 mr-1" />
              {location.type || "Unknown"}
            </Badge>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Users className="h-3 w-3" />
              {location.residents.length}
            </span>
          </div>
          <h3 className="text-lg font-semibold mb-2 truncate group-hover:text-primary transition-colors">
            {location.name}
          </h3>
          <p className="text-sm text-muted-foreground flex items-center gap-2 truncate">
            <Sparkles className="h-3 w-3 flex-shrink-0" />
            {location.dimension || "Unknown dimension"}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
