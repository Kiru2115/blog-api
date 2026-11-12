import { Command, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ArticleRepository } from '../../infra/database/article.repository';
import { ArticleNotFoundError } from '../../model/error/article.error';

export class DeleteArticleCommand extends Command<void> {
  constructor(readonly id: string) {
    super();
  }
}

@CommandHandler(DeleteArticleCommand)
export class DeleteArticleHandler implements ICommandHandler<DeleteArticleCommand> {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async execute(command: DeleteArticleCommand): Promise<void> {
    const article = await this.articleRepository.findById(command.id);

    if (!article) {
      throw new ArticleNotFoundError(command.id);
    }

    await this.articleRepository.delete(command.id);
  }
}
