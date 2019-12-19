import { IsOptional, IsNotEmpty } from 'class-validator';

export class NewsFilterDto {
  @IsOptional()
  @IsNotEmpty()
  provider: string;
  @IsNotEmpty()
  search: string;
  constructor(search: string, provider: string) {
    this.search = search;
    this.provider = provider;
  }
}
