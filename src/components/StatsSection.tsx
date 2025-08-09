import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, Globe, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Shield,
    value: "99.7%",
    label: "Scam Detection Rate",
    description: "Accuracy in identifying fraudulent calls"
  },
  {
    icon: Users,
    value: "500K+",
    label: "Protected Users",
    description: "People safeguarded from phone scams"
  },
  {
    icon: Globe,
    value: "3",
    label: "Languages Supported",
    description: "English, Spanish, and French"
  },
  {
    icon: TrendingUp,
    value: "2.3M",
    label: "Threats Blocked",
    description: "Scam attempts prevented this year"
  }
];

const StatsSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-background via-background/90 to-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">Proven Protection Results</h2>
          <p className="text-xl text-muted-foreground">
            Real numbers from our AI-powered scam detection platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} variant="security" className="text-center group hover:scale-105 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center group-hover:animate-pulse-glow transition-all duration-300">
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-lg font-semibold mb-2">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.description}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;