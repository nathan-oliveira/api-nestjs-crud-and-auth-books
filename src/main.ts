import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { EntityNotFoundExceptionFilter } from './expection-filters/entity-not-found';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**
   * whitelist => remove atributo enviado que não está configurado no dto
   * forbidNonWhitelisted => não permite que seja enviado atributo não configurado no dto
   * transform => transformar o objeto que foi recebido para o tipo do dto configurado
   */

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  
  app.useGlobalFilters(new EntityNotFoundExceptionFilter());

  const options = new DocumentBuilder()
    .setTitle('Books - Nest.js API')
    .setDescription('Documentação da API Nest.js')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);
}

bootstrap();
