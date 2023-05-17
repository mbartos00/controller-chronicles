import { Injectable } from '@nestjs/common';
import { google, youtube_v3 } from 'googleapis';
import { YoutubeRepository } from './youtube.repository';
import { RawgGamesService } from 'src/rawg/rawg-games/rawg-games.service';

export interface SearchResult {
  title: string;
  thumbnail: string;
  author: string;
  link: string;
}

@Injectable()
export class YoutubeService {
  private readonly youtube = google.youtube('v3');

  constructor(
    private readonly gamesService: RawgGamesService,
    private readonly youtubeRepository: YoutubeRepository,
  ) {}

  async getGameVideoReviewByGameId(
    id: number,
    lang?: 'pl' | 'en',
  ): Promise<{ video_reviews: SearchResult[] }> {
    const game = await this.gamesService.getGameById(id);
    const searchQuery = `${game.rawgGame.name} ${
      lang === 'pl' ? 'recenzja' : 'review'
    }`;

    const video_reviews = await this.getOrFetchGameVideos(
      game.game_id,
      game.rawgGame.name,
      searchQuery,
      'reviews',
    );
    return { video_reviews };
  }

  async getGameTrailersByGameId(
    id: number,
  ): Promise<{ game_trailers: SearchResult[] }> {
    const game = await this.gamesService.getGameById(id);
    const searchQuery = `${game.rawgGame.name} Official trailer`;

    const game_trailers = await this.getOrFetchGameVideos(
      game.game_id,
      game.rawgGame.name,
      searchQuery,
      'trailers',
    );

    return { game_trailers };
  }

  private async getOrFetchGameVideos(
    gameId: number,
    gameTitle: string,
    searchQuery: string,
    videoType: 'reviews' | 'trailers',
  ): Promise<SearchResult[]> {
    const existingVideos = await this.youtubeRepository.getGameVideos(
      gameId,
      videoType,
    );
    if (existingVideos.length > 0) {
      return existingVideos;
    }

    const newVideos = (await this.youtubeSearch(searchQuery)).filter((video) =>
      video.title?.toLowerCase().includes(gameTitle.toLowerCase()),
    );

    if (videoType === 'reviews') {
      await this.youtubeRepository.saveGameVideoReviews(gameId, newVideos);
    } else {
      await this.youtubeRepository.saveGameTrailers(gameId, newVideos);
    }

    return newVideos;
  }

  private async youtubeSearch(q: string): Promise<SearchResult[]> {
    const requestOptions: youtube_v3.Params$Resource$Search$List = {
      key: process.env.YOUTUBE_API_KEY,
      q: q,
      part: ['snippet'],
      type: ['video'],
      order: 'relevance',
      maxResults: 5,
    };

    const response = await this.youtube.search.list(requestOptions);

    return response.data.items.map((item) => ({
      title: item.snippet?.title,
      thumbnail: item.snippet?.thumbnails?.high?.url,
      author: item.snippet?.channelTitle,
      link: `https://www.youtube.com/watch?v=${item.id?.videoId}`,
    }));
  }
}