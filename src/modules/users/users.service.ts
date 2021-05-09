import { Injectable, NotFoundException } from '@nestjs/common';
import { SearchPaginationDto } from 'src/core/dto/search-pagination.dto';
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

  async search(dto: SearchPaginationDto): Promise<User[]> {
    return this.usersRepo.findAll(
      {
        $text: {
          $search: dto.key,
          $caseSensitive: false
        },
      },
      {
        limit: dto.limit,
        offset: dto.offset,
        sort: [dto.sortBy, dto.sortType ?? 1]  // 1: default ascending
      }
    )
  }

  async findAll(dto: PaginationDto): Promise<User[]> {
    return this.usersRepo.findAll({},
      {
        limit: dto.limit,
        offset: dto.offset,
        sort: [dto.sortBy, dto.sortType ?? 1]  // 1: default ascending
      });
  }

  async findOne(id: string) {
    return this.usersRepo
      .findOne({ _id: id })
      .catch((_) => {
        throw new NotFoundException('User has not found');
      });
  }
}