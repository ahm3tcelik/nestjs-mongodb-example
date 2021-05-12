import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtTokensService } from './jwt/jwt-tokens.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { RefreshTokenRepository } from './jwt/resfresh-token.repository';
import { RefreshToken, RefreshTokenSchema } from './schemas/refresh-token.schema';

@Module({
	imports: [
		UsersModule,
		MongooseModule.forFeature([{ name: RefreshToken.name, schema: RefreshTokenSchema }]),
		JwtModule.registerAsync(({
			imports: [ConfigModule],
			useFactory: async () => ({
				secret: process.env.JWT_ACCESS_SECRET,
				verifyOptions: { ignoreExpiration: false },
				signOptions: { expiresIn: process.env.JWT_ACCESS_EXPIRE }
			}),
			inject: [ConfigService]
		}))
	],
	controllers: [AuthController],
	providers: [AuthService, JwtTokensService, JwtStrategy, RefreshTokenRepository]
})
export class AuthModule { }