import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport/dist';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-jwt';
import { User } from '../../users/schemas/user.schema';
import { UsersService } from '../../users/users.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(private readonly usersService: UsersService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secret: process.env.JWT_ACCESS_SECRET,
			secretOrKey: process.env.JWT_ACCESS_SECRET,
			signOptions: {
				expiresIn: process.env.JWT_ACCESS_EXPIRE,
			},
		})
	}

	async validate(payload: JwtPayload): Promise<User> {
		const { userId } = payload;
		const user = await this.usersService.findById(userId);
		if (!user) {
			return null;
		}
		return user;
	}
}