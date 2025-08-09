import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Mic, 
  MicOff,
  Globe,
  Volume2
} from "lucide-react";

interface ThreatData {
  timestamp: string;
  riskScore: number;
  language: string;
  transcript: string;
  threatType: string;
  confidence: number;
}

const Dashboard = () => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [currentRisk, setCurrentRisk] = useState(0);
  const [threats, setThreats] = useState<ThreatData[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState("English");

  // Simulate real-time threat detection
  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(() => {
      const riskLevel = Math.random() * 100;
      setCurrentRisk(riskLevel);
      
      if (riskLevel > 70) {
        const newThreat: ThreatData = {
          timestamp: new Date().toLocaleTimeString(),
          riskScore: riskLevel,
          language: currentLanguage,
          transcript: generateFakeTranscript(riskLevel),
          threatType: riskLevel > 90 ? "High Risk Scam" : "Suspicious Activity",
          confidence: 85 + Math.random() * 15
        };
        setThreats(prev => [newThreat, ...prev.slice(0, 4)]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isMonitoring, currentLanguage]);

  const generateFakeTranscript = (risk: number) => {
    const scamPhrases = [
      "Your account has been compromised, provide your password immediately",
      "You've won a cash prize, send us your bank details",
      "This is the IRS, you owe immediate payment",
      "Your computer is infected, download our software now",
      "Urgent: Your card will be blocked, confirm your PIN"
    ];
    
    const normalPhrases = [
      "Hello, how are you today?",
      "I'm calling about your appointment",
      "Thank you for your time",
      "Have a great day",
      "Can I help you with anything?"
    ];
    
    return risk > 70 ? scamPhrases[Math.floor(Math.random() * scamPhrases.length)] 
                     : normalPhrases[Math.floor(Math.random() * normalPhrases.length)];
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return "danger";
    if (score >= 50) return "warning";
    return "safe";
  };

  const getRiskVariant = (score: number) => {
    if (score >= 80) return "danger";
    if (score >= 50) return "default";
    return "safe";
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Live Protection Dashboard</h2>
          <p className="text-muted-foreground text-lg">
            Monitor calls in real-time with AI-powered scam detection
          </p>
        </div>

        {/* Control Panel */}
        <Card variant="monitoring" className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-6 h-6" />
                  ScamShield Status
                </CardTitle>
                <CardDescription>
                  {isMonitoring ? "Actively monitoring incoming calls" : "Protection disabled"}
                </CardDescription>
              </div>
              <Button
                variant={isMonitoring ? "danger" : "security"}
                onClick={() => setIsMonitoring(!isMonitoring)}
                className="flex items-center gap-2"
              >
                {isMonitoring ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                {isMonitoring ? "Stop Monitoring" : "Start Monitoring"}
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Real-time Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card variant={getRiskVariant(currentRisk)}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Current Risk Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{Math.round(currentRisk)}%</div>
              <div className="flex items-center gap-2">
                {currentRisk >= 80 ? (
                  <AlertTriangle className="w-4 h-4 text-security-danger" />
                ) : (
                  <CheckCircle className="w-4 h-4 text-security-safe" />
                )}
                <span className="text-sm text-muted-foreground">
                  {currentRisk >= 80 ? "High Risk" : currentRisk >= 50 ? "Medium Risk" : "Safe"}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card variant="security">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Active Language</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-6 h-6 text-primary" />
                <span className="text-2xl font-bold">{currentLanguage}</span>
              </div>
              <div className="flex gap-2">
                {["English", "Spanish", "French"].map((lang) => (
                  <Button
                    key={lang}
                    variant={lang === currentLanguage ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentLanguage(lang)}
                  >
                    {lang}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card variant="default">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Call Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-2">
                <Phone className="w-6 h-6 text-security-safe" />
                <span className="text-2xl font-bold">
                  {isMonitoring ? "Monitoring" : "Standby"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {isMonitoring ? "Audio stream active" : "No active calls"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Threat Detection Feed */}
        <Card variant="security">
          <CardHeader>
            <CardTitle>Recent Threat Detections</CardTitle>
            <CardDescription>
              Live feed of suspicious activities and scam attempts
            </CardDescription>
          </CardHeader>
          <CardContent>
            {threats.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {isMonitoring ? "No threats detected yet" : "Start monitoring to see threat detections"}
              </div>
            ) : (
              <div className="space-y-4">
                {threats.map((threat, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 bg-card/50"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant={getRiskColor(threat.riskScore) as any}>
                          {threat.threatType}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {threat.timestamp}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">
                          {Math.round(threat.riskScore)}%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {Math.round(threat.confidence)}% confidence
                        </div>
                      </div>
                    </div>
                    <div className="text-sm">
                      <strong>Language:</strong> {threat.language}
                    </div>
                    <div className="text-sm mt-2 p-2 bg-muted/50 rounded italic">
                      "{threat.transcript}"
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Dashboard;