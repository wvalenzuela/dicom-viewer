'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const randomSeries = Array.from({ length: 1 }, () => ({
      SeriesInstanceUID: '1.2.276.0.7230010.3.1.4.0.22100.1710148398.503278',
      SeriesNumber: 7,
      SeriesDate: '2019-03-09',
      SeriesTime: '20:56:22',
      SeriesDescription: 'flair_tse_tra_4mm',
      ContrastBolusAgent: '',
      NumberOfSeriesRelatedInstances: 29,
      Modality: 'MR',
      ImageType: 'ORIGINAL\\PRIMARY\\M\\ND\\NORM',
      NumberOfFrames: 1,
      BodyPartExamined: '',
      PatientPosition: 'HFS',
      ImagePositionPatient:
        '96.80261665582657\\-86.05380919575691\\-69.35698699951172',
      ImageOrientationPatient:
        '-0.022466410290111195\\-0.9972629893909801\\-0.0704407041723078\\0.9900072964754971\\-0.012380888245322488\\-0.1404714584350586',
      Rows: 448,
      Columns: 552,
      SliceThickness: 4.8,
      SpacingBetweenSlices: 4.8,
      PixelSpacingX: 0.43,
      PixelSpacingY: 0.43,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('dicom_series', randomSeries, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('dicom_series', null, {});
  },
};
