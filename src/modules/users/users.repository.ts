import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { BaseRepository } from '../../core/base/base.repository';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersRepository extends BaseRepository<UserDocument> {
  constructor(@InjectModel(User.name) private usersModel: Model<UserDocument>) {
    super(usersModel);
  }

  async findOneWithHiddenFields(filterQuery: FilterQuery<UserDocument>): Promise<UserDocument> {
    return this.usersModel.findOne(filterQuery).select('+password').exec();
  }
}