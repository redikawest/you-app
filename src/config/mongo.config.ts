import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://root:root@testing.9pysjly.mongodb.net/?retryWrites=true&w=majority', {dbName: 'you-app-test'})
  ],
})
export class DatabaseModule {}