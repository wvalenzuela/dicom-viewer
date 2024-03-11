# dicom-viewer

2D/3D DICOM viewer with backend and frontend

## Prepare database

In the "database" directory, ensure that Docker is operational on your computer before proceeding.

```sh
docker-compose up -d
```

## Run Backend

- First go to backend folder
- Then install sequelize-cli to prepare the DB

```sh
npm install -g sequelize-cli
```

- To populate the database run:

```sh
 npx sequelize-cli db:migrate
```

- Finally run:

```sh
 npm install
 npm start
```

## Run Frontend

Go to frontend folder and run

```sh
 npm install
 npm start
```
