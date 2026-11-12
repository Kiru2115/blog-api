import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsString, MaxLength, MinLength } from 'class-validator';

function trimText({ value }: TransformFnParams): unknown {
  return typeof value === 'string' ? value.trim() : value;
}

export class ArticleRequest {
  @ApiProperty({
    description: 'Title of the article',
    minLength: 3,
    maxLength: 200,
    example: 'My second article',
  })
  @Transform(trimText)
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  title: string;

  @ApiProperty({
    description: 'Text of the article',
    minLength: 10,
    maxLength: 20000,
    example: 'This article was written through the API.',
  })
  @Transform(trimText)
  @IsString()
  @MinLength(10)
  @MaxLength(20000)
  content: string;
}
