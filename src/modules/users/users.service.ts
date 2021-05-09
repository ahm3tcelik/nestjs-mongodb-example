import { Injectable } from '@nestjs/common';
import { PaginationDto } from '../../core/dto/pagination.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepo: UsersRepository
    ) { }

    async create(dto: CreateUserDto) {
        return this.usersRepo.create(dto);
    }

    async findAll(dto: PaginationDto): Promise<User[]> {
        return this.usersRepo.findAll(
            {},
            {
                limit: dto.limit,
                offset: dto.offset,
                sort: [[dto.sortBy, dto.sortType ?? 1]] // 1: default ascending
            });
    }
}