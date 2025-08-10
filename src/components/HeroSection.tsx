import { Button } from "@/components/ui/button";
import { Shield, Mic, Brain, Globe } from "lucide-react";
import heroImage from "@/assets/hero-shield.jpg";

interface HeroSectionProps {
  onStartCall?: () => void;
}

const HeroSection = ({ onStartCall }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background/70">
        <img 
          src={heroImage} 
          alt="ScamShield AI Security" 
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-8">
            <div className="p-4 rounded-full bg-primary/10 border-2 border-primary/20 animate-pulse-glow">
              <Shield className="w-16 h-16 text-primary" />
            </div>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            ScamShield AI
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Real-time scam detection powered by AI
          </p>
          
          {/* Description */}
          <p className="text-lg text-muted-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Protect yourself from phone scams with advanced AI that detects fraudulent calls, 
            analyzes voice patterns, and provides instant alerts across multiple languages.
          </p>
          
          {/* Feature Icons */}
          <div className="flex justify-center gap-8 mb-12">
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 rounded-full bg-security-safe/10 border border-security-safe/20">
                <Mic className="w-6 h-6 text-security-safe" />
              </div>
              <span className="text-sm text-muted-foreground">Live Audio</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">AI Analysis</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 rounded-full bg-security-warning/10 border border-security-warning/20">
                <Globe className="w-6 h-6 text-security-warning" />
              </div>
              <span className="text-sm text-muted-foreground">Multi-Language</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="lg" 
              className="text-lg px-8 py-4"
              onClick={onStartCall}
            >
              Start Protection
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              View Demo
            </Button>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;