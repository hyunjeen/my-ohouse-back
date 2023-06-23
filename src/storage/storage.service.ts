import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { ConfigService } from '@nestjs/config';
import retry from 'async-retry';
import { v4 as uuid } from 'uuid';
import * as path from 'path';
import pako from 'pako';
type FileUploadResult = {
  fileName: string;
  publicUrl?: string;
  reason?: string;
};

@Injectable()
export class StorageService {
  private storage: Storage;

  constructor(private readonly configService: ConfigService) {
    this.storage = new Storage({
      projectId: configService.get('PROJECT_ID'),
      keyFilename: 'my-ohhouse-51dd13363b5e.json',
    });
  }

  async save(file: Express.Multer.File, bucketName: string) {
    const extension = path.extname(file.originalname);
    const filename = `${uuid()}${extension}`;
    const storageFile = this.storage.bucket(bucketName).file(filename);
    const buffer = pako.gzip(file.buffer);
    const stream = storageFile.createWriteStream({
      metadata: {
        contentType: file.mimetype,
        contentEncoding: 'gzip',
        metadata: {
          originalName: file.originalname,
        },
      },
    });
    return new Promise<string>((resolve, reject) => {
      stream.on('finish', async () => {
        try {
          await storageFile.makePublic();
          const publicUrl = `https://storage.googleapis.com/${bucketName}/${storageFile.name}`;
          resolve(publicUrl);
        } catch (error) {
          reject(
            new InternalServerErrorException('Failed to make file public'),
          );
        }
      });
      stream.on('error', reject);
      stream.end(buffer);
    });
  }

  async uploadMultipleFiles(
    files: Express.Multer.File[],
    bucketName: string,
  ): Promise<FileUploadResult[]> {
    const uploadPromises = files.map((file) =>
      retry(async () => {
        try {
          return await this.save(file, bucketName);
        } catch (error) {
          throw error;
        }
      }),
    );
    const results = await Promise.allSettled(uploadPromises);
    return results.map((result, index) => {
      if (result.status === 'fulfilled') {
        return {
          fileName: files[index].originalname,
          publicUrl: result.value,
        };
      } else {
        return {
          fileName: files[index].originalname,
          reason: result.reason,
        };
      }
    });
  }
}
