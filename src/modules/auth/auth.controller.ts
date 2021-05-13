import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { RefreshTokenDto, RefreshTokenResponseDto } from './dto/refresh-token.dto';
import { RegisterDto, RegisterResponseDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {

	constructor(private readonly authService: AuthService) { }

	@Post('register')
	async register(@Body() dto: RegisterDto): Promise<RegisterResponseDto> {
		return this.authService.register(dto);
	}

	@Post('login')
	async login(@Body() dto: LoginDto): Promise<LoginResponseDto> {
		return this.authService.login(dto);
	}

	@Post('logout')
	async logout(@Body() dto: RefreshTokenDto): Promise<void> {
		return this.authService.logout(dto);
	}

	@Post('refresh')
	async refresh(@Body() dto: RefreshTokenDto): Promise<RefreshTokenResponseDto> {
		return this.authService.refresh(dto);
	}
}