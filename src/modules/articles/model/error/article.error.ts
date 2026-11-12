import { NotFoundException } from '@nestjs/common';

export class ArticleNotFoundError extends NotFoundException {
  constructor(id: string) {
    super(`Article with ID ${id} does not exist.`);
  }
}
