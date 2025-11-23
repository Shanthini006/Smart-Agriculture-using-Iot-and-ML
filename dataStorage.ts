import { SensorData, Prediction, Alert } from '@/types/sensor';

const SENSOR_LOGS_KEY = 'iot_sensor_logs';
const PREDICTIONS_KEY = 'iot_predictions';
const ALERTS_KEY = 'iot_alerts';
const MAX_RECORDS = 100;

export class DataStorage {
  saveSensorData(data: SensorData): void {
    const logs = this.getSensorLogs();
    logs.unshift(data);
    
    // Keep only the latest MAX_RECORDS
    if (logs.length > MAX_RECORDS) {
      logs.splice(MAX_RECORDS);
    }
    
    localStorage.setItem(SENSOR_LOGS_KEY, JSON.stringify(logs));
  }

  getSensorLogs(): SensorData[] {
    const data = localStorage.getItem(SENSOR_LOGS_KEY);
    if (!data) return [];
    
    return JSON.parse(data).map((item: any) => ({
      ...item,
      timestamp: new Date(item.timestamp),
    }));
  }

  savePrediction(prediction: Prediction): void {
    const predictions = this.getPredictions();
    predictions.unshift(prediction);
    
    if (predictions.length > MAX_RECORDS) {
      predictions.splice(MAX_RECORDS);
    }
    
    localStorage.setItem(PREDICTIONS_KEY, JSON.stringify(predictions));
  }

  getPredictions(): Prediction[] {
    const data = localStorage.getItem(PREDICTIONS_KEY);
    if (!data) return [];
    
    return JSON.parse(data).map((item: any) => ({
      ...item,
      timestamp: new Date(item.timestamp),
    }));
  }

  saveAlerts(alerts: Alert[]): void {
    const existingAlerts = this.getAlerts();
    const allAlerts = [...alerts, ...existingAlerts];
    
    if (allAlerts.length > MAX_RECORDS) {
      allAlerts.splice(MAX_RECORDS);
    }
    
    localStorage.setItem(ALERTS_KEY, JSON.stringify(allAlerts));
  }

  getAlerts(): Alert[] {
    const data = localStorage.getItem(ALERTS_KEY);
    if (!data) return [];
    
    return JSON.parse(data).map((item: any) => ({
      ...item,
      timestamp: new Date(item.timestamp),
    }));
  }

  clearAllData(): void {
    localStorage.removeItem(SENSOR_LOGS_KEY);
    localStorage.removeItem(PREDICTIONS_KEY);
    localStorage.removeItem(ALERTS_KEY);
  }
}
