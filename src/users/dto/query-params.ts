import { IsOptional } from 'class-validator';

export class QueryParamsUsers {
  @IsOptional()
  limit?: number;

  @IsOptional()
  page?: number;
}
