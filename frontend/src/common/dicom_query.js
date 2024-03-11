import axios from 'axios';

export const QueryDicomImage = (idSeries, position) => {
  // console.log('QueryDicomImage', { idSeries, position });
  return axios({
    url: 'http://localhost:5001/api/dicom',
    method: 'GET',
    responseType: 'application/json', // important
    headers: {
      idSeries: idSeries,
      position: position,
    },
    // onDownloadProgress: event => handleProgress(event),
  });
};
