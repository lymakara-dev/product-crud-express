### Database Setup

1. Open SQL Server Management Studio or Azure Data Studio.
2. Create a new database (e.g., `product_crud_db`).
3. Run the SQL script located at `backend/database.sql` to create the `PRODUCTS` table and insert sample data.

### Database Server

Run command
`docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=YourDatabasePassword"    -p 1433:1433 --name sqlserver    -d mcr.microsoft.com/mssql/server:2022-latest` to host sql server on docker container

### Access database server

1. Use command `docker exec -it sqlserver bash` to access database container
2. Go to directory `/opt/mssql-tools18/bin$`
3. Use command `./sqlcmd -S localhost -U SA -P "Root@123" -N -C` to connect the hosting database

### How to create tables in database

1. Copy file sql from local to container: `docker cp ./database.sql sqlserver:/tmp/database.sql`
2. Access docer container: `docker exec -it sqlserver bash`
3. Go to directory `cd /opt/mssql-tools18/bin/`
4. Run command: `./sqlcmd -S localhost -U SA -P "Root@123" -N -C -d product_crud_app -i /tmp/database.sql`
