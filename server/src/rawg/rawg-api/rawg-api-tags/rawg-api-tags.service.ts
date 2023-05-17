import { Injectable } from '@nestjs/common';
import { RawgApiService } from '../rawg-api.service';
import { HttpService } from '@nestjs/axios';
import { paginateResponse } from 'src/rawg/helpers/pagination.helper';
import { TagsDto } from 'src/rawg/rawg-tags/dto/tags.dto';

@Injectable()
export class RawgApiTagsService extends RawgApiService {
  constructor(protected readonly httpService: HttpService) {
    super(httpService, 'tags');
  }

  async getTags(page: number, page_size: number) {
    const paramsObject = {
      key: process.env.RAWG_API_KEY,
      page: page.toString(),
      page_size: page_size.toString(),
    };

    const httpParams = new URLSearchParams(paramsObject);

    const url = `${this.rawgApiUrl}?${httpParams}`;

    const response = await this.httpService.axiosRef.get(url);

    return paginateResponse(response, page, page_size, TagsDto, {
      showTotalPages: true,
    });
  }

  async getTagById(id: number) {
    const url = `${this.rawgApiUrl}/${id}?key=${process.env.RAWG_API_KEY}`;

    const response = await this.httpService.axiosRef.get(url);

    return response.data;
  }
}