import { Injectable } from '@nestjs/common';
import { StorageService } from '@/storage/storage.service';

@Injectable()
export class ProductImageService {
  constructor(private readonly storageService: StorageService) {}

  async uploadFiles(files: Express.Multer.File[]) {
    return await this.storageService.uploadMultipleFiles(
      files,
      'ohhouse-products-image',
    );
  }
}
