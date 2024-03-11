import numpy as np
from PIL import Image
from numpy import maximum, ndarray
from pydicom import dcmread, FileDataset
import sys

filepath = sys.argv[1]
def getDicomValue(ds,name):
    value = ds.get(name)
    if value is None:
        return ''
    return value

def convert_dicom(filepath, output_type="json", with_metadata=False):
    # https://pydicom.github.io/pydicom/stable/tutorials/dataset_basics.html

    # Extract dataset from dcm file
    # https://pydicom.github.io/pydicom/stable/reference/dataset.html
    ds = dcmread(filepath)

    # Extract the pixel data from dataset
    pixel_data = ds.pixel_array

    # Convert to float to avoid overflow or underflow losses.
    pixel_data_float = pixel_data.astype(float)
    maximum = np.amax(pixel_data_float)
    minimum = np.amin(pixel_data_float)
    # Rescaling grey scale between 0-255
    # pixel_data_float_scaled = np.maximum(pixel_data_float, 0) / pixel_data_float.max(initial=0) * 255.0

    # Convert to uint8 ndarray
    pixel_data_uint8_scaled = np.uintc(pixel_data_float)
    # maximum_scaled = np.amax(pixel_data_uint8_scaled)
    # minimum_scaled = np.amin(pixel_data_uint8_scaled)
    if output_type == "json":
        # Convert array to list
        PixelSpacing = getDicomValue(ds,'PixelSpacing')
        Modality = getDicomValue(ds,'Modality')
        SeriesDescription = getDicomValue(ds,'SeriesDescription')
        ProtocolName = getDicomValue(ds,'ProtocolName')
        PatientName = getDicomValue(ds,'PatientName')
        StudyDate = getDicomValue(ds,'StudyDate')
        StudyTime = getDicomValue(ds,'StudyTime')
        SliceThickness = getDicomValue(ds,'SliceThickness')
        SpacingBetweenSlices = getDicomValue(ds,'SpacingBetweenSlices')
        RepetitionTime = getDicomValue(ds,'RepetitionTime')
        EchoTime = getDicomValue(ds,'EchoTime')
        SliceLocation = getDicomValue(ds,'SliceLocation')
        ImageType = getDicomValue(ds,'ImageType')
        MagneticFieldStrength =  getDicomValue(ds,'MagneticFieldStrength')
        SeriesNumber =  getDicomValue(ds,'SeriesNumber')
        NumberOfFrames =  getDicomValue(ds,'NumberOfFrames')
        ImageOrientationPatient =  getDicomValue(ds,'ImageOrientationPatient')
        ImagePositionPatient =  getDicomValue(ds,'ImagePositionPatient')
        StudyDescription =  getDicomValue(ds,'StudyDescription')
        output_json = {
            "pixelData": pixel_data_uint8_scaled.tolist(),
            "filepath": filepath,
            "width": ds.Columns,
            "height": ds.Rows,
            "InstanceNumber": ds.InstanceNumber,
            "minimum": minimum,
            "maximum": maximum,
            "Modality":Modality,
            "SeriesDescription":SeriesDescription,
            "PatientName":PatientName,
            "StudyDate":StudyDate,
            "StudyTime":StudyTime,
            "SliceThickness":SliceThickness,
            "SpacingBetweenSlices":SpacingBetweenSlices,
            "ProtocolName":ProtocolName,
            "RepetitionTime": RepetitionTime,
            "EchoTime": EchoTime,
            "SliceLocation": SliceLocation,
            "MagneticFieldStrength": MagneticFieldStrength,
            "SeriesNumber": SeriesNumber,
            "NumberOfFrames": NumberOfFrames,
            "PixelSpacing": PixelSpacing,
            "ImageType": ImageType,
            "ImageOrientationPatient": ImageOrientationPatient,
            "ImagePositionPatient": ImagePositionPatient,
            "StudyDescription":StudyDescription
        }
        if with_metadata:
            output_json["metadata"] = ds.to_json_dict()
        return output_json
    # Convert array to RGB Image
    output_img = Image.fromarray(pixel_data_uint8_scaled).convert("RGB")
    return output_img

output_json = convert_dicom(filepath)
print(output_json)
sys.stdout.flush()