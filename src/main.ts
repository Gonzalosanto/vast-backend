import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
const dev_config = 
{
  cors:true
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, dev_config);
  await app.listen(3000);
}
bootstrap();