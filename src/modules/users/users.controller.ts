import { Body, Controller, Get, Post, Query } from '@nestjs/common';
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
}