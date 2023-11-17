import path from 'path';
import multer from 'multer';
import { Request } from 'express';
import dayjs from 'dayjs';

const memoryStorage = multer.memoryStorage();

const questionZipStorage = multer.diskStorage({
  destination: path.join(__dirname, '../../tmp'),
  filename: (req: Request, file, callback) => {
    callback(null, `questions_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const commonFileStorage = multer.diskStorage({
  destination: path.join(__dirname, '../../public/resources/common'),
  filename: (req: Request, file, callback) => {
    callback(null, `${dayjs().format('YYYYMMDDHHMM')}_${file.mimetype.split('/')[0]}_${encodeURIComponent(file.originalname)}`);
  },
});

const withoutSavingUploader = multer({ storage: memoryStorage });
const questionZipUploader = multer({ storage: questionZipStorage });
const commonFileUploader = multer({ storage: commonFileStorage });

export {
  withoutSavingUploader,
  questionZipUploader,
  commonFileUploader,
};
