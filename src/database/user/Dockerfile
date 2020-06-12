# Dokumentacja
# https://hub.docker.com/_/postgres

# Dobry tutorial
# https://medium.com/@wkrzywiec/database-in-a-docker-container-how-to-start-and-whats-it-about-5e3ceea77e50

FROM postgres:12.2

Back_env POSTGRES_DB rso-user
Back_env POSTGRES_PASSWORD tajne_haslo

COPY .env /docker-entrypoint-initdb.d
COPY init.sh /docker-entrypoint-initdb.d/_00.sh
COPY init.sql /docker-entrypoint-initdb.d/_01.sql
COPY data.sql /docker-entrypoint-initdb.d/_02.sql

EXPOSE 5432