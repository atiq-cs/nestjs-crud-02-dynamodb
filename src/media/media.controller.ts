import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { MediaService } from "./media.service";

@Controller('media')
export class MediaController {
  constructor(private readonly mediaservice: MediaService) {}

  @Post()
  async insertMediaItem(
    @Body('title') title: string,
    @Body('year') year: number,
    @Body('synopsis') synopsis: string,
  ) {
    return await this.mediaservice.insertMediaItem(title, year, synopsis);
  }

  @Get()
  getAllMediaItems() {
    return this.mediaservice.getMediaItems();
  }

  @Get('/:slug/:year')
  getMediaItem(
    @Param('slug') slug: string,
    @Param('year') year: number,
  ) {
    return this.mediaservice.getMediaItem(slug, year);
  }

  @Put('/:slug/:year')
  async updateMediaItem(
    @Param('slug') slug: string,
    @Param('year') year: number,
    @Body('title') title: string,
    @Body('synopsis') synopsis: string,
  ) {
    return await this.mediaservice.updateMediaItem(slug, year, title, synopsis);
  }

  @Delete('/:slug/:year')
  async deleteMediaItem(
    @Param('slug') slug: string,
    @Param('year') year: number,
  ) {
    return await this.mediaservice.deleteMediaItem(slug, year);
  }
}