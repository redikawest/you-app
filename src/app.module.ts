import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './config/mongo.config';

@Module({
  imports: [DatabaseModule, AuthModule, UsersModule]
})
export class AppModule {}
