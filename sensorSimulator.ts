import { SensorData, Alert } from '@/types/sensor';

// Simulate realistic sensor data with natural variations
export class SensorSimulator {
  private baseTemperature = 25;
  private baseHumidity = 60;
  private baseSoilMoisture = 45;
  private baseSoilPH = 6.5;

  generateSensorData(): SensorData {
    // Add realistic variations to sensor readings
    const temperature = this.baseTemperature + (Math.random() - 0.5) * 10;
    const humidity = Math.max(0, Math.min(100, this.baseHumidity + (Math.random() - 0.5) * 20));
    const soilMoisture = Math.max(0, Math.min(100, this.baseSoilMoisture + (Math.random() - 0.5) * 30));
    const soilPH = Math.max(4, Math.min(9, this.baseSoilPH + (Math.random() - 0.5) * 2));

    return {
      id: `sensor-${Date.now()}`,
      timestamp: new Date(),
      temperature: Math.round(temperature * 10) / 10,
      humidity: Math.round(humidity * 10) / 10,
      soilMoisture: Math.round(soilMoisture * 10) / 10,
      soilPH: Math.round(soilPH * 10) / 10,
    };
  }

  checkForAlerts(data: SensorData): Alert[] {
    const alerts: Alert[] = [];

    // Check for low soil moisture
    if (data.soilMoisture < 30) {
      alerts.push({
        id: `alert-${Date.now()}-moisture`,
        timestamp: new Date(),
        type: 'warning',
        message: `Low soil moisture detected: ${data.soilMoisture}%`,
        sensor: 'Soil Moisture',
      });
    }

    // Check for high temperature
    if (data.temperature > 35) {
      alerts.push({
        id: `alert-${Date.now()}-temp`,
        timestamp: new Date(),
        type: 'error',
        message: `High temperature alert: ${data.temperature}°C`,
        sensor: 'Temperature',
      });
    }

    // Check for extreme pH
    if (data.soilPH < 5.5 || data.soilPH > 7.5) {
      alerts.push({
        id: `alert-${Date.now()}-ph`,
        timestamp: new Date(),
        type: 'warning',
        message: `Soil pH outside optimal range: ${data.soilPH}`,
        sensor: 'Soil pH',
      });
    }

    // Check for low humidity
    if (data.humidity < 40) {
      alerts.push({
        id: `alert-${Date.now()}-humidity`,
        timestamp: new Date(),
        type: 'info',
        message: `Low humidity detected: ${data.humidity}%`,
        sensor: 'Humidity',
      });
    }

    return alerts;
  }
}
