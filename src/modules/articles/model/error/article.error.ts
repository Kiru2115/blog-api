export class ArticleNotFoundError extends Error {
  constructor(id: string) {
    super(`Article with ID ${id} does not exist.`);
  }
}
