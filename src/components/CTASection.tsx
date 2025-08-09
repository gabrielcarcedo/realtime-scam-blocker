import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Download, Smartphone } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <Card variant="monitoring" className="text-center">
          <CardContent className="pt-12 pb-12">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center animate-pulse-glow">
                <Shield className="w-10 h-10 text-primary-foreground" />
              </div>
            </div>
            
            <h2 className="text-4xl font-bold mb-6">
              Ready to Protect Yourself?
            </h2>
            
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Join thousands of users who trust ScamShield AI to protect them from phone scams. 
              Start your free protection today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button variant="hero" size="lg" className="text-lg px-8 py-4">
                <Download className="w-5 h-5 mr-2" />
                Get ScamShield AI
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                <Smartphone className="w-5 h-5 mr-2" />
                Try Live Demo
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p>✓ Free 30-day trial • ✓ No credit card required • ✓ Cancel anytime</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CTASection;