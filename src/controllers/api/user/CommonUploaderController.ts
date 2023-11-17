import fs from 'fs';
import path from 'path';
import { sendError, sendSuccess } from '@libs/response';
import { Request, Response } from 'express';

class CommonUploaderController {
  public async uploadFile (req: Request, res: Response) {
    try {
      const files = req.files;
      (files as []).forEach((file: any) => {
        file.path = file.path.slice(file.path.indexOf('/public/resources/common'));
      });
      sendSuccess(res, { files });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async show (req: Request, res: Response) {
    try {
      const { link } = req.params;
      const readStream = fs.createReadStream(path.join(__dirname, `../../../..${link}`), { encoding: 'base64' });
      let data: any = '';
      readStream.on('data', function (chunk) {
        data += chunk;
      }).on('end', function () {
        res.end(Buffer.from(data, 'base64'));
      });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }
}

export default new CommonUploaderController();
