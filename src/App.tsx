import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CookieBanner } from "@/components/CookieBanner";

// Route-level code splitting
const Index = lazy(() => import("./pages/Index"));
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Gallery = lazy(() => import("./pages/Gallery"));
const PublicGallery = lazy(() => import("./pages/PublicGallery"));
const Credits = lazy(() => import("./pages/Credits"));
const Pricing = lazy(() => import("./pages/Pricing"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Lazy-load Speed Insights only in production
const ProdSpeedInsights = import.meta.env.PROD
  ? lazy(() => import("@vercel/speed-insights/react").then(m => ({ default: m.SpeedInsights })))
  : null;

const queryClient = new QueryClient();

const App = () => {
  // Idle-time prefetch for common routes to speed up navigation
  useEffect(() => {
    const prefetch = () => {
      import("./pages/Auth");
      import("./pages/Pricing");
      import("./pages/Dashboard");
    };
    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(prefetch);
    } else {
      const id = setTimeout(prefetch, 2000);
      return () => clearTimeout(id);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {ProdSpeedInsights ? (
          <Suspense fallback={null}>
            <ProdSpeedInsights />
          </Suspense>
        ) : null}
        <BrowserRouter>
          <Suspense
            fallback={
              <div className="min-h-[50vh] flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/public-gallery" element={<PublicGallery />} />

              {/* Wrap only dashboard routes with AuthProvider to keep public bundle smaller */}
              <Route element={<AuthProvider><Outlet /></AuthProvider>}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/gallery" element={<Gallery />} />
                <Route path="/dashboard/credits" element={<Credits />} />
              </Route>

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <CookieBanner />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
