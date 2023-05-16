import { getFileType } from '@/utils';

describe('getFileType', () => {
  it('should return the correct file type', () => {
    expect(getFileType('image/png')).toBe('png');
    expect(getFileType('application/pdf')).toBe('pdf');
    expect(getFileType('text/plain')).toBe('plain');
  });

  it('should return undefined if type is not in the correct format', () => {
    expect(getFileType('')).toBeUndefined();
    expect(getFileType('image')).toBeUndefined();
    expect(getFileType('audio/mpeg3')).toBe('mpeg3');
  });
});
