Kompilacja
==========

## Baza danych

Pliki baz danych znajdują się w folderze `./src/database`.

Każda baza danych jest folderem z następującą strukturą:

 - `dbname` - nazwa bazy danych
   - `.env` - plik typu dotenv zawierający następujące zmienne:
      - `IMAGE_NAME` - nazwa obrazu dockera
      - `CONTAINER_NAME` - nazwa konteneru dockera
      - `ADMIN_PASSWORD` - hałso administratora, użytkownik to `postgres`
      - `BACKEND_DATABASE` - nazwa bazy danych
      - `BACKEND_USERNAME` - nazwa użytkownika bazy danych
      - `BACKEND_PASSWORD` - hasło użytkownika bazy danych
      - `DB_PORT` - port bazy danych
   - `Dockerfile`
   - `init.sh`
   - `init.sql`
   - `model.dbm` - plik bazy programu PgModeler
   - `model.png` - model bazy danych w formie obrazka

Zarządzanie bazą danych:

 - `create.sh` - tworzenie dockera
 - `start.sh` -  uruchamianie dockera
 - `stop.sh` - zatrzymanie dockera
 - `remove.sh` - usuwanie dockera
 
Każdy skrypt bierze jeden argument nazwy bazy danych.
 
Przykłady użycia:

```bash
./src/database/create.sh main
./src/database/start.sh main
./src/database/stop.sh main
./src/database/remove.sh main
```

## Backend

Z uwagi no to, że nie jest łatwa aplikacja kompilacja, też nie jest trywialna.
Mamy tak naprawdę 4 projekty w jednym: frontend, backend(w trzech procesach).

Aby uruchomić dev

## Frontend 
