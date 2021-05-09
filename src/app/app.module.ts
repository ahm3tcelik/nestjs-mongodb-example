import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../modules/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [
		MongooseModule.forRoot('mongodb://localhost/nest-mongo-1', { useCreateIndex: true }),
		UsersModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
