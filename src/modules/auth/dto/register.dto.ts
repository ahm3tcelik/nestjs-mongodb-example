import { User } from '../../users/schemas/user.schema';
import { CreateUserDto } from '../../users/dto/create-user.dto';

export class RegisterDto extends CreateUserDto {

}

export class RegisterResponseDto {
	user: User;
	payload: {
		accessToken: string;
		refreshToken: string;
		expiresAt: string;
	}
}