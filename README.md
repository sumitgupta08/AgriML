# Smart Agriculture Decision-Making Agent
> **An Intelligent Multi-Modal Decision Support System powered by ML, IoT Telemetry, RAG, and Autonomous Agent Reasoning.**

---

## 🌾 Project Overview
This platform transforms traditional agricultural crop and fertilizer prediction into an intelligent, closed-loop decision engine. It continuously ingests real-time soil telemetry, monitors weather conditions, queries an agronomic knowledge base via vector similarity search, runs machine learning inference, and synthesizes explainable farming recommendations.

---

## 🏗️ System Architecture

                   ┌─────────────────────────┐
                   │     Web Dashboard       │
                   │   (Vite + Vanilla JS)   │
                   └────────────┬────────────┘
                                │
                                ▼
                   ┌─────────────────────────┐
                   │   FastAPI Agent Engine  │
                   └────────────┬────────────┘
                                │
     ┌──────────────────────────┼──────────────────────────┐
     ▼                          ▼                          ▼
┌───────────┐              ┌───────────┐              ┌───────────┐
│ IoT Layer │              │ Weather   │              │    RAG    │
│ Telemetry │              │ Forecast  │              │ Knowledge │
└─────┬─────┘              └─────┬─────┘              └─────┬─────┘
      │                          │                          │
      └──────────────────────────┼──────────────────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │     ML Model Engine     │
                    │  (Random Forest, GBDT)  │
                    └────────────┬────────────┘
                                 │
                                 ▼
                      ┌─────────────────────────┐
                      │  Synthesized Actions &  │
                      │   Explainable Advice    │
                      └─────────────────────────┘

## 🚀 Key Modules

* **🤖 Autonomous Decision Agent (`backend/agent_engine.py`):** Correlates live sensor parameters, rainfall probability, and crop models to issue prioritized action plans with risk ratings.
* **📡 IoT Telemetry Pipeline (`backend/main.py`):** Ingests real-time $N$, $P$, $K$, soil pH, moisture, and ambient temperature readings with direct dashboard integration.
* **📚 RAG Agronomic Engine (`backend/rag_engine.py`):** TF-IDF vector retrieval engine performing similarity searches over structured agronomic management documents.
* **🌱 Machine Learning Models (`src/ml/`):** Custom Random Forest classifier for fertilizer optimization and Gradient Boosting regressor for yield estimation.
* **🌦️ Live Meteorological Service:** Integrates Open-Meteo API for real-time precipitation and humidity tracking.

---

## 🛠️ Local Setup & Execution

### 1. Start the FastAPI Backend
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload

2. Start the Frontend Dashboard
Bash
npm install
npm run dev


