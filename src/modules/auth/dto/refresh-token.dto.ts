import { IsNotEmpty } from "class-validator";

export class RefreshTokenDto {
	@IsNotEmpty({ message: 'Refresh token is required' })
	readonly refreshToken: string;
}

export class RefreshTokenResponseDto {
	accessToken: string;
}