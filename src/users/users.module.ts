import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name,schema: UserSchema},]), 
   ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
