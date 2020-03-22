# Dokumentacja
# https://hub.docker.com/_/postgres

# Dobry tutorial
# https://medium.com/@wkrzywiec/database-in-a-docker-container-how-to-start-and-whats-it-about-5e3ceea77e50

FROM postgres:12.2

ENV POSTGRES_DB rso-main
ENV POSTGRES_PASSWORD tajne_haslo

COPY .env /docker-entrypoint-initdb.d
COPY init.sh /docker-entrypoint-initdb.d/00.sh
COPY init.sql /docker-entrypoint-initdb.d/01.sql
COPY data.sql /docker-entrypoint-initdb.d/02.sql

EXPOSE 5432