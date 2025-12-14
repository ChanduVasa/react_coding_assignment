import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import Index from "./pages/Index";
import Characters from "./pages/Characters";
import CharacterDetail from "./pages/CharacterDetail";
import Episodes from "./pages/Episodes";
import EpisodeDetail from "./pages/EpisodeDetail";
import Locations from "./pages/Locations";
import LocationDetail from "./pages/LocationDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Navbar />
          <main>
            <Routes>
              <Route path="/react_coding_assignment/" element={<Index />} />
              <Route path="/characters" element={<Characters />} />
              <Route path="/characters/:id" element={<CharacterDetail />} />
              <Route path="/episodes" element={<Episodes />} />
              <Route path="/episodes/:id" element={<EpisodeDetail />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/locations/:id" element={<LocationDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
