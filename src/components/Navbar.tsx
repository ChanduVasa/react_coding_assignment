import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import { Home, Users, Tv, MapPin, Sun, Moon, Menu, X } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/characters", label: "Characters", icon: Users },
  { href: "/episodes", label: "Episodes", icon: Tv },
  { href: "/locations", label: "Locations", icon: MapPin },
];

export function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-portal">
              <span className="text-lg font-bold text-primary-foreground">RM</span>
            </div>
            <span className="text-xl font-bold hidden sm:block">Rick & Morty</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                location.pathname === item.href ||
                (item.href !== "/" && location.pathname.startsWith(item.href));
              const Icon = item.icon;

              return (
                <Link key={item.href} to={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={cn("gap-2", isActive && "portal-glow-sm")}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="ml-2">
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
            {navItems.map((item) => {
              const isActive =
                location.pathname === item.href ||
                (item.href !== "/" && location.pathname.startsWith(item.href));
              const Icon = item.icon;

              return (
                <Link key={item.href} to={item.href} onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={cn("w-full justify-start gap-2", isActive && "portal-glow-sm")}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
