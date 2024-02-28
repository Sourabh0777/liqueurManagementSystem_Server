import { BadRequestError } from '../../core/ApiError';
import { UploadedFile } from 'express-fileupload';

const imageValidate = (images: UploadedFile | UploadedFile[]) => {
  const files = Array.isArray(images) ? images : [images];

  for (const image of files) {
    if (files.length > 1) {
      throw new BadRequestError('Upload Only Single Image');
    }
    if (image.size > 200 * 1024) {
      throw new BadRequestError('Image Size Too Large');
    }

    const filetypes = /jpeg|jpg|png/;
    if (!filetypes.test(image.mimetype)) {
      throw new BadRequestError(
        'Incorrect file type, only JPEG, JPG, or PNG allowed',
      );
    }
  }

  return { error: false }; // No errors
};

export default imageValidate;
