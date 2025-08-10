import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Phone, 
  PhoneOff, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  User,
  EyeOff,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RiskEvent {
  timestamp: string;
  transcript: string;
  riskScore: number;
  label: string;
  reason: string;
}

interface CallScreenProps {
  onEndCall: () => void;
  onCallReport: (events: RiskEvent[]) => void;
}

const CallScreen = ({ onEndCall, onCallReport }: CallScreenProps) => {
  const [currentRisk, setCurrentRisk] = useState(0.1);
  const [isHidden, setIsHidden] = useState(false);
  const [hideTimer, setHideTimer] = useState(0);
  const [riskEvents, setRiskEvents] = useState<RiskEvent[]>([]);
  const [showEvents, setShowEvents] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  // Simulate call duration
  useEffect(() => {
    const interval = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simulate real-time risk updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newRisk = Math.random();
      setCurrentRisk(newRisk);
      
      if (newRisk > 0.7) {
        const newEvent: RiskEvent = {
          timestamp: new Date().toLocaleTimeString(),
          transcript: getRandomScamPhrase(),
          riskScore: newRisk,
          label: newRisk > 0.8 ? "Scam" : "Suspicious",
          reason: getRandomReason()
        };
        setRiskEvents(prev => [newEvent, ...prev.slice(0, 4)]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Hide timer countdown
  useEffect(() => {
    if (hideTimer > 0) {
      const timeout = setTimeout(() => {
        setHideTimer(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timeout);
    } else if (hideTimer === 0 && isHidden) {
      setIsHidden(false);
    }
  }, [hideTimer, isHidden]);

  const getRandomScamPhrase = () => {
    const phrases = [
      "Necesito su código de verificación inmediatamente",
      "Su cuenta será suspendida si no actúa ahora",
      "Confirme su PIN para evitar bloqueo",
      "Haga clic en este enlace urgente",
      "Proporcione su contraseña para verificación"
    ];
    return phrases[Math.floor(Math.random() * phrases.length)];
  };

  const getRandomReason = () => {
    const reasons = [
      "Solicita código urgente por SMS",
      "Menciona suspensión de cuenta",
      "Presión temporal excesiva",
      "Solicita datos confidenciales",
      "Patrón de voz sintética detectado"
    ];
    return reasons[Math.floor(Math.random() * reasons.length)];
  };

  const getRiskColor = () => {
    if (currentRisk >= 0.7) return "bg-security-danger";
    if (currentRisk >= 0.3) return "bg-security-warning";
    return "bg-security-safe";
  };

  const getRiskLabel = () => {
    if (currentRisk >= 0.7) return "Estafa probable";
    if (currentRisk >= 0.3) return "Sospechoso";
    return "Seguro";
  };

  const getRiskIcon = () => {
    if (currentRisk >= 0.7) return <AlertTriangle className="w-4 h-4" />;
    if (currentRisk >= 0.3) return <Shield className="w-4 h-4" />;
    return <CheckCircle className="w-4 h-4" />;
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    onCallReport(riskEvents);
    onEndCall();
  };

  const handleHideAlert = () => {
    setIsHidden(true);
    setHideTimer(60);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Call Area - 70% */}
      <div className="flex-1 relative bg-gradient-to-br from-muted/20 to-muted/40">
        {/* Call Duration */}
        <div className="absolute top-4 left-4 z-10">
          <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
            {formatDuration(callDuration)}
          </Badge>
        </div>

        {/* Local Video Area */}
        <div className="h-full flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="w-16 h-16 text-primary" />
          </div>
        </div>

        {/* Remote Contact Area - Top Right */}
        <div className="absolute top-4 right-4 w-24 h-32 bg-card rounded-lg border flex items-center justify-center">
          <User className="w-8 h-8 text-muted-foreground" />
        </div>

        {/* End Call Button */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <Button 
            variant="danger" 
            size="lg" 
            className="rounded-full w-16 h-16"
            onClick={handleEndCall}
          >
            <PhoneOff className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Risk Overlay - 20% */}
      {!isHidden && (
        <div className="h-[20%] bg-card border-t border-border p-4 space-y-3">
          {/* Risk Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getRiskIcon()}
                <span className="font-medium text-sm">{getRiskLabel()}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleHideAlert}
                className="text-xs"
              >
                <EyeOff className="w-3 h-3 mr-1" />
                Ocultar 60s
              </Button>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={cn("h-2 rounded-full transition-all duration-500", getRiskColor())}
                style={{ width: `${currentRisk * 100}%` }}
              />
            </div>
            
            {/* Risk Reasoning */}
            {currentRisk >= 0.3 && (
              <p className="text-xs text-muted-foreground">
                {getRandomReason()}
              </p>
            )}
          </div>

          {/* Critical Events */}
          {riskEvents.length > 0 && (
            <div className="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowEvents(!showEvents)}
                className="w-full justify-between text-xs h-6"
              >
                <span>Eventos críticos ({riskEvents.length})</span>
                {showEvents ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </Button>
              
              {showEvents && (
                <div className="space-y-1 max-h-20 overflow-y-auto">
                  {riskEvents.slice(0, 3).map((event, index) => (
                    <div key={index} className="bg-muted/50 rounded p-2 text-xs">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={event.label === "Scam" ? "destructive" : "default"} className="text-[10px] py-0 px-1">
                          {event.label}
                        </Badge>
                        <span className="text-muted-foreground">{event.timestamp}</span>
                      </div>
                      <p className="truncate">{event.transcript}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Hide Timer Display */}
      {isHidden && hideTimer > 0 && (
        <div className="fixed bottom-4 right-4 bg-card border rounded-lg p-2">
          <span className="text-xs text-muted-foreground">
            Alerta oculta: {hideTimer}s
          </span>
        </div>
      )}
    </div>
  );
};

export default CallScreen;