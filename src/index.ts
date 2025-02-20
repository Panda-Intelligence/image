import init, { quantize_image } from '@panda-ai/imagequant';
import { PNGEncoder } from './PNGEncoder';
import { readBufferToImageData } from './utils';

export type QuantResult = {
  palette: Uint8Array;
  indices: Uint8Array;
};

export type ImageDataLike = {
  data: Uint8ClampedArray;
  width: number;
  height: number;
};

class WasmImageQuant {
  static async create() {
    await init();
    return new WasmImageQuant();
  }

  quantize(imageData: ImageDataLike, maxColors = 256): QuantResult {
    const { data, width, height } = imageData;

    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return quantize_image(data, width, height, maxColors);
  }
}

export { PNGEncoder };

export async function compressPNG(file: Blob) {
  const iq = await WasmImageQuant.create();
  const arrayBuffer = await file.arrayBuffer();
  const imageData = readBufferToImageData(arrayBuffer);

  const { palette, indices } = iq.quantize(imageData);

  // Generate PNG
  const pngData = PNGEncoder.encode(
    palette,
    indices,
    imageData.width,
    imageData.height
  );
  return pngData;
}

export default WasmImageQuant;
