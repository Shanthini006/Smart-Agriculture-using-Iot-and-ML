import { useState, useEffect } from 'react';
import { SensorSimulator } from '@/utils/sensorSimulator';
import { MLPredictor } from '@/utils/mlPredictor';
import { DataStorage } from '@/utils/dataStorage';
import { SensorData, Prediction, Alert } from '@/types/sensor';
import { SensorCard } from '@/components/SensorCard';
import { PredictionCard } from '@/components/PredictionCard';
import { AlertsList } from '@/components/AlertsList';
import { SensorChart } from '@/components/SensorChart';
import { Thermometer, Droplets, Sprout, FlaskConical, Leaf, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const simulator = new SensorSimulator();
const predictor = new MLPredictor();
const storage = new DataStorage();

const Index = () => {
  const [currentData, setCurrentData] = useState<SensorData | null>(null);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [historicalData, setHistoricalData] = useState<SensorData[]>([]);
  const { toast } = useToast();

  const updateSensorData = () => {
    // Generate new sensor data
    const newData = simulator.generateSensorData();
    setCurrentData(newData);

    // Generate prediction
    const newPrediction = predictor.predictIrrigation(newData);
    setPrediction(newPrediction);

    // Check for alerts
    const newAlerts = simulator.checkForAlerts(newData);
    if (newAlerts.length > 0) {
      setAlerts((prev) => [...newAlerts, ...prev].slice(0, 10));
      storage.saveAlerts(newAlerts);
      
      // Show toast for critical alerts
      newAlerts.forEach((alert) => {
        if (alert.type === 'error') {
          toast({
            title: 'Critical Alert',
            description: alert.message,
            variant: 'destructive',
          });
        }
      });
    }

    // Save to storage
    storage.saveSensorData(newData);
    storage.savePrediction(newPrediction);

    // Update historical data
    setHistoricalData((prev) => [newData, ...prev].slice(0, 50));
  };

  useEffect(() => {
    // Load initial data
    const logs = storage.getSensorLogs();
    if (logs.length > 0) {
      setHistoricalData(logs);
      setCurrentData(logs[0]);
      
      const predictions = storage.getPredictions();
      if (predictions.length > 0) {
        setPrediction(predictions[0]);
      }
      
      setAlerts(storage.getAlerts());
    } else {
      // Generate initial data if none exists
      updateSensorData();
    }

    // Update every 3 seconds
    const interval = setInterval(updateSensorData, 3000);
    return () => clearInterval(interval);
  }, []);

  const getSensorStatus = (value: number, type: string): 'normal' | 'warning' | 'error' => {
    switch (type) {
      case 'temperature':
        return value > 35 ? 'error' : value > 30 ? 'warning' : 'normal';
      case 'moisture':
        return value < 30 ? 'error' : value < 50 ? 'warning' : 'normal';
      case 'humidity':
        return value < 40 ? 'warning' : 'normal';
      case 'ph':
        return value < 5.5 || value > 7.5 ? 'warning' : 'normal';
      default:
        return 'normal';
    }
  };

  if (!currentData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Initializing sensors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Smart Agriculture IoT</h1>
                <p className="text-sm text-muted-foreground">Real-time Monitoring & ML Predictions</p>
              </div>
            </div>
            <Button
              onClick={updateSensorData}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Sensor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <SensorCard
            title="Temperature"
            value={currentData.temperature}
            unit="°C"
            icon={Thermometer}
            status={getSensorStatus(currentData.temperature, 'temperature')}
          />
          <SensorCard
            title="Humidity"
            value={currentData.humidity}
            unit="%"
            icon={Droplets}
            status={getSensorStatus(currentData.humidity, 'humidity')}
          />
          <SensorCard
            title="Soil Moisture"
            value={currentData.soilMoisture}
            unit="%"
            icon={Sprout}
            status={getSensorStatus(currentData.soilMoisture, 'moisture')}
          />
          <SensorCard
            title="Soil pH"
            value={currentData.soilPH}
            unit="pH"
            icon={FlaskConical}
            status={getSensorStatus(currentData.soilPH, 'ph')}
          />
        </div>

        {/* Prediction Card */}
        {prediction && (
          <div className="mb-8">
            <PredictionCard
              irrigationRequired={prediction.irrigationRequired}
              confidence={prediction.confidence}
            />
          </div>
        )}

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SensorChart
            title="Soil Moisture Trend"
            data={historicalData.map((d) => ({ timestamp: d.timestamp, value: d.soilMoisture }))}
            dataKey="soilMoisture"
            color="hsl(var(--chart-1))"
            unit="%"
          />
          <SensorChart
            title="Temperature Trend"
            data={historicalData.map((d) => ({ timestamp: d.timestamp, value: d.temperature }))}
            dataKey="temperature"
            color="hsl(var(--chart-2))"
            unit="°C"
          />
        </div>

        {/* Alerts Section */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Recent Alerts</h2>
          <AlertsList alerts={alerts} />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Smart Agriculture IoT System • Real-time monitoring with ML-powered predictions</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
