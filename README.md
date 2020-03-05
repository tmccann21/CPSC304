# CPSC304
Group Project for CPSC 304

## Setup Postgres
### With Docker
Download the official postgres docker image
``` 
docker pull postgres
```

run postgres on port 5432
```
docker volume create --name data-postgresql --driver local
docker run -p 5432:5432 --name postgres_db -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD -v postgres-volume:/var/lib/postgresql/data -d postgres
```

## Install Packages
```
npm i
```

## Build
```
npm build
```

## Start
```
npm start
```