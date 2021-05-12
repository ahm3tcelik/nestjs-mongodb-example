import { IsEmail, Length } from 'class-validator';
import { User } from '../../users/schemas/user.schema';

export class LoginDto {

	@IsEmail()
	readonly email: string;

	@Length(6, 30, { message: 'Your password must be 6-30 characters' })
	readonly password: string;
}


export class LoginResponseDto {
	user: User;
	payload: {
		accessToken: string;
		refreshToken: string;
		expiresAt: string;
	}
}