import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { RefreshTokenDto, RefreshTokenResponseDto } from './dto/refresh-token.dto';
import { RegisterDto, RegisterResponseDto } from './dto/register.dto';
import { JwtTokensService } from './jwt/jwt-tokens.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtTokensService: JwtTokensService
	) { }

	async login(dto: LoginDto): Promise<LoginResponseDto> {

		const user = await this.usersService
			.findByMailWithPassword(dto.email)
			.catch(_ => { throw new UnauthorizedException('Email or password is incorrect'); });

		const isValid = await compare(dto.password, user.password);

		if (!isValid) {
			throw new UnauthorizedException('Email or password is incorrect')
		}

		const [refreshToken, reTokenExpiresAt] = await this.jwtTokensService.generateRefreshToken(user);
		const [accessToken, _] = await this.jwtTokensService.generateAccessToken(user)

		return {
			user,
			payload: {
				accessToken,
				refreshToken,
				expiresAt: reTokenExpiresAt
			}
		};
	}

	async register(dto: RegisterDto): Promise<RegisterResponseDto> {
		const user = await this.usersService.create(dto);

		const [refreshToken, expiresAt] = await this.jwtTokensService.generateRefreshToken(user);
		const [accessToken, _] = await this.jwtTokensService.generateAccessToken(user);

		return {
			user,
			payload: {
				accessToken,
				refreshToken,
				expiresAt
			}
		};
	}

	async logout(dto: RefreshTokenDto): Promise<void> {
		await this.jwtTokensService.deleteRefreshToken(dto.refreshToken);
	}

	async refresh(dto: RefreshTokenDto): Promise<RefreshTokenResponseDto> {
		return this.jwtTokensService.getAccessTokenFromRefreshToken(dto.refreshToken);
	}
}