import { Document, FilterQuery, Model, NativeError, UpdateQuery } from "mongoose";
import { PaginationType } from "../utils/types/pagination.type";

export abstract class BaseRepository<T extends Document> {
	constructor(
		protected readonly entityModel: Model<T>
	) { }

	async create(entity: Partial<T>): Promise<T> {
		const _entity = new this.entityModel(entity);
		return _entity.save();
	}

	async findOne(filterQuery?: FilterQuery<T>): Promise<T> {
		return this.entityModel.findOne(filterQuery);
	}

	async findAll(filterQuery: FilterQuery<T>, pagination: PaginationType): Promise<T[]> {
		let doc = this.entityModel.find(filterQuery);
		doc = pagination?.offset ? doc.skip(pagination.offset) : doc;
		doc = pagination?.limit ? doc.limit(pagination.limit) : doc;
		doc = pagination?.sort ? doc.sort([pagination.sort]) : doc;
		return doc.exec();
	}

	async findAndUpdateOne(filterQuery: FilterQuery<T>, entity: UpdateQuery<T>): Promise<T> {
		return this.entityModel.findOneAndUpdate(filterQuery, entity);
	}

	async createOrUpdateOne(filterQuery: FilterQuery<T>, entity: UpdateQuery<T>): Promise<T> {
		return this.entityModel.findOneAndUpdate(filterQuery, entity, { upsert: true });
	}

	async deleteOne(filterQuery: FilterQuery<T>): Promise<number> {
		const result = await this.entityModel.deleteOne(filterQuery);
		return result.ok;
	}

}