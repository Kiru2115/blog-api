import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as pack from '../../../../package.json';
import { INestApplication } from '@nestjs/common';

function createSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('Back-End of my personal blog')
    .setVersion(pack.version)
    .addServer('http://localhost', 'Local development')
    .setContact('Alan Maroń', 'https://github.com/Kiru2115', '')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'admin token',
        description:
          'Paste the admin token. Swagger adds the word Bearer for you.',
      },
      'access-token',
    )
    .build();
}

export function configureSwagger(app: INestApplication): void {
  const config = createSwaggerConfig();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });
}
