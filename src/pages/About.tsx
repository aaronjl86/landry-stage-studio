import { Header } from "@/components/landing/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Target, Users, Zap } from "lucide-react";
import Footer4Col from "@/components/ui/footer-column";

export default function About() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About The Landry Method</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground mb-8">
              Transforming real estate marketing with AI-powered virtual staging technology
            </p>
            
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-6">
                The Landry Method was created to help real estate professionals showcase properties 
                at their full potential. We believe that every property deserves to be presented in 
                the best possible light, and our AI-powered virtual staging makes that accessible 
                and affordable for everyone.
              </p>
            </section>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center p-6 bg-card rounded-lg border">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Our Vision</h3>
                <p className="text-muted-foreground">
                  Make professional virtual staging accessible to every real estate professional
                </p>
              </div>
              
              <div className="text-center p-6 bg-card rounded-lg border">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Our Team</h3>
                <p className="text-muted-foreground">
                  A dedicated team of AI experts and real estate professionals
                </p>
              </div>
              
              <div className="text-center p-6 bg-card rounded-lg border">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Our Technology</h3>
                <p className="text-muted-foreground">
                  Cutting-edge AI that delivers professional results in seconds
                </p>
              </div>
            </div>
            
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start">
                  <span className="bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] bg-clip-text text-transparent mr-2">✓</span>
                  <span>Fast and affordable virtual staging that saves time and money</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] bg-clip-text text-transparent mr-2">✓</span>
                  <span>Professional-quality results that help properties sell faster</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] bg-clip-text text-transparent mr-2">✓</span>
                  <span>Easy-to-use platform designed specifically for real estate professionals</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] bg-clip-text text-transparent mr-2">✓</span>
                  <span>Constantly improving AI technology for better results</span>
                </li>
              </ul>
            </section>
            
            <div className="text-center mt-12">
              <Link to="/auth">
                <Button size="lg">Get Started Today</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer4Col />
    </div>
  );
}
