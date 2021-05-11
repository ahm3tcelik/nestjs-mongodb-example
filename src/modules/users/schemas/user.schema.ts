import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { genSalt, hash } from 'bcrypt';


export type UserDocument = User & Document;

@Schema({ timestamps: true, toJSON: { useProjection: true } })
export class User {

  @Prop({ required: true, trim: true, type: String })
  name: string;

  @Prop({ required: true, trim: true, type: String, unique: true })
  email: string;

  @Prop({ select: false, type: String })

  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User)
  .pre<UserDocument>('save', async function (next) {
    const user: UserDocument = this;
    if (user.password) {
      try {
        const salt = await genSalt();
        user.password = await hash(user.password, salt);
        return next();
      } catch (err) {
        return next(err);
      }
    }
  });