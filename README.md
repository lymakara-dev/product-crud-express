### Database Setup

1. Open SQL Server Management Studio or Azure Data Studio.
2. Create a new database (e.g., `product_crud_db`).
3. Run the SQL script located at `backend/database.sql` to create the `PRODUCTS` table and insert sample data.

### Database Server

Run command
`docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Root@123"    -p 1433:1433 --name sqlserver    -d mcr.microsoft.com/mssql/server:2022-latest` to host sql server on docker container
