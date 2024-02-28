import { BadRequestError } from '../../core/ApiError';
import { UploadedFile } from 'express-fileupload';

const imageValidate = (userimages:UploadedFile | UploadedFile[]) => {

  let imagesTable=[];
  if(Array.isArray(userimages))
  {
    imagesTable=userimages;
  }
  else{
    imagesTable.push(userimages);
  }

  for (const image of imagesTable) {
    if (imagesTable.length > 1) {
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

  return { error: false }; 
};

export default {imageValidate};