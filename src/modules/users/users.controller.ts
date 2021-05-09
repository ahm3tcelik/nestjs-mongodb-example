import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SearchPaginationDto } from 'src/core/dto/search-pagination.dto';
import { PaginationDto } from '../../core/dto/pagination.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) { }

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
        return this.usersService.findOne(id);
    }

    @Patch(':id')
    async updateUser(@Param('id') id: string) {

    }
}