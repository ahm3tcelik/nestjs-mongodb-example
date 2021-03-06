import { Body, Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { SearchPaginationDto } from '../../core/dto/search-pagination.dto';
import { PaginationDto } from '../../core/dto/pagination.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
import { JwtGuard } from '../auth/jwt/jwt.guard';

@Controller('users')
@UseGuards(JwtGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Get()
  async getUsers(@Query() dto: PaginationDto): Promise<User[]> {
    return this.usersService.findAll(dto)
  }

  @Get('search')
  async searchUsers(@Query() dto: SearchPaginationDto): Promise<User[]> {
    return this.usersService.search(dto);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string, @Body() dto: UpdateUserDto): Promise<User> {
    return this.usersService.updateOne(id, dto);
  }

}