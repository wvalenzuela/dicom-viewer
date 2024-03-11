export class JsonDcm {
  pixelData;
  width;
  height;
  maximum;
  minimum;
  metadata;
  filepath;

  constructor(data, metadata) {
    if (data === undefined || !data) return;
    const { pixelData, width, height, maximum, minimum, filepath, ...res } =
      data;
    this.pixelData = pixelData;
    this.width = width;
    this.height = height;
    this.maximum = maximum;
    this.minimum = minimum;
    this.filepath = filepath;
    if (res) {
      this.metadata = res;
    }
  }
}
