# dicom-viewer

2D/3D DICOM viewer with backend and frontend

## Prepare database

in database folder run, you to have docker running in your pc:

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
