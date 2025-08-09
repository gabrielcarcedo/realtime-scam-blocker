import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Mic, 
  Brain, 
  Shield, 
  Globe, 
  Zap, 
  FileText,
  Volume2,
  AlertTriangle
} from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "Live Audio Capture",
    description: "Real-time audio monitoring using WebRTC and Twilio integration for seamless call analysis.",
    gradient: "from-security-safe to-security-safe/80"
  },
  {
    icon: Brain,
    title: "AI-Powered Detection",
    description: "Advanced machine learning models analyze speech patterns and detect scam indicators instantly.",
    gradient: "from-primary to-primary/80"
  },
  {
    icon: Shield,
    title: "Voice Spoofing Detection",
    description: "AASIST anti-spoofing technology identifies synthetic and manipulated voices with high accuracy.",
    gradient: "from-security-warning to-security-warning/80"
  },
  {
    icon: Globe,
    title: "Multi-Language Support",
    description: "Protect yourself in English, Spanish, and French with native language processing capabilities.",
    gradient: "from-accent to-accent/80"
  },
  {
    icon: Zap,
    title: "Real-Time Scoring",
    description: "Instant risk assessment with live threat scoring that updates as the conversation progresses.",
    gradient: "from-security-danger to-security-danger/80"
  },
  {
    icon: FileText,
    title: "Detailed Reports",
    description: "Comprehensive post-call summaries with flagged content, risk analysis, and safety recommendations.",
    gradient: "from-secondary to-secondary/80"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background via-background/50 to-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">Advanced Protection Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Cutting-edge AI technology working 24/7 to keep you safe from phone scams and fraudulent calls.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} variant="security" className="group hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:animate-pulse-glow transition-all duration-300`}>
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Technology Stack Highlight */}
        <div className="mt-16">
          <Card variant="monitoring" className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl mb-4">Powered by Industry-Leading Technology</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap justify-center gap-8 items-center">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Whisper AI</span>
                </div>
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-security-safe" />
                  <span className="font-semibold">AASIST</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-security-warning" />
                  <span className="font-semibold">Deepgram</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-security-danger" />
                  <span className="font-semibold">FastAPI</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;