import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    //mongo connect db
    MongooseModule.forRoot('')
  ],
})
export class DatabaseModule {}