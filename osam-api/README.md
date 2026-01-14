# Osam Tourism Portal API

A production-ready FastAPI backend for a tourism portal featuring places, events, and galleries with JWT authentication.

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Migrations with Alembic](#database-migrations-with-alembic)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Authentication](#authentication)

---

## Quick Start

For experienced developers, here's the minimal setup:

```bash
# Clone and navigate
git clone <repository-url>
cd osam-api

# Create virtual environment and install
python -m venv venv
source venv/Scripts/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Setup database
python create_db.py
alembic upgrade head

# Run server
python -m uvicorn app.main:app --reload
```

Server runs on `http://localhost:8000`

---

## Prerequisites

Before you start, ensure you have:

- **Python 3.8+** - [Download here](https://www.python.org/downloads/)
- **MySQL 5.7+** - [Download here](https://dev.mysql.com/downloads/)
- **Git** - [Download here](https://git-scm.com/)
- MySQL credentials (username, password, host, port)

Verify installations:
```bash
python --version
mysql --version
git --version
```

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd osam-api
```

### 2. Create Virtual Environment

A virtual environment isolates project dependencies from your system.

**On Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**On macOS/Linux:**
```bash
python -m venv venv
source venv/bin/activate
```

You should see `(venv)` in your terminal prompt when activated.

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

This installs:
- **FastAPI** - Web framework
- **SQLAlchemy** - ORM for database
- **Alembic** - Migration tool
- **JWT & Auth** - Authentication libraries
- **PyMySQL** - MySQL driver
- **Testing tools** - pytest, pytest-asyncio, pytest-cov

### 4. Configure Database Connection

Edit the database credentials in two files:

**File 1:** `app/models/database.py`
```python
# Line 11 - Update with your MySQL credentials
DATABASE_URL = "mysql+pymysql://username:password@localhost:3306/osam_tourism"
```

**File 2:** `alembic.ini`
```ini
# Line 60 - Update with your MySQL credentials
sqlalchemy.url = mysql+pymysql://username:password@localhost:3306/osam_tourism
```

**Also update:** `create_db.py` (Line 4)
```python
engine = create_engine("mysql+pymysql://username:password@localhost:3306")
```

---

## Database Setup

### Step 1: Create the Database

Run the database creation script (creates the `osam_tourism` database if it doesn't exist):

```bash
python create_db.py
```

Expected output:
```
Database created successfully!
```

### Step 2: Run Migrations

Alembic manages database schema. Apply all migrations to create tables:

```bash
alembic upgrade head
```

This creates all tables defined in your models.

### Step 3: Verify Database

Connect to MySQL to verify:
```bash
mysql -u username -p osam_tourism
```

Then list tables:
```sql
SHOW TABLES;
```

You should see tables like: `users`, `places`, `events`, `galleries`, etc.

---

## Running the Application

### Development Mode (with auto-reload)

```bash
python -m uvicorn app.main:app --reload
```

- **URL:** http://localhost:8000
- **Auto-reload:** Code changes restart the server automatically
- **Host:** 127.0.0.1 (local only)
- **Note:** Use `python -m uvicorn` instead of bare `uvicorn` to ensure venv packages are used

### Production Mode

```bash
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

- **Workers:** 4 parallel processes
- **Host:** 0.0.0.0 (accessible from any network)
- **No reload:** Manual restart required for changes

---

## API Documentation

Once the server is running, access interactive API docs:

- **Swagger UI (Recommended):** http://localhost:8000/docs
- **ReDoc (Alternative):** http://localhost:8000/redoc
- **OpenAPI Schema:** http://localhost:8000/openapi.json

### API Endpoints Structure

```
GET  /                              # Health check
POST /api/v1/auth/register          # Register new admin
POST /api/v1/auth/login             # Login (returns JWT)
POST /api/v1/auth/admin/places      # Create place (admin only)
POST /api/v1/auth/admin/events      # Create event (admin only)
POST /api/v1/auth/admin/galleries   # Create gallery (admin only)
GET  /api/v1/places                 # Get all places
GET  /api/v1/events                 # Get all events
GET  /api/v1/galleries              # Get all galleries
```

### Authentication Headers

Protected endpoints require a JWT token in the header:

```bash
curl -H "Authorization: Bearer your_jwt_token" \
     http://localhost:8000/api/v1/auth/admin/places
```

See [AUTHENTICATION_GUIDE.md](AUTHENTICATION_GUIDE.md) for detailed JWT flow.

---

## Database Migrations with Alembic

Alembic manages database schema changes. Use it when you modify models.

### Common Alembic Commands

**Check current schema version:**
```bash
alembic current
```

**View migration history:**
```bash
alembic history
```

**Apply all pending migrations:**
```bash
alembic upgrade head
```

**Rollback one migration:**
```bash
alembic downgrade -1
```

**Rollback to specific migration:**
```bash
alembic downgrade <revision-hash>
```

### Creating New Migrations

When you modify a model in `app/models/`:

**Option 1: Auto-generate migration (recommended)**
```bash
alembic revision --autogenerate -m "Add new field to users table"
```

**Option 2: Manual migration**
```bash
alembic revision -m "Custom migration description"
```

Then edit the generated file in `migrations/versions/`.

**Apply the migration:**
```bash
alembic upgrade head
```

### Example: Adding a New Table

1. Create model in `app/models/new_model.py`
2. Import in `app/models/__init__.py`
3. Generate migration:
   ```bash
   alembic revision --autogenerate -m "Add new_model table"
   ```
4. Apply migration:
   ```bash
   alembic upgrade head
   ```

---

## Testing

The project includes pytest with async support.

### Run All Tests

```bash
pytest
```

### Run Specific Test File

```bash
pytest test_api.py
```

### Run with Coverage Report

```bash
pytest --cov=app --cov-report=html
```

Coverage report opens in `htmlcov/index.html`

### Test Files Available

- `test_api.py` - API endpoint tests
- `test_api_detailed.py` - Detailed endpoint scenarios
- `test_db.py` - Database connection tests
- `test_models.py` - Model validation tests
- `test_direct.py` - Direct service tests

---

## Project Structure

```
osam-api/
├── app/
│   ├── main.py                    # FastAPI app setup & routers
│   ├── api/v1/
│   │   └── endpoints/
│   │       ├── auth.py            # Login, register endpoints
│   │       ├── places.py          # Places CRUD (admin only)
│   │       ├── events.py          # Events CRUD (admin only)
│   │       └── galleries.py       # Galleries CRUD (admin only)
│   ├── core/
│   │   └── dependencies.py        # Auth dependencies (JWT validation)
│   ├── models/
│   │   ├── database.py            # Database connection & session
│   │   ├── user.py                # User model
│   │   ├── place.py               # Place model
│   │   ├── event.py               # Event model
│   │   ├── gallery.py             # Gallery model
│   │   └── ...                    # Other domain models
│   ├── schemas/
│   │   ├── auth.py                # Auth request/response schemas
│   │   ├── place.py               # Place validation schemas
│   │   └── ...                    # Other schemas (Pydantic)
│   └── services/
│       ├── auth_service.py        # JWT & password logic
│       ├── user_service.py        # User operations
│       ├── place_service.py       # Place operations
│       └── ...                    # Other business logic
├── migrations/
│   ├── env.py                     # Alembic configuration
│   ├── alembic.ini                # Alembic settings
│   └── versions/                  # Migration files
├── requirements.txt               # Python dependencies
├── create_db.py                   # Initialize database
├── AUTHENTICATION_GUIDE.md        # JWT authentication details
├── CONTROLLERS_GUIDE.md           # API endpoints documentation
├── MODELS_GUIDE.md                # Database models documentation
└── SERVICES_GUIDE.md              # Business logic documentation
```

---

## Authentication

This API uses **JWT (JSON Web Tokens)** for authentication.

### Authentication Flow

1. **Register** - Create admin account
   ```bash
   curl -X POST http://localhost:8000/api/v1/auth/register \
     -H "Content-Type: application/json" \
     -d '{"username":"admin","password":"password123"}'
   ```

2. **Login** - Get JWT token
   ```bash
   curl -X POST http://localhost:8000/api/v1/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username":"admin","password":"password123"}'
   ```
   Response:
   ```json
   {
     "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     "token_type": "bearer"
   }
   ```

3. **Use Token** - Include in protected endpoints
   ```bash
   curl -H "Authorization: Bearer <your_access_token>" \
        http://localhost:8000/api/v1/places
   ```

### Token Details

- **Format:** JWT (Header.Payload.Signature)
- **Expiration:** 60 minutes (configurable in `auth_service.py`)
- **Storage:** Pass in `Authorization: Bearer <token>` header
- **Refresh:** Login again to get new token

For detailed authentication architecture, see [AUTHENTICATION_GUIDE.md](AUTHENTICATION_GUIDE.md).

---

## Troubleshooting

### Database Connection Error

**Error:** `Can't connect to MySQL server`

**Solutions:**
1. Verify MySQL is running: `mysql -u root -p`
2. Check credentials in `database.py` and `alembic.ini`
3. Ensure database exists: `python create_db.py`
4. Check MySQL is on port 3306

### Uvicorn Port Already in Use

**Error:** `Address already in use`

**Solution:** Kill existing process or use different port:
```bash
uvicorn app.main:app --port 8001 --reload
```

### Alembic Migration Conflicts

**Error:** `Can't locate revision`

**Solution:** Check history and current state:
```bash
alembic history
alembic current
```

### Import Errors

**Error:** `ModuleNotFoundError: No module named 'app'`

**Solution:** Run from project root and ensure venv is activated:
```bash
cd osam-api
source venv/Scripts/activate  # Windows: venv\Scripts\activate
```

---

## Development Workflow

1. **Activate venv** - Always start with this
   ```bash
   source venv/Scripts/activate
   ```

2. **Make code changes** - Edit files in `app/`

3. **Restart server** - Auto-reload handles this in development mode

4. **Test changes** - Use `/docs` endpoint or run tests
   ```bash
   pytest
   ```

5. **Database changes** - If modifying models:
   ```bash
   alembic revision --autogenerate -m "description"
   alembic upgrade head
   ```

6. **Before committing** - Run tests and formatters
   ```bash
   black app/
   flake8 app/
   pytest
   ```

---

## Production Deployment

Before deploying to production:

1. **Security:**
   - Set `CORS allow_origins` to specific domains (not "*")
   - Use environment variables for database credentials
   - Enable HTTPS/SSL

2. **Database:**
   - Create MySQL backups
   - Use connection pooling (already configured)

3. **Server:**
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
   ```

4. **Monitoring:**
   - Enable query logging: Set `echo=True` in `database.py`
   - Monitor application logs

---

## Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [SQLAlchemy ORM](https://docs.sqlalchemy.org/)
- [Alembic Migration Guide](https://alembic.sqlalchemy.org/)
- [JWT Authentication](https://tools.ietf.org/html/rfc7519)
- [Pydantic Validation](https://docs.pydantic.dev/)

---

## Support & Questions

- Check relevant guide files: `AUTHENTICATION_GUIDE.md`, `MODELS_GUIDE.md`, `CONTROLLERS_GUIDE.md`, `SERVICES_GUIDE.md`
- Review existing tests in `test_*.py` files
- Check [FastAPI docs at /docs endpoint](#api-documentation)

---

**Last Updated:** January 14, 2026
