'use strict';

const init = {
  idSeries: 1,
  InstanceDescription: 'Empty',
  SOPInstanceUID: '1.2.276.0.7230010.3.1.4.0.22100.1710148398.503278',
  SOPClassUID: '1.2.840.10008.5.1.4.1.1.4',
};
const data = [
  {
    SliceLocation: 0,
    InstanceNumber: 1,
    OriginalName: 'IMG-7-1-1.dcm',
    FilePath:
      '/TEST_0001/2019_03_09_20_51/S7_FLAIR_TSE_TRA_4MM/MR-IMG-7-1-1.dcm',
  },
  {
    SliceLocation: 43.2000029,
    InstanceNumber: 10,
    OriginalName: 'IMG-7-1-10.dcm',
    FilePath:
      '/TEST_0001/2019_03_09_20_51/S7_FLAIR_TSE_TRA_4MM/MR-IMG-7-1-10.dcm',
  },
  {
    SliceLocation: 48.0000033,
    InstanceNumber: 11,
    OriginalName: 'IMG-7-1-11.dcm',
    FilePath:
      '/TEST_0001/2019_03_09_20_51/S7_FLAIR_TSE_TRA_4MM/MR-IMG-7-1-11.dcm',
  },
  {
    SliceLocation: 52.8000036,
    InstanceNumber: 12,
    OriginalName: 'IMG-7-1-12.dcm',
    FilePath:
      '/TEST_0001/2019_03_09_20_51/S7_FLAIR_TSE_TRA_4MM/MR-IMG-7-1-12.dcm',
  },
  {
    SliceLocation: 57.6000039,
    InstanceNumber: 13,
    OriginalName: 'IMG-7-1-13.dcm',
    FilePath:
      '/TEST_0001/2019_03_09_20_51/S7_FLAIR_TSE_TRA_4MM/MR-IMG-7-1-13.dcm',
  },
  {
    SliceLocation: 62.4000043,
    InstanceNumber: 14,
    OriginalName: 'IMG-7-1-14.dcm',
    FilePath:
      '/TEST_0001/2019_03_09_20_51/S7_FLAIR_TSE_TRA_4MM/MR-IMG-7-1-14.dcm',
  },
  {
    SliceLocation: 67.2000046,
    InstanceNumber: 15,
    OriginalName: 'IMG-7-1-15.dcm',
    FilePath:
      '/TEST_0001/2019_03_09_20_51/S7_FLAIR_TSE_TRA_4MM/MR-IMG-7-1-15.dcm',
  },
  {
    SliceLocation: 72.0000049,
    InstanceNumber: 16,
    OriginalName: 'IMG-7-1-16.dcm',
    FilePath:
      '/TEST_0001/2019_03_09_20_51/S7_FLAIR_TSE_TRA_4MM/MR-IMG-7-1-16.dcm',
  },
  {
    SliceLocation: 76.8000052,
    InstanceNumber: 17,
    OriginalName: 'IMG-7-1-17.dcm',
    FilePath:
      '/TEST_0001/2019_03_09_20_51/S7_FLAIR_TSE_TRA_4MM/MR-IMG-7-1-17.dcm',
  },
  {
    SliceLocation: 81.6000056,
    InstanceNumber: 18,
    OriginalName: 'IMG-7-1-18.dcm',
    FilePath:
      '/TEST_0001/2019_03_09_20_51/S7_FLAIR_TSE_TRA_4MM/MR-IMG-7-1-18.dcm',
  },
  {
    SliceLocation: 86.4000059,
    InstanceNumber: 19,
    OriginalName: 'IMG-7-1-19.dcm',
    FilePath:
      '/TEST_0001/2019_03_09_20_51/S7_FLAIR_TSE_TRA_4MM/MR-IMG-7-1-19.dcm',
  },
  {
    SliceLocation: 4.8000003,
    InstanceNumber: 2,
    OriginalName: 'IMG-7-1-2.dcm',
    FilePath:
      '/TEST_0001/2019_03_09_20_51/S7_FLAIR_TSE_TRA_4MM/MR-IMG-7-1-2.dcm',
  },
  {
    SliceLocation: 91.2000062,
    InstanceNumber: 20,
    OriginalName: 'IMG-7-1-20.dcm',
    FilePath:
      '/TEST_0001/2019_03_09_20_51/S7_FLAIR_TSE_TRA_4MM/MR-IMG-7-1-20.dcm',
  },
  {
    SliceLocation: 96.0000065,
    InstanceNumber: 21,
    OriginalName: 'IMG-7-1-21.dcm',
    FilePath:
      '/TEST_0001/2019_03_09_20_51/S7_FLAIR_TSE_TRA_4MM/MR-IMG-7-1-21.dcm',
  },
  {
    SliceLocation: 100.8000069,
    InstanceNumber: 22,
    OriginalName: 'IMG-7-1-22.dcm',
    FilePath:
      '/TEST_0001/2019_03_09_20_51/S7_FLAIR_TSE_TRA_4MM/MR-IMG-7-1-22.dcm',
  },
  {
    SliceLocation: 105.6000072,
    InstanceNumber: 23,
    OriginalName: 'IMG-7-1-23.dcm',
    FilePath:
      '/TEST_0001/2019_03_09_20_51/S7_FLAIR_TSE_TRA_4MM/MR-IMG-7-1-23.dcm',
  },
  {
    SliceLocation: 110.4000075,
    InstanceNumber: 24,
    OriginalName: 'IMG-7-1-24.dcm',
    FilePath:
      '/TEST_0001/2019_03_09_20_51/S7_FLAIR_TSE_TRA_4MM/MR-IMG-7-1-24.dcm',
  },
  {
    SliceLocation: 115.2000078,
    InstanceNumber: 25,
    OriginalName: 'IMG-7-1-25.dcm',
    FilePath:
      '/TEST_0001/2019_03_09_20_51/S7_FLAIR_TSE_TRA_4MM/MR-IMG-7-1-25.dcm',
  },
  {
    SliceLocation: 120.0000082,
    InstanceNumber: 26,
    OriginalName: 'IMG-7-1-26.dcm',
    FilePath:
      '/TEST_0001/2019_03_09_20_51/S7_FLAIR_TSE_TRA_4MM/MR-IMG-7-1-26.dcm',
  },
  {
    SliceLocation: 124.8000085,
    InstanceNumber: 27,
    OriginalName: 'IMG-7-1-27.dcm',
    FilePath:
      '/TEST_0001/2019_03_09_20_51/S7_FLAIR_TSE_TRA_4MM/MR-IMG-7-1-27.dcm',
  },
  {
    SliceLocation: 129.6000088,
    InstanceNumber: 28,
    OriginalName: 'IMG-7-1-28.dcm',
    FilePath:
      '/TEST_0001/2019_03_09_20_51/S7_FLAIR_TSE_TRA_4MM/MR-IMG-7-1-28.dcm',
  },
  {
    SliceLocation: 134.4000092,
    InstanceNumber: 29,
    OriginalName: 'IMG-7-1-29.dcm',
    FilePath:
      '/TEST_0001/2019_03_09_20_51/S7_FLAIR_TSE_TRA_4MM/MR-IMG-7-1-29.dcm',
  },
  {
    SliceLocation: 9.6000007,
    InstanceNumber: 3,
    OriginalName: 'IMG-7-1-3.dcm',
    FilePath:
      '/TEST_0001/2019_03_09_20_51/S7_FLAIR_TSE_TRA_4MM/MR-IMG-7-1-3.dcm',
  },
  {
    SliceLocation: 14.400001,
    InstanceNumber: 4,
    OriginalName: 'IMG-7-1-4.dcm',
    FilePath:
      '/TEST_0001/2019_03_09_20_51/S7_FLAIR_TSE_TRA_4MM/MR-IMG-7-1-4.dcm',
  },
  {
    SliceLocation: 19.2000013,
    InstanceNumber: 5,
    OriginalName: 'IMG-7-1-5.dcm',
    FilePath:
      '/TEST_0001/2019_03_09_20_51/S7_FLAIR_TSE_TRA_4MM/MR-IMG-7-1-5.dcm',
  },
  {
    SliceLocation: 24.0000016,
    InstanceNumber: 6,
    OriginalName: 'IMG-7-1-6.dcm',
    FilePath:
      '/TEST_0001/2019_03_09_20_51/S7_FLAIR_TSE_TRA_4MM/MR-IMG-7-1-6.dcm',
  },
  {
    SliceLocation: 28.800002,
    InstanceNumber: 7,
    OriginalName: 'IMG-7-1-7.dcm',
    FilePath:
      '/TEST_0001/2019_03_09_20_51/S7_FLAIR_TSE_TRA_4MM/MR-IMG-7-1-7.dcm',
  },
  {
    SliceLocation: 33.6000023,
    InstanceNumber: 8,
    OriginalName: 'IMG-7-1-8.dcm',
    FilePath:
      '/TEST_0001/2019_03_09_20_51/S7_FLAIR_TSE_TRA_4MM/MR-IMG-7-1-8.dcm',
  },
  {
    SliceLocation: 38.4000026,
    InstanceNumber: 9,
    OriginalName: 'IMG-7-1-9.dcm',
    FilePath:
      '/TEST_0001/2019_03_09_20_51/S7_FLAIR_TSE_TRA_4MM/MR-IMG-7-1-9.dcm',
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const randomDicomFiles = [];
    for (let i = 0; i < data.length; i++) {
      randomDicomFiles.push({
        ...init,
        ...data[i],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('dicom_files', randomDicomFiles, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('dicom_files', null, {});
  },
};
