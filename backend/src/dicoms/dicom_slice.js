import path from 'path';
import { IsInvalid } from 'utils';

export const DicomSlice = async (req, res, models) => {
  console.log('DicomSlice');
  try {
    let idSeries = req.headers['idseries'];
    let position = req.headers['position'];
    if (idSeries === undefined || position === undefined) {
      throw Error('Invalid Input or Not Authenticated');
    }
    console.log({ idSeries, position });
    if (IsInvalid(idSeries)) {
      throw Error('Invalid Series or your are not authenticated');
    }
    idSeries = parseInt(idSeries, 10);
    position = parseInt(position, 10);
    console.log({ idSeries, position });
    const Series = await models.Series.findByPk(idSeries, { raw: true });
    if (!Series || Series === undefined) {
      throw Error('Invalid Series or your are not authenticated');
    }
    const file_dicoms = await models.DicomFile.findAll({
      where: {
        idSeries,
      },
      raw: true,
    });
    if (IsInvalid(file_dicoms) || !file_dicoms.length) {
      throw Error('Invalid DICOM file or your are not authenticated');
    }
    const positions = file_dicoms.map((x) => x.InstanceNumber);
    if (position < 0 || position >= positions.length) {
      throw Error('Invalid DICOM position or your are not authenticated');
    }
    positions.sort(function (a, b) {
      return b - a;
    });
    let index = file_dicoms
      .map((x) => x.InstanceNumber)
      .indexOf(positions[position]);
    if (index === -1) {
      throw Error('Invalid DICOM position or your are not authenticated');
    }
    const { FilePath } = file_dicoms[index];
    console.log({ FilePath, position });
    var spawn = require('child_process').spawn;
    var process = spawn('python3', [
      path.join(__dirname, '../python/converter.py'),
      path.join(__dirname, FilePath), // FilePath
    ]);
    let final_data = [];
    process.stdout.on('data', function (data) {
      final_data.push(data.toString());
    });
    process.on('close', function (code) {
      console.log({ code });
      if (code !== 0) {
        console.log('an error has occurred');
      } else {
        const response = JSON.parse(final_data.join('').replace(/'/g, '"'));
        res.json(response);
      }
    });
    process.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
  } catch (error) {
    const { message } = error;
    console.log({ message });
    return res.status(404).json({ error: { message } });
  }
};