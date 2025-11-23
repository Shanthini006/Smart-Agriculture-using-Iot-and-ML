export interface SensorData {
  id: string;
  timestamp: Date;
  temperature: number;
  humidity: number;
  soilMoisture: number;
  soilPH: number;
}

export interface Prediction {
  id: string;
  timestamp: Date;
  irrigationRequired: boolean;
  confidence: number;
}

export interface Alert {
  id: string;
  timestamp: Date;
  type: 'warning' | 'error' | 'info';
  message: string;
  sensor: string;
}
