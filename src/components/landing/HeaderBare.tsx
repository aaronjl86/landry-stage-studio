import { Link } from "react-router-dom";
import tlmLogoWhite from "@/assets/tlm-logo-white.png";

export const HeaderBare = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex h-[80px] md:h-[100px] items-center justify-between gap-2 md:gap-4">
          <Link to="/" className="flex items-center flex-shrink-0 max-w-[70%] md:max-w-none">
            <img
              src={tlmLogoWhite}
              alt="The Landry Method"
              className="h-[60px] md:h-[80px] w-auto object-contain"
              width={240}
              height={80}
              loading="eager"
              decoding="async"
            />
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/public-gallery" className="text-sm font-semibold hover:underline">Gallery</Link>
            <Link to="/pricing" className="text-sm font-semibold hover:underline">Pricing</Link>
            <Link to="/about" className="text-sm font-semibold hover:underline hidden sm:inline">About</Link>
            <Link to="/contact" className="text-sm font-semibold hover:underline hidden sm:inline">Contact</Link>
            <Link
              to="/auth"
              className="ml-2 px-4 py-2 rounded-md text-sm font-bold text-white"
              style={{
                backgroundImage:
                  "linear-gradient(to right, hsl(280,70%,70%), hsl(265,65%,55%), hsl(290,75%,65%))",
              }}
            >
              Sign In
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
