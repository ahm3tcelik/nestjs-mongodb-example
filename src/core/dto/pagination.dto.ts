import { IsInt, IsOptional, IsString, ValidateIf } from "class-validator";

export class PaginationDto {
    @IsInt()
    @IsOptional()
    offset: number;

    @IsInt()
    @IsOptional()
    limit: number;

    @IsString()
    @IsOptional()
    sortBy: string;


    @IsOptional()
    @IsString()
    sortType: string;
}