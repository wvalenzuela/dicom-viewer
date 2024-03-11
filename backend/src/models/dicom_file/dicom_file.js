export default (sequelize, DataTypes) => {
  const DicomFile = sequelize.define('dicom_file', {
    idFile: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    idSeries: DataTypes.BIGINT,
    SliceLocation: DataTypes.DECIMAL(17, 7),
    InstanceDescription: DataTypes.STRING,
    InstanceNumber: DataTypes.INTEGER,
    SOPInstanceUID: DataTypes.STRING,
    SOPClassUID: DataTypes.STRING,
    OriginalName: DataTypes.STRING,
    FilePath: DataTypes.STRING,
  });
  DicomFile.associate = (models) => {
    //N:M
    DicomFile.belongsTo(models.Series, {
      as: 'series',
      foreignKey: 'idSeries',
    });
  };
  return DicomFile;
};
