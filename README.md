# Backend Setup Guide

## Copy environment example

```sh
cp .env.example .env
```

## Running SQL Server in a Docker Container

**Start SQL Server:**

```sh
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Root@123" \
  -p 1433:1433 --name sqlserver \
  -d mcr.microsoft.com/mssql/server:2022-latest
```

---

## Accessing the Database Server

1. Access the database container:
   ```sh
   docker exec -it sqlserver bash
   ```
2. Navigate to the SQL tools directory:
   ```sh
   cd /opt/mssql-tools18/bin
   ```
3. Connect to the database:

   ```sh
   ./sqlcmd -S localhost -U SA -P "Root@123" -N -C
   ```

4. View database

   ```sh
   select name from sys.databases;
   go
   ```

5. Create data name `product_crud_app`
   ```sh
   create database product_crud_app;
   go
   ```

---

## Creating Tables in the Database

1. Copy the SQL file from your local machine to the container:
   ```sh
   docker cp ./database.sql sqlserver:/tmp/database.sql
   ```
2. Access the Docker container:
   ```sh
   docker exec -it sqlserver bash
   ```
3. Navigate to the SQL tools directory:
   ```sh
   cd /opt/mssql-tools18/bin/
   ```
4. Run the SQL script to create tables:
   ```sh
   ./sqlcmd -S localhost -U SA -P "Root@123" -N -C -d product_crud_app -i /tmp/database.sql
   ```
