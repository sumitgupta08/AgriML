from typing import Dict, Any, List
from rag_engine import retrieve_knowledge

class AgricultureDecisionAgent:
    def __init__(self):
        self.name = "Smart Agriculture Decision-Making Agent"
        self.version = "2.0"

    def run_agent_reasoning(
        self,
        crop: str,
        sensor: Dict[str, Any],
        weather: Dict[str, Any],
        ml_prediction: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Synthesizes telemetry, weather forecast, ML predictions, and RAG knowledge.
        """
        decisions: List[str] = []
        evidence: List[str] = []
        risk_level = "LOW"

        moisture = sensor.get("soil_moisture", 50.0)
        temp = sensor.get("temperature", 25.0)
        ph = sensor.get("soil_ph", 6.5)
        nitrogen = sensor.get("nitrogen", 50.0)
        rainfall = weather.get("rainfall", 0.0)

        fert_rec = ml_prediction.get("fertilizer", "Urea")
        yield_est = ml_prediction.get("yield", 4.5)

        # 1. Irrigation Reasoning via IoT + Weather + RAG
        rag_query = f"{crop} soil moisture irrigation water management"
        rag_guidelines = retrieve_knowledge(rag_query, k=1)
        rag_evidence = rag_guidelines[0] if rag_guidelines else "Maintain regular irrigation cycles."

        if moisture < 35.0:
            if rainfall > 20.0:
                decisions.append("Hold irrigation: Rain forecast is sufficient to recharge soil moisture.")
                evidence.append(f"Soil moisture is critical ({moisture}%), but upcoming rainfall is high ({rainfall} mm).")
                risk_level = "MEDIUM"
            else:
                decisions.append("Immediate irrigation required within the next 12–24 hours.")
                evidence.append(f"Low soil moisture ({moisture}%) with minimal expected precipitation ({rainfall} mm).")
                risk_level = "HIGH"
        elif moisture > 75.0:
            decisions.append("Postpone scheduled irrigation to prevent soil waterlogging and hypoxia.")
            evidence.append(f"High moisture reading ({moisture}%).")
            risk_level = "MEDIUM"
        else:
            decisions.append("Soil moisture levels are optimal for current crop growth stage.")
            evidence.append(f"Sensor moisture verified at {moisture}%.")

        # 2. Nutrient and Fertilizer Reasoning via ML + Soil Chemistry
        if ph < 5.8:
            decisions.append("Acidic soil detected. Apply agricultural lime (calcium carbonate) before fertilizer application.")
            evidence.append(f"Soil pH is {ph}. Low pH causes phosphorus lockup.")
        elif ph > 7.8:
            decisions.append("Alkaline soil detected. Supplement with gypsum to prevent micronutrient deficiency.")
            evidence.append(f"Soil pH is {ph}.")

        if nitrogen < 30.0:
            decisions.append(f"Apply split dosage of {fert_rec} to remediate acute nitrogen deficit.")
            evidence.append(f"Available Nitrogen is low ({nitrogen} kg/ha). Model target yield is {yield_est} t/ha.")
        else:
            decisions.append(f"Proceed with standard application schedule for {fert_rec} at predicted yield efficiency.")

        return {
            "agent_status": "DECISION_GENERATED",
            "crop": crop,
            "overall_risk": risk_level,
            "primary_actions": decisions,
            "telemetry_evidence": evidence,
            "ml_insights": {
                "recommended_fertilizer": fert_rec,
                "expected_yield_tonnes_per_hectare": yield_est,
                "model_confidence": ml_prediction.get("confidence", 0.91)
            },
            "rag_grounding_knowledge": rag_evidence
        }

agent_instance = AgricultureDecisionAgent()