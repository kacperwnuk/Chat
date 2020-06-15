---
layout: default
title: "Środowisko developerskie"
---
<b>Bazy danych</b>
 
Bazy danych stworzono za pomocą pgModeler, który stowrzył skrypt do stworzenia bazy danych init.sql. Jest też skrypt generujący te skrypty init.sql: pgmodel-regen.sh

Uruchomienie bazy danych - należy uruchomić docker compose, uruchamiajhąc skrypt <br> `database/docker.compose.yml`.<br>
 Stworzone zostaną puste bazy danych. Należy się do nich połączyć np. poprzez DataGrip i wykonać skrypty init-schemas.sql, tworzący strukturę bazy danych, oraz init.sql dla każdej z dwóch baz danych

<b>Serwery</b>

Mamy 4 serwery: cdn, sesji, admina, logowania. W przypadku środowiska Intellij skrypty budujące i uruchamiające są już dodane do projektu. Jeśli nie, należy wpisać komendy

`npm run dev-build  (budowanie projektu)`

a następnie 

`RSO_SERVER=adm RSO_PORT=8083 npm run dev-server` 

komenda ta uruchamia serwer admina. Jest to skonfigurowane tak, aby wystarczyło wpisać odpowiednia wartość do zmiennej środowiskowej `RSO_SERVER`
Ważne jest, aby upewnić się, że w pliku .env.development, w zmiennej `RSO_FRONT_ENV` znajdowały się takie wartości portów, jakie zostały ustawione odpowiednim serverom. To z tej zmiennej aplikacja klienta będzie wiedzieć, z jakim portem aplikacji serwera się łączyć.