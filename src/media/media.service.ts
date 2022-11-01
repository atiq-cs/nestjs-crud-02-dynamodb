import { Injectable } from "@nestjs/common";
import putMedia from "../db/media/putMediaItem";
import getMediaItem from "../db/media/getMediaItem";
import scanMediaItems from "../db/media/scanMediaItems";
import deleteMediaItem from "../db/media/deleteMediaItem";
import { Media } from "./media.model";
import updateMediaItem from "../db/media/updateMediaItem";

@Injectable()
export class MediaService
{
  generateSlug(title: string, year: number) {
    // TODO: if another media exists with same title and year, append a sequence number
    // 'replaceAll' requires 'es2021' or later
    // For now, if return an error if key already exists
    return title.toLowerCase().replaceAll(' ', '-').replace(/[^a-z0-9,.-]/gi, '');
  }

  async insertMediaItem(title: string, year: number, synopsis: string) {
    const slug = this.generateSlug(title, year);
    const item = new Media(slug, year, title, synopsis);
    // AWS DynamoDB will throw exception in Promise if key already exists
    return await putMedia(item);
  }

  getMediaItems() {
    return scanMediaItems();
  }

  async getMediaItem(slug: string, year: number) {
    return await getMediaItem(slug, year);
  }

  // When `mediaItems` Array is large, async/await comes handy 
  async updateMediaItem(slug: string, year: number, title: string, synopsis: string) {
    const item = new Media(slug, year, title, synopsis);
    return await updateMediaItem(item);
  }

  async deleteMediaItem(slug: string, year: number) {
    return deleteMediaItem(slug, year);
  }
}
