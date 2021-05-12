import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {

  @IsString()
  @Length(2, 60, { message: 'Your name must be 2-60 characters' })
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @Length(6, 30, { message: 'Your password must be 6-30 characters' })
  readonly password: string;
}