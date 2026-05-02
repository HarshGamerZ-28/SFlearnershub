Postgres setup options for SFlearnershub

Option A — Docker (recommended)

Run locally:

```bash
docker run -e POSTGRES_USER=sfhub -e POSTGRES_PASSWORD=sfhub -e POSTGRES_DB=sflearnershub -p 5432:5432 --name sflearnershub-postgres -d postgres:15
```

After Postgres is running, create DB objects (if needed):

```bash
# connect with psql
psql "postgresql://sfhub:sfhub@localhost:5432/sflearnershub"
```

Option B — Windows installer (no Docker)

1. Install PostgreSQL from https://www.postgresql.org/download/windows/ or use Chocolatey/winget.
2. Open `psql` (or use pgAdmin) and run:

```sql
CREATE ROLE sfhub WITH LOGIN PASSWORD 'sfhub';
CREATE DATABASE sflearnershub OWNER sfhub;
```

Option C — Temporary SQLite for quick dev

If you cannot run Postgres, I can modify the backend to use a local SQLite DB for development. Ask me to enable that and I’ll implement the fallback.
