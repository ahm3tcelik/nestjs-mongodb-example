import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../../core/base/base.repository';
import { RefreshToken, RefreshTokenDocument } from '../schemas/refresh-token.schema';

@Injectable()
export class RefreshTokenRepository extends BaseRepository<RefreshTokenDocument> {
	constructor(@InjectModel(RefreshToken.name) private tokensModel: Model<RefreshTokenDocument>) {
		super(tokensModel);
	}
}