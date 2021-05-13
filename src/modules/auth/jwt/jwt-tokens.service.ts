import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { UserDocument } from '../../users/schemas/user.schema';
import { RefreshTokenResponseDto } from '../dto/refresh-token.dto';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { RefreshTokenRepository } from './resfresh-token.repository';

@Injectable()
export class JwtTokensService {
	constructor(
		private readonly jwt: JwtService,
		private readonly refreshTokensRepo: RefreshTokenRepository
	) { }

	async generateAccessToken(user: UserDocument): Promise<[string, string]> {
		const expiration = new Date();
		const ttl = Number(process.env.JWT_ACCESS_EXPIRE);
		expiration.setTime(expiration.getTime() + ttl);

		const options: JwtSignOptions = {
			issuer: process.env.COMPANY,
			audience: user.id,
			subject: user.email,
			secret: process.env.JWT_ACCESS_SECRET,
			expiresIn: process.env.JWT_ACCESS_EXPIRE
		};

		const payload: JwtPayload = {
			userId: user.id,
			userEmail: user.email
		};

		const accessToken = await this.jwt.signAsync(payload, options);
		return [accessToken, expiration.toISOString()];
	}

	async generateRefreshToken(user: UserDocument): Promise<[string, string]> {
		const expiration = new Date();
		const ttl = Number(process.env.JWT_REFRESH_EXPIRE)
		expiration.setTime(expiration.getTime() + ttl);

		const options: JwtSignOptions = {
			issuer: process.env.COMPANY,
			audience: user.id,
			subject: user.email,
			secret: process.env.JWT_REFRESH_SECRET,
			expiresIn: process.env.JWT_REFRESH_EXPIRE
		};

		const payload: JwtPayload = {
			userId: user.id,
			userEmail: user.email
		};

		const refreshToken = await this.jwt.signAsync(payload, options);
		await this.refreshTokensRepo.createOrUpdateOne({ userId: payload.userId }, { ...payload });
		return [refreshToken, expiration.toISOString()];
	}

	async getAccessTokenFromRefreshToken(refreshToken: string): Promise<RefreshTokenResponseDto> {
		let refreshPayload: JwtPayload;
		try {
			refreshPayload = await this.jwt.verifyAsync(refreshToken, {
				secret: process.env.JWT_REFRESH_SECRET
			});
		} catch (e) {
			throw new BadRequestException(e);
		}

		const refreshDoc = await this.refreshTokensRepo.findOne({ userId: refreshPayload.userId });
		if (!refreshDoc) {
			throw new BadRequestException('Refresh token is not found.');
		}

		const payload: JwtPayload = {
			userId: refreshPayload.userId,
			userEmail: refreshPayload.userEmail,
		};

		const options: JwtSignOptions = {
			issuer: process.env.COMPANY,
			audience: payload.userId,
			subject: payload.userEmail,
			secret: process.env.JWT_ACCESS_SECRET,
			expiresIn: process.env.JWT_ACCESS_EXPIRE,
		};

		const accessToken = await this.jwt.signAsync(payload, options);
		return { accessToken };
	}

	async deleteRefreshToken(refreshToken: string): Promise<void> {
		const { userId }: JwtPayload = await this.jwt
			.verifyAsync(refreshToken, { secret: process.env.JWT_REFRESH_SECRET })
			.catch((e: Error) => { throw new BadRequestException(e.message) });

		await this.refreshTokensRepo.deleteOne({ userId: userId });
	}

}