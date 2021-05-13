import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { SearchPaginationDto } from '../../core/dto/search-pagination.dto';
import { PaginationDto } from '../../core/dto/pagination.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
import { JwtGuard } from '../auth/jwt/jwt.guard';

@Controller('users')
@UseGuards(JwtGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto)
  }

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

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<number> {
    return this.usersService.deleteOne(id);
  }
}