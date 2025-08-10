import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import Dashboard from "@/components/Dashboard";
import CallScreen from "@/components/CallScreen";
import CallReport from "@/components/CallReport";
import FeaturesSection from "@/components/FeaturesSection";
import StatsSection from "@/components/StatsSection";


interface RiskEvent {
  timestamp: string;
  transcript: string;
  riskScore: number;
  label: string;
  reason: string;
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'call' | 'report'>('home');
  const [callEvents, setCallEvents] = useState<RiskEvent[]>([]);

  const handleStartCall = () => {
    setCurrentScreen('call');
  };

  const handleEndCall = () => {
    setCurrentScreen('home');
  };

  const handleCallReport = (events: RiskEvent[]) => {
    setCallEvents(events);
    setCurrentScreen('report');
  };

  const handleNewCall = () => {
    setCallEvents([]);
    setCurrentScreen('call');
  };

  if (currentScreen === 'call') {
    return (
      <CallScreen 
        onEndCall={handleEndCall}
        onCallReport={handleCallReport}
      />
    );
  }

  if (currentScreen === 'report') {
    return (
      <CallReport 
        events={callEvents}
        callDuration={180}
        onNewCall={handleNewCall}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onStartCall={handleStartCall} />
      <FeaturesSection />
      <Dashboard />
      <StatsSection />
    </div>
  );
};

export default Index;
