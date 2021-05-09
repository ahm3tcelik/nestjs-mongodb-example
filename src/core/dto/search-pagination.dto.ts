import { IsOptional, IsString } from "class-validator";
import { PaginationDto } from "./pagination.dto";

export class SearchPaginationDto extends PaginationDto {

    @IsOptional()
    @IsString()
    key: string;
}