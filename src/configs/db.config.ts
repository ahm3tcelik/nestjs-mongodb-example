import { MongooseModuleOptions } from "@nestjs/mongoose";

export const mongoUri = `mongodb://localhost/nest-mongo-1`;

export const mongoOptions: MongooseModuleOptions = {
	useCreateIndex: true,
	useFindAndModify: false,
}