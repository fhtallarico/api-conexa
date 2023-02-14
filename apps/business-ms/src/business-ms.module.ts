import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'apps/login-ms/src/module/schemas/user.schema';
import { jwtConstants } from 'commons/constants/jwtConstants';
import { LoggerMiddleware } from 'commons/middlewares/loggin.middleware';
import { JwtStrategy } from 'commons/strategies/jwt.strategy';
import { BusinessController } from './module/controllers/business.controller';
import { BusinessService } from './module/services/business.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}`,
    ),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '300s' },
    }),
  ],
  controllers: [BusinessController],
  providers: [BusinessService, JwtStrategy],
})
export class BusinessMsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
