import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tv, Calendar, Users } from "lucide-react";
import type { Episode } from "@/lib/api";

interface EpisodeCardProps {
  episode: Episode;
}

export function EpisodeCard({ episode }: EpisodeCardProps) {
  return (
    <Link to={`/episodes/${episode.id}`}>
      <Card className="h-full transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 group">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <Badge variant="outline" className="text-primary border-primary/50">
              <Tv className="h-3 w-3 mr-1" />
              {episode.episode}
            </Badge>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Users className="h-3 w-3" />
              {episode.characters.length}
            </span>
          </div>
          <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {episode.name}
          </h3>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Calendar className="h-3 w-3" />
            {episode.air_date}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
