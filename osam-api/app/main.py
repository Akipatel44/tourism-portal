"""
Main FastAPI application with all routers and middleware.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging
from app.api.v1 import router as v1_router

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Manage app startup and shutdown."""
    logger.info("Application started")
    yield
    logger.info("Application shutdown")


# Create FastAPI app
app = FastAPI(
    title="Osam Tourism Portal API",
    description="Production API for tourism portal featuring places, events, and galleries",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include API v1 routers
app.include_router(v1_router)


# Root endpoint
@app.get("/", tags=["root"])
def root():
    """API information."""
    return {
        "name": "Osam Tourism Portal API",
        "version": "1.0.0",
        "description": "API for tourism portal featuring places, events, and galleries",
        "docs": "/docs",
        "health": "/health",
        "endpoints": {
            "places": "/api/v1/places",
            "events": "/api/v1/events",
            "galleries": "/api/v1/galleries"
        }
    }


# Health check endpoint
@app.get("/health", tags=["health"])
def health_check():
    """Check if API is running."""
    return {
        "status": "healthy",
        "version": "1.0.0",
        "message": "Osam Tourism Portal API is running"
    }


# Startup event
@app.on_event("startup")
async def startup_event():
    """Run on application startup."""
    logger.info("Starting up...")
    logger.info("✓ CORS middleware configured")
    logger.info("✓ API v1 routers loaded")
    logger.info("✓ Endpoints ready: /api/v1/places, /api/v1/events, /api/v1/galleries")


# Shutdown event
@app.on_event("shutdown")
async def shutdown_event():
    """Run on application shutdown."""
    logger.info("Shutting down...")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="127.0.0.1",
        port=8000,
        reload=True,
        reload_dirs=["app"],
        log_level="info"
    )
