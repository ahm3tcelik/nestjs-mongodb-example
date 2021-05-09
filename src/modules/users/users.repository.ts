import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { PaginationType } from 'src/core/utils/types/pagination.type';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UserDocument>
  ) { }

  async create(user: User): Promise<User> {
    const _user = new this.usersModel(user);
    return _user.save();
  }

  async findOne(filterQuery: FilterQuery<User>): Promise<User> {
    return this.usersModel.findOne(filterQuery);
  }

  async findAll(filterQuery?: FilterQuery<User>, pagination?: PaginationType): Promise<User[]> {
    let doc = this.usersModel.find(filterQuery);
    doc = pagination?.offset ? doc.skip(pagination.offset) : doc
    doc = pagination?.limit ? doc.limit(pagination.limit) : doc
    doc = pagination?.sort ? doc.sort([pagination.sort]) : doc;
    return doc.exec();
  }

  async updateOne(filterQuery: FilterQuery<User>, user: Partial<User>): Promise<User> {
    return this.usersModel.findOneAndUpdate(filterQuery, user);
  }
}