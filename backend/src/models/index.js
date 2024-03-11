import { Sequelize, DataTypes } from 'sequelize';
import path from 'path';
import seriesModel from './series/series';
import dicomFileModel from './dicom_file/dicom_file';
import { db } from 'config';
var MySql = require('sync-mysql');
const InitDatabase = () => {
  // create db if it doesn't already exist
  console.log({ db });
  const { HOST } = db;
  console.log({ HOST });
  try {
    const connection = new MySql({
      host: db.HOST,
      user: db.USERNAME,
      port: db.PORT,
      password: db.PASSWORD,
    });
    const reply = connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${db.DATABASE}\`;`
    );
    console.log({ reply });
  } catch (error) {
    console.log('catch - Error - createConnection: ', { error });
  }
  let sequelize = null;
  try {
    sequelize = new Sequelize(db.DATABASE, db.USERNAME, db.PASSWORD, {
      host: db.HOST,
      port: db.PORT,
      dialect: 'mysql',
      operatorsAliases: Sequelize.Op,
      logging: null, //console.log,
    });
  } catch (error) {
    console.log('catch - Sequelize: ', { error });
  }
  return sequelize;
};
const sequelize = InitDatabase();

const models = {
  Series: seriesModel(sequelize, DataTypes),
  DicomFile: dicomFileModel(sequelize, DataTypes),
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
