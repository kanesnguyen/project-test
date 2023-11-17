import aws, { S3 } from 'aws-sdk';
import configs from '@configs/configs';
import Settings from '@configs/settings';
import dotenv from 'dotenv';

dotenv.config();

class S3Service {
  public s3: S3;
  static readonly ROOT_FOLDER = 'bui_phan'

  constructor () {
    this.s3 = new aws.S3(configs.s3);
  }

  public async upload (folder: string, fileName: string, buffer: Buffer) {
    const result = await this.s3.upload({
      Bucket: configs.s3.params.Bucket,
      Key: `${S3Service.ROOT_FOLDER}/${folder}/${fileName}`,
      Body: buffer,
      ACL: 'public-read',
    }).promise();
    return result;
  }

  public async getDownloadableUrl (key: string) {
    let url = this.s3.getSignedUrl('getObject', {
      Bucket: configs.s3.params.Bucket,
      Key: key,
      Expires: Settings.preSignExpiration,
    });
    if (process.env.S3_PROXY) url = url.replace(process.env.S3_ENDPOINT, process.env.S3_PROXY);
    return url;
  }

  public async headObject (key: string) {
    const header = await this.s3.headObject({
      Bucket: configs.s3.params.Bucket,
      Key: key,
    }).promise();
    return header;
  }

  public async getObject (key: string) {
    const object = this.s3.getObject({
      Bucket: configs.s3.params.Bucket,
      Key: key,
    });
    return object;
  }
}

export default new S3Service();
