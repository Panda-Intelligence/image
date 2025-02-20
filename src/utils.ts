import { type ImageDataLike } from './index';
import { PNG } from 'pngjs/browser';

export function concatBuffers(buffers: Uint8Array[]) {
  const totalLength = buffers.reduce((acc, buf) => acc + buf.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const buf of buffers) {
    result.set(buf, offset);
    offset += buf.length;
  }
  return result;
}

export function readBufferToImageData(fileBuffer: ArrayBuffer): ImageDataLike {
  const buffer = Buffer.from(fileBuffer);
  const decoded = PNG.sync.read(buffer);
  return {
    data: new Uint8ClampedArray(decoded.data),
    width: decoded.width,
    height: decoded.height,
  };
}
