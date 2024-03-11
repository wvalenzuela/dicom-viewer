export default (sequelize, DataTypes) => {
  const Series = sequelize.define('dicom_series', {
    idSeries: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    SeriesInstanceUID: DataTypes.STRING,
    SeriesNumber: DataTypes.STRING,
    SeriesDate: DataTypes.DATEONLY,
    SeriesTime: DataTypes.TIME,
    SeriesDescription: DataTypes.STRING,
    ContrastBolusAgent: DataTypes.STRING,

    NumberOfSeriesRelatedInstances: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },

    Modality: DataTypes.STRING,

    ImageType: DataTypes.STRING,
    NumberOfFrames: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    BodyPartExamined: DataTypes.STRING,

    PatientPosition: DataTypes.STRING,
    ImagePositionPatient: DataTypes.STRING,
    ImageOrientationPatient: DataTypes.STRING,

    Rows: DataTypes.INTEGER,
    Columns: DataTypes.INTEGER,

    SliceThickness: DataTypes.DECIMAL(17, 7),
    SpacingBetweenSlices: DataTypes.DECIMAL(17, 7),

    PixelSpacingX: DataTypes.DECIMAL(17, 7),
    PixelSpacingY: DataTypes.DECIMAL(17, 7),
  });
  Series.associate = (models) => {
    //N:M
  };
  return Series;
};
