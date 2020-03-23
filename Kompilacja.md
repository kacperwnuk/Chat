Kompilacja
==========

Z uwagi no to, że nie jest łatwa aplikacja kompilacja, też nie jest trywialna.
Mamy tak naprawdę 4 projekty w jednym: frontend, backend(w trzech procesach).
Dodatkowo dochodzi baza danych.

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

Aby skompilować kod backend'u należy wpisać komendę: `npm run-script build-backend`
.
Ale ponieważ jest to jednorazowa kompilacja, można też uruchomić: `dev-build-backend`, która będzie patrzyła na nasze pliki i rekompilowała, gdy wprowadzimy zmianę.

Uruchamianie można przeprowadzić na pomocą komend: 
```
npm run-script server-auth
npm run-script server-cdn
npm run-script server-main
```

Ale z uwagi na to, że musieliśmy by uruchamiać to za każdym razem po kompilacji, możemy też:
```
npm run-script dev-server-auth
npm run-script dev-server-cdn
npm run-script dev-server-main
```

Co będzie resetowało serwer po kompilacji.

## Frontend 

```
npm run-script bulid-frontend
npm run-script dev-bulid-frontend
```