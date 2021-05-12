import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/modules/auth/jwt/jwt.guard';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('secret')
  @UseGuards(JwtGuard)
  getSecret(): string {
    return 'Hello secret!';
  }
}
