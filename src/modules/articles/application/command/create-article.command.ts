import { Command, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ArticleRepository } from '../../infra/database/article.repository';
import { Article } from '../../model/article.model';

export class CreateArticleCommand extends Command<void> {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly content: string,
  ) {
    super();
  }
}

@CommandHandler(CreateArticleCommand)
export class CreateArticleHandler implements ICommandHandler<CreateArticleCommand> {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async execute(command: CreateArticleCommand): Promise<void> {
    await this.articleRepository.create(
      new Article(command.id, command.title, command.content, new Date()),
    );
  }
}
