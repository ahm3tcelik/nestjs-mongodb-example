import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString } from "class-validator";

export class PaginationDto {
    @IsOptional()
    @IsInt()
    @Transform(({ value: v }) => parseInt(v))
    offset: number;

    @IsOptional()
    @IsInt()
    @Transform(({ value: v }) => parseInt(v))
    limit: number;

    @IsOptional()
    @IsString()
    sortBy: string;

    @IsOptional()
    @IsString()
    @Transform(({ value: v }) => parseSortType(v))
    sortType: string;
}

const parseSortType = (sortType: string) => {
    if (sortType.startsWith('d')) return 'desc';
    return 'asc';
}