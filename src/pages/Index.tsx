import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Tv, MapPin, ArrowRight, Sparkles } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Characters",
    description: "Explore all characters from Rick and Morty universe",
    href: "/characters",
    count: "826+",
  },
  {
    icon: Tv,
    title: "Episodes",
    description: "Browse through all episodes and seasons",
    href: "/episodes",
    count: "51+",
  },
  {
    icon: MapPin,
    title: "Locations",
    description: "Discover interdimensional locations",
    href: "/locations",
    count: "126+",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Powered by Rick and Morty API
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              Explore the{" "}
              <span className="text-primary text-glow">Multiverse</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Dive into the Rick and Morty universe. Discover characters, episodes, and
              interdimensional locations from the award-winning animated series.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/characters">
                <Button size="lg" className="portal-glow gap-2 w-full sm:w-auto">
                  Start Exploring
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/episodes">
                <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                  <Tv className="h-4 w-4" />
                  Browse Episodes
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What's Inside</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Access comprehensive data from the Rick and Morty universe with infinite scroll support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link key={feature.href} to={feature.href}>
                  <Card className="h-full transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 group cursor-pointer">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <Icon className="h-6 w-6" />
                        </div>
                        <span className="text-2xl font-bold text-primary">{feature.count}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="overflow-hidden border-primary/20">
            <CardContent className="p-0">
              <div className="gradient-portal p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">
                  Ready to Get Schwifty?
                </h2>
                <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
                  Start exploring the infinite dimensions of Rick and Morty's universe right now.
                </p>
                <Link to="/characters">
                  <Button size="lg" variant="secondary" className="gap-2">
                    Explore Characters
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
