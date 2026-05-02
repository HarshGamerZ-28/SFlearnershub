# PowerShell helper: create `sfhub` role and `sflearnershub` DB
# Run as a user that can access `psql` (Postgres bin on PATH)

param()

$psql = "psql"
$createRole = "CREATE ROLE sfhub WITH LOGIN PASSWORD 'sfhub';"
$createDB = "CREATE DATABASE sflearnershub OWNER sfhub;"

Write-Host "Creating role and database..."
& $psql -c "$createRole"
& $psql -c "$createDB"
Write-Host "Done."
