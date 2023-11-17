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
}

export default new CommonUploaderController();
