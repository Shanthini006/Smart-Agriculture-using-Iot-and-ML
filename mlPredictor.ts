import { SensorData, Prediction } from '@/types/sensor';

// Simulate ML model predictions using rule-based logic
// In a real system, this would use a trained ML model
export class MLPredictor {
  predictIrrigation(data: SensorData): Prediction {
    // Decision logic based on multiple sensor inputs
    let score = 0;
    let totalWeight = 0;

    // Soil moisture weight: 40%
    const moistureWeight = 0.4;
    if (data.soilMoisture < 30) {
      score += 100 * moistureWeight;
    } else if (data.soilMoisture < 50) {
      score += 60 * moistureWeight;
    } else {
      score += 20 * moistureWeight;
    }
    totalWeight += moistureWeight;

    // Temperature weight: 30%
    const tempWeight = 0.3;
    if (data.temperature > 30) {
      score += 80 * tempWeight;
    } else if (data.temperature > 25) {
      score += 50 * tempWeight;
    } else {
      score += 20 * tempWeight;
    }
    totalWeight += tempWeight;

    // Humidity weight: 20%
    const humidityWeight = 0.2;
    if (data.humidity < 50) {
      score += 70 * humidityWeight;
    } else if (data.humidity < 70) {
      score += 40 * humidityWeight;
    } else {
      score += 10 * humidityWeight;
    }
    totalWeight += humidityWeight;

    // Soil pH weight: 10%
    const phWeight = 0.1;
    if (data.soilPH < 6.0 || data.soilPH > 7.5) {
      score += 50 * phWeight;
    } else {
      score += 30 * phWeight;
    }
    totalWeight += phWeight;

    const confidence = Math.round(score);
    const irrigationRequired = confidence > 50;

    return {
      id: `pred-${Date.now()}`,
      timestamp: new Date(),
      irrigationRequired,
      confidence,
    };
  }
}
