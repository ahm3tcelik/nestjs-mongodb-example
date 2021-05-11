import { Injectable, NotFoundException } from '@nestjs/common';
import { SearchPaginationDto } from 'src/core/dto/search-pagination.dto';
import { PaginationDto } from '../../core/dto/pagination.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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
    return this.usersRepo.findAll({
      $text: {
        $search: dto.key,
        $caseSensitive: false
      },
    }, {
      limit: dto.limit,
      offset: dto.offset,
      sort: [dto.sortBy, dto.sortType ?? 1]  // 1: default ascending
    });
  }

  async findAll(dto: PaginationDto): Promise<User[]> {
    return this.usersRepo.findAll({}, {
      limit: dto.limit,
      offset: dto.offset,
      sort: [dto.sortBy, dto.sortType ?? 1]  // 1: default ascending
    });
  }

  async findOne(id: string) {
    const result = await this.usersRepo.findOne({ _id: id });
    this.throwIfNull(result);
    return result;
  }

  async updateOne(id: string, dto: UpdateUserDto) {
    const result = await this.usersRepo.findAndUpdateOne({ _id: id }, dto)
    this.throwIfNull(result);
    return result;
  }

  async deleteOne(id: string): Promise<number> {
    const result = await this.usersRepo.deleteOne({ _id: id });
    this.throwIfNull(result);
    return result;
  }

  private throwIfNull(data: any) {
    if (!data) throw new NotFoundException('User has not found');
  }
}