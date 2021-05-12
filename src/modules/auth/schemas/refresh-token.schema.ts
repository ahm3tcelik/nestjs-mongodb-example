import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RefreshTokenDocument = RefreshToken & Document;

@Schema({ versionKey: false })
export class RefreshToken {

	@Prop({ required: true, type: String })
	userId: string;

	@Prop({ required: true, type: String })
	refreshToken: string;

}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);