import { CreateArticleHandler } from './application/command/create-article.command';
import { DeleteArticleHandler } from './application/command/delete-article.command';
import { UpdateArticleHandler } from './application/command/update-article.command';
import { GetArticleByIdHandler } from './application/query/get-article-by-id.query';
import { ListArticlesHandler } from './application/query/list-articles.query';
import { ArticleRepository } from './infra/database/article.repository';
import { CreateArticleAction } from './infra/http/action/article/create-article.action';
import { DeleteArticleAction } from './infra/http/action/article/delete-article.action';
import { GetArticleAction } from './infra/http/action/article/get-article.action';
import { ListArticlesAction } from './infra/http/action/article/list-articles.action';
import { UpdateArticleAction } from './infra/http/action/article/update-article.action';

export const ACTIONS = [
  ListArticlesAction,
  GetArticleAction,
  CreateArticleAction,
  UpdateArticleAction,
  DeleteArticleAction,
];

export const QUERY_HANDLERS = [ListArticlesHandler, GetArticleByIdHandler];

export const COMMAND_HANDLERS = [
  CreateArticleHandler,
  UpdateArticleHandler,
  DeleteArticleHandler,
];

export const REPOSITORIES = [ArticleRepository];
