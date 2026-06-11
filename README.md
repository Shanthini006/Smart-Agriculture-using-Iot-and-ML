<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,20,24&height=170&section=header&text=Smart+Agriculture+🌱&fontSize=40&fontColor=fff&animation=twinkling&fontAlignY=35&desc=IoT+Sensor+Dashboard+%2B+ML+Crop+Predictions+%7C+React+%C2%B7+TypeScript+%C2%B7+Vite&descAlignY=62&descSize=15" width="100%"/>

<div align="center">

[![TypeScript](https://img.shields.io/badge/TypeScript-96.6%25-3178C6?style=for-the-badge&logo=typescript&logoColor=white)]()
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)]()
[![Vite](https://img.shields.io/badge/Vite-Build-646CFF?style=for-the-badge&logo=vite&logoColor=white)]()
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-Styling-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)]()
[![Repo](https://img.shields.io/badge/GitHub-Shanthini006-181717?style=for-the-badge&logo=github)](https://github.com/Shanthini006/Smart-Agriculture-using-Iot-and-ML)

</div>

---

## 🌾 About This Project

A **Smart Agriculture Dashboard** that combines IoT sensor simulation with ML-based crop predictions — built entirely in React + TypeScript. The system simulates real-time sensor data (temperature, humidity, soil moisture), visualises it through live charts, triggers smart alerts, and uses an ML predictor engine to recommend farming actions.

> Built as part of the **Naan Mudhalvan Initiative** — a government-backed program for industry-relevant student projects.

---

## ✨ Key Features

- 📡 **Live IoT Sensor Simulation** — `sensorSimulator.ts` generates real-time data streams mimicking physical sensors (temperature, soil moisture, humidity)
- 🤖 **ML Prediction Engine** — `mlPredictor.ts` analyses sensor readings and outputs crop health predictions and action recommendations
- 📊 **Interactive Charts** — `SensorChart.tsx` renders live time-series sensor data with Recharts
- 🃏 **Sensor Cards** — `SensorCard.tsx` displays per-sensor live metrics with status indicators
- 🔔 **Smart Alerts** — `AlertsList.tsx` surfaces threshold-based warnings (e.g. overwatering, heat stress)
- 💡 **Prediction Cards** — `PredictionCard.tsx` shows ML output — predicted crop status with confidence
- 💾 **Data Storage Layer** — `dataStorage.ts` manages in-session sensor history and prediction logs
- 📱 **Fully Responsive** — mobile-first layout via Tailwind CSS + shadcn/ui components

---

## 🔧 Tech Stack

| Layer | Technology |
|:------|:-----------|
| **Framework** | React 18 + TypeScript |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS |
| **UI Components** | shadcn/ui (Radix UI primitives) |
| **Charts** | Recharts (via `SensorChart.tsx`) |
| **IoT Layer** | Custom sensor simulator (`sensorSimulator.ts`) |
| **ML Layer** | Custom predictor logic (`mlPredictor.ts`) |
| **Routing** | React Router (`NavLink.tsx`, `NotFound.tsx`) |
| **Notifications** | Sonner toast (`sonner.tsx`) |

---

## 🗂️ Key Files

```
Smart-Agriculture-using-Iot-and-ML/
│
├── App.tsx               # Root component — layout & routing
├── main.tsx              # App entry point
├── Index.tsx             # Dashboard home page
│
├── sensor.ts             # Sensor type definitions & interfaces
├── sensorSimulator.ts    # IoT data simulation engine (real-time streams)
├── mlPredictor.ts        # ML logic — processes sensor data → predictions
├── dataStorage.ts        # In-session data management & history
│
├── SensorCard.tsx        # Live per-sensor metric card component
├── SensorChart.tsx       # Time-series chart for sensor readings
├── AlertsList.tsx        # Threshold alert notifications component
├── PredictionCard.tsx    # ML prediction output display component
│
├── NavLink.tsx           # Navigation component
├── NotFound.tsx          # 404 page
│
├── App.css / index.css   # Global styles
├── tailwind.config.ts    # Tailwind configuration
├── vite.config.ts        # Vite build config
└── package.json          # Dependencies & scripts
```

---

## 🏗️ System Architecture

```
IoT Layer                  ML Layer                 UI Layer
─────────────────          ──────────────────       ──────────────────────
sensorSimulator.ts   →     mlPredictor.ts     →     PredictionCard.tsx
  (generates data)           (analyses data)          (shows results)
       │                                                    │
       ↓                                                    ↓
  dataStorage.ts       →     SensorChart.tsx       AlertsList.tsx
  (stores history)           (visualises data)      (shows warnings)
       │
       ↓
  SensorCard.tsx
  (live metrics)
```

---

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/Shanthini006/Smart-Agriculture-using-Iot-and-ML.git

# 2. Navigate into the project
cd Smart-Agriculture-using-Iot-and-ML

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

---

## 📦 Scripts

| Command | Description |
|:--------|:------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

---

## 🧠 How the ML Predictor Works

`mlPredictor.ts` receives a rolling window of sensor readings from the simulator and applies rule-based + weighted scoring logic to output:

- **Crop Health Status** — Healthy / At Risk / Critical
- **Recommended Action** — Irrigate / Reduce watering / Check soil pH / No action needed
- **Confidence Score** — How strongly the model backs its prediction

This is a frontend ML simulation — no external API calls, no Python backend. All logic runs in-browser in TypeScript.

---

## 📡 Sensors Simulated

| Sensor | Unit | Normal Range |
|:-------|:-----|:-------------|
| Soil Moisture | % | 40 – 70% |
| Air Temperature | °C | 20 – 35°C |
| Humidity | % | 50 – 80% |
| Light Intensity | lux | 10,000 – 50,000 |
| Soil pH | pH | 6.0 – 7.5 |

---

## 👩‍💻 Author

<div align="center">

**Shanthini S**
B.Tech – Information Technology · CGPA 8.0
DMI College of Engineering, Chennai

[![LinkedIn](https://img.shields.io/badge/LinkedIn-shanthini06-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/shanthini06)
[![Email](https://img.shields.io/badge/Email-shanthiniuma2005@gmail.com-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:shanthiniuma2005@gmail.com)
[![GitHub](https://img.shields.io/badge/GitHub-Shanthini006-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Shanthini006)

</div>

---

## 📄 License

This project is open source under the [MIT License](LICENSE).

---

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,20,24&height=100&section=footer&animation=twinkling" width="100%"/>
