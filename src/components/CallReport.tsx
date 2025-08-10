import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Download, 
  Flag, 
  Phone,
  TrendingUp
} from "lucide-react";

interface RiskEvent {
  timestamp: string;
  transcript: string;
  riskScore: number;
  label: string;
  reason: string;
}

interface CallReportProps {
  events: RiskEvent[];
  callDuration: number;
  onNewCall: () => void;
}

const CallReport = ({ events, callDuration = 180, onNewCall }: CallReportProps) => {
  const maxRisk = events.length > 0 ? Math.max(...events.map(e => e.riskScore)) : 0.1;
  const timeInDanger = events.filter(e => e.riskScore >= 0.7).length * 3; // Assuming 3 seconds per event
  
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getScamSignals = () => {
    const signals = new Set<string>();
    events.forEach(event => {
      if (event.riskScore >= 0.7) {
        signals.add(event.reason);
      }
    });
    return Array.from(signals);
  };

  const getRiskColor = (score: number) => {
    if (score >= 0.7) return "destructive";
    if (score >= 0.3) return "default";
    return "secondary";
  };

  const getOverallRiskLevel = () => {
    if (maxRisk >= 0.8) return { level: "Alto Riesgo", color: "text-security-danger", icon: AlertTriangle };
    if (maxRisk >= 0.5) return { level: "Riesgo Medio", color: "text-security-warning", icon: Shield };
    return { level: "Seguro", color: "text-security-safe", icon: CheckCircle };
  };

  const riskLevel = getOverallRiskLevel();
  const IconComponent = riskLevel.icon;

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-4">
          <IconComponent className={`w-8 h-8 ${riskLevel.color}`} />
          <h1 className="text-2xl font-bold">Reporte de Llamada</h1>
        </div>
        <p className="text-muted-foreground">
          Análisis completo de la conversación detectada
        </p>
      </div>

      {/* General Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Resumen General
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Duración total</span>
              </div>
              <p className="text-lg font-bold">{formatDuration(callDuration)}</p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Riesgo máximo</span>
              </div>
              <p className={`text-lg font-bold ${riskLevel.color}`}>
                {Math.round(maxRisk * 100)}% - {riskLevel.level}
              </p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Tiempo en zona roja</span>
              </div>
              <p className="text-lg font-bold text-security-danger">
                {formatDuration(timeInDanger)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Critical Events */}
      {events.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Segmentos Críticos Detectados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.slice(0, 5).map((event, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant={getRiskColor(event.riskScore)}>
                        {event.label}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {event.timestamp}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-lg">
                        {Math.round(event.riskScore * 100)}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm">
                      <strong>Transcripción:</strong> "{event.transcript}"
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <strong>Motivo:</strong> {event.reason}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detected Signals */}
      {getScamSignals().length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Señales de Estafa Detectadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {getScamSignals().map((signal, index) => (
                <Badge key={index} variant="outline" className="bg-security-danger/10 text-security-danger border-security-danger/20">
                  {signal}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recomendaciones de Seguridad</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-security-safe mt-0.5" />
              <p className="text-sm">No compartas códigos OTP ni contraseñas por teléfono</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-security-safe mt-0.5" />
              <p className="text-sm">Verifica la identidad llamando por otra vía oficial</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-security-safe mt-0.5" />
              <p className="text-sm">Bloquea este número si no lo reconoces</p>
            </div>
            {maxRisk >= 0.7 && (
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-security-danger mt-0.5" />
                <p className="text-sm font-medium text-security-danger">
                  Esta llamada mostró patrones típicos de estafa. Ten especial cuidado.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button onClick={onNewCall} className="w-full" size="lg">
          <Phone className="w-4 h-4 mr-2" />
          Nueva Llamada
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button variant="outline" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Guardar Reporte
          </Button>
          
          <Button variant="outline" className="w-full">
            <Flag className="w-4 h-4 mr-2" />
            Reportar Llamada
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CallReport;