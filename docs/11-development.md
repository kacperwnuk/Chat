---
layout: default
title: "Środowisko developerskie"
---

Z uwagi no to, że nie jest łatwa aplikacja kompilacja, też nie jest trywialna.
Mamy tak naprawdę 4 projekty w jednym: frontend, backend(w trzech procesach).
Dodatkowo dochodzi baza danych.

## Baza danych

Pliki baz danych znajdują się w folderze `./src/database`.

Bazy danych stworzono za pomocą [`pgModeler`](https://pgmodeler.io/), który stowrzył skrypt do stworzenia bazy danych `init.sql`.
Jest też skrypt generujący te skrypty `init.sql`, bez konieczności otwierania programu: `pgmodel-regen.sh`


Aby postawić bazy danych lokalnie, należy użyć `docker-compose`:
```bash
docker-compose -f ./src/database/docker-compose.yml --project-name rso-chat up
# Analogicznie wyłączenie
docker-compose -f ./src/database/docker-compose.yml --project-name rso-chat down
```

Stworzone zostaną puste bazy danych.
Należy się do nich połączyć np. poprzez DataGrip i wykonać skrypty `init.sql`, tworzący strukturę bazy danych.

Można do tego użyć równierz przygotowanego skryptu:
```bash
./src/database/init-schemas.sh localhost
```

## Serwisy

Mamy 4 serwery: cdn, sesji, admina, logowania.
W przypadku środowiska Intellij skrypty budujące i uruchamiające są już dodane do projektu.

Jeśli nie, należy wpisać komendy:
```
npm run-script dev-bulid # budowanie projektu

RSO_SERVER=cdn     RSO_PORT=8080 npm run dev-serve
RSO_SERVER=session RSO_PORT=8081 npm run dev-serve
RSO_SERVER=auth    RSO_PORT=8082 npm run dev-serve
RSO_SERVER=adm     RSO_PORT=8083 npm run dev-serve
```

Ważne jest, aby upewnić się, że w pliku .env.development, w zmiennej `RSO_FRONT_ENV` znajdowały się takie wartości portów, jakie zostały ustawione odpowiednim serwerom.
To z tej zmiennej aplikacja klienta będzie wiedzieć, z jakim portem aplikacji serwera się łączyć.
