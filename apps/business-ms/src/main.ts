import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { BusinessMsModule } from './business-ms.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BusinessMsModule,
    {
      transport: Transport.TCP,
    },
  );
  await app.listen();
}
bootstrap();
