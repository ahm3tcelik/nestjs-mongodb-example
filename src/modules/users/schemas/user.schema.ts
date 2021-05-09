import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {

    @Prop({ required: true, trim: true, type: String })
    name: string;

    @Prop({ required: true, trim: true, type: String, unique: true })
    email: string;

    @Prop({ select: false, type: String })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);