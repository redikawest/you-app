import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/entities/users.schema';
import { JsonWebTokenModule } from 'src/config/jwt.config';

@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name,schema: UserSchema},]), 
    JsonWebTokenModule
   ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
