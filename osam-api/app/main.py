from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI application
app = FastAPI(
    title="Tourism Portal API",
    description="API for Osam Hill & Chichod Village tourism portal",
    version="1.0.0"
)

# Configure CORS (Cross-Origin Resource Sharing)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (change in production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoint
@app.get("/")
async def root():
    return {
        "message": "Welcome to Tourism Portal API",
        "status": "online",
        "version": "1.0.0"
    }

# Health check endpoint
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "Tourism Portal Backend"
    }

# Simple test endpoint
@app.get("/api/v1/test")
async def test_endpoint():
    return {
        "message": "API is working correctly",
        "data": {
            "location": "Osam Hill, Chichod Village",
            "region": "Gujarat, India"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
