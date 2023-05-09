import { firebaseAdmin } from '@/services';
import { getFileType } from '@/utils';

import type { GetSignedUrlConfig } from '@google-cloud/storage/build/src/file';

const bucket = firebaseAdmin.storage().bucket();

export const uploadImageToFirebase = async (id, file) => {
  const fileType = getFileType(file.mimetype);
  const fileName = `${id}.${fileType}`;
  const filePath = file.path;

  const options = {
    destination: `avatars/${fileName}`,
  };

  await bucket.upload(filePath, options);
  return getImageDownloadUrl(fileName);
};

const getImageDownloadUrl = async (filename) => {
  const file = bucket.file(`avatars/${filename}`);
  const options: GetSignedUrlConfig = {
    action: 'read',
    expires: Date.now() + 1000 * 60 * 10,
  };

  const [url] = await file.getSignedUrl(options);
  return url;
};
