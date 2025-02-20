import { describe, it } from 'bun:test';
import { compressPNG } from '../src/index';
import path from 'path';

describe('Test PNG compress', () => {
  it('should compress png file', async () => {
    const filePath = path.resolve(__dirname, './boat.png')
    const file = Bun.file(filePath);

    // Generate PNG
    const pngData = await compressPNG(file)

    const blob = new Blob([pngData], { type: 'image/png' });
    const outpath = path.resolve(__dirname, './output.png')
    await Bun.write(outpath, blob);
  })
})