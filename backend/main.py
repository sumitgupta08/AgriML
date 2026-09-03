from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
from typing import Optional

app = FastAPI(
    title="Smart Agriculture Decision-Making Agent",
    version="1.0.0"
)

# --------------------------------------------------
# CORS (Single definition)
# --------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------------------------------
# Sensor Data Model
# --------------------------------------------------
class SensorData(BaseModel):
    soil_moisture: float
    temperature: float
    humidity: float
    soil_ph: float
    nitrogen: float
    phosphorus: float
    potassium: float

# --------------------------------------------------
# Temporary IoT Storage
# --------------------------------------------------
latest_sensor_data: Optional[dict] = {
    "timestamp": datetime.now().isoformat(),
    "soil_moisture": 42.5,
    "temperature": 28.4,
    "humidity": 65.2,
    "soil_ph": 6.8,
    "nitrogen": 45.0,
    "phosphorus": 30.0,
    "potassium": 40.0,
}

# --------------------------------------------------
# Root & Health Endpoints
# --------------------------------------------------
@app.get("/")
def root():
    return {
        "message": "Smart Agriculture AI Backend is running"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "project": "Smart Agriculture Decision-Making Agent"
    }

# --------------------------------------------------
# Receive IoT Sensor Data
# --------------------------------------------------
@app.post("/iot/sensor-data")
def receive_sensor_data(data: SensorData):
    global latest_sensor_data

    latest_sensor_data = {
        "timestamp": datetime.now().isoformat(),
        "soil_moisture": data.soil_moisture,
        "temperature": data.temperature,
        "humidity": data.humidity,
        "soil_ph": data.soil_ph,
        "nitrogen": data.nitrogen,
        "phosphorus": data.phosphorus,
        "potassium": data.potassium,
    }

    return {
        "message": "Sensor data received successfully",
        "sensor_data": latest_sensor_data
    }

# --------------------------------------------------
# Get Latest IoT Data
# --------------------------------------------------
@app.get("/iot/latest")
def get_latest_sensor_data():
    if latest_sensor_data is None:
        raise HTTPException(
            status_code=404,
            detail="No sensor data available yet"
        )

    return {
        "status": "success",
        "sensor_data": latest_sensor_data
    }

# --------------------------------------------------
# Agriculture AI Analysis
# --------------------------------------------------
@app.post("/ai/analyze")
def analyze_agriculture(data: SensorData):
    recommendations = []

    # Soil moisture
    if data.soil_moisture < 30:
        recommendations.append("Soil moisture is low. Irrigation is recommended.")
    elif data.soil_moisture > 70:
        recommendations.append("Soil moisture is high. Avoid additional irrigation.")
    else:
        recommendations.append("Soil moisture is within a suitable range.")

    # Temperature
    if data.temperature > 35:
        recommendations.append("Temperature is high. Monitor crop heat stress.")
    elif data.temperature < 15:
        recommendations.append("Temperature is low. Monitor possible cold stress.")
    else:
        recommendations.append("Temperature is suitable for normal crop growth.")

    # Soil pH
    if data.soil_ph < 5.5:
        recommendations.append("Soil is acidic. Consider appropriate soil amendments.")
    elif data.soil_ph > 8:
        recommendations.append("Soil is alkaline. Consider appropriate soil management.")
    else:
        recommendations.append("Soil pH is in a generally suitable range.")

    # Nutrients
    if data.nitrogen < 30:
        recommendations.append("Nitrogen level is low. Consider nitrogen management.")
    if data.phosphorus < 20:
        recommendations.append("Phosphorus level is low. Consider phosphorus management.")
    if data.potassium < 20:
        recommendations.append("Potassium level is low. Consider potassium management.")

    return {
        "status": "analysis_completed",
        "sensor_data": data.model_dump(),
        "recommendations": recommendations
    }

import httpx

# --------------------------------------------------
# Live Weather Data (Open-Meteo API)
# --------------------------------------------------
@app.get("/weather/current")
async def get_live_weather(latitude: float = 28.6139, longitude: float = 77.2090):
    """
    Default coordinates: New Delhi (28.6139, 77.2090).
    Fetches real-time precipitation/rainfall, temperature, and humidity.
    """
    url = (
        f"https://api.open-meteo.com/v1/forecast?"
        f"latitude={latitude}&longitude={longitude}&current=temperature_2m,"
        f"relative_humidity_2m,precipitation,rain"
    )
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, timeout=5.0)
            if response.status_code != 200:
                raise HTTPException(status_code=502, detail="Weather provider error")
            data = response.json()
            current = data.get("current", {})
            return {
                "status": "success",
                "temperature": current.get("temperature_2m", 28.0),
                "humidity": current.get("relative_humidity_2m", 65.0),
                "rainfall": current.get("precipitation", 0.0)
            }
    except Exception as e:
        return {
            "status": "fallback",
            "temperature": 28.0,
            "humidity": 65.0,
            "rainfall": 12.5
        }

from rag_engine import retrieve_knowledge

class RagQuery(BaseModel):
    query: str
    top_k: Optional[int] = 2

# --------------------------------------------------
# RAG Knowledge Retrieval Endpoint
# --------------------------------------------------
@app.post("/rag/query")
def query_agriculture_knowledge(payload: RagQuery):
    results = retrieve_knowledge(payload.query, k=payload.top_k)
    return {
        "status": "success",
        "query": payload.query,
        "retrieved_context": results
    }

from agent_engine import agent_instance

class AgentDecisionRequest(BaseModel):
    crop: str = "Wheat"
    sensor_data: Optional[dict] = None
    weather_data: Optional[dict] = None
    ml_prediction: Optional[dict] = None

# --------------------------------------------------
# Full Agent Decision-Making Endpoint
# --------------------------------------------------
@app.post("/agent/recommend")
def get_agent_recommendation(payload: AgentDecisionRequest):
    global latest_sensor_data

    sensor = payload.sensor_data or latest_sensor_data or {
        "soil_moisture": 42.5,
        "temperature": 28.4,
        "humidity": 65.2,
        "soil_ph": 6.8,
        "nitrogen": 45.0,
        "phosphorus": 30.0,
        "potassium": 40.0,
    }
    weather = payload.weather_data or {"rainfall": 0.0, "temperature": 28.0}
    ml_info = payload.ml_prediction or {"fertilizer": "DAP", "yield": 5.21, "confidence": 0.92}

    decision_output = agent_instance.run_agent_reasoning(
        crop=payload.crop,
        sensor=sensor,
        weather=weather,
        ml_prediction=ml_info
    )
    return decision_output