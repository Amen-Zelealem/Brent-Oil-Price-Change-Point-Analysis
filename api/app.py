from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
from models.oil_price_analysis import (
    load_price_data,
    calculate_price_trends,
    calculate_yearly_average_price,
    calculate_analysis_metrics,
    calculate_price_distribution,
    calculate_event_impact,
    get_prices_around_event,
)

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load data
price_data = load_price_data()

key_events = {
    "Russian Financial Crisis": "1999-08-17",
    "Hurricane Katrina": "2005-08-29",
    "Arab Spring": "2010-12-14",
    "U.S. shale oil boom": "2014-06-30",
    "Post-COVID-19 Recovery + OPEC+ Cuts": "2021-09-22",
}


class PriceTrendResponse(BaseModel):
    event: str
    date: str
    prices: list
    dates: list


class ImpactResponse(BaseModel):
    # Define fields based on the structure of impact data
    event: str
    impact: dict


# Root endpoint
@app.get("/")
async def read_root():
    return {
        "status": "✅ running",
        "health": "💚 healthy",
        "message": "🌍 Welcome to the Oil Price Analysis API! 📊",
        "description": "Explore endpoints for analyzing oil price trends and calculating yearly averages. Visit /docs for documentation. 🚀",
    }


@app.get("/api/priceTrends", response_model=list[PriceTrendResponse])
async def get_price_trends():
    trends_data = []
    for event, date in key_events.items():
        event_date = pd.to_datetime(date)
        prices_around_event = get_prices_around_event(
            event_date, price_data, days_before=180, days_after=180
        )
        trends_data.append(
            {
                "event": event,
                "date": date,
                "prices": prices_around_event["Price"].tolist(),
                "dates": prices_around_event.index.tolist(),
            }
        )
    return trends_data


@app.get("/api/eventImpact", response_model=list[ImpactResponse])
async def get_event_impact():
    results = []
    for event, date in key_events.items():
        impact_data = calculate_event_impact(event, date, price_data)
        results.append(impact_data)
    return results


@app.get("/api/analysisMetrics")
async def get_analysis():
    try:
        analysis_results = calculate_analysis_metrics(price_data.reset_index())
        return analysis_results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/prices")
async def get_price_trend():
    try:
        price_data_dict = calculate_price_trends(price_data)
        return price_data_dict
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/averageYearlyPrice")
async def get_yearly_average():
    try:
        analysis_results = calculate_yearly_average_price(price_data)
        return analysis_results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/priceDistribution")
async def get_distribution():
    try:
        analysis_results = calculate_price_distribution(price_data)
        return analysis_results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")
