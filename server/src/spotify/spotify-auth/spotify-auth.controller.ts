import { Controller, Get, Redirect, Query } from '@nestjs/common';
import { SpotifyAuthService } from './spotify-auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('SpotifyAPI')
@Controller('spotify/auth')
export class SpotifyAuthController {
  constructor(private readonly spotifyAuthService: SpotifyAuthService) {}

  @Get('/login')
  @Redirect()
  async authorize() {
    const url = this.spotifyAuthService.getAuthorizeURL();
    return { url };
  }

  @Get('/callback')
  @Redirect()
  async handleCallback(@Query('code') code: string) {
    await this.spotifyAuthService.handleAuthorizationCallback(code);

    return { url: 'http://localhost:3000/spotify/podcasts' };
  }
}
