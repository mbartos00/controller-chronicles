import { Module } from '@nestjs/common';
import { ReviewsSitesEurogamerService } from './reviews-sites-eurogamer.service';
import { PuppeteerModule } from 'src/puppeteer/puppeteer.module';
import { RawgGamesModule } from 'src/rawg/rawg-games/rawg-games.module';

@Module({
  imports: [PuppeteerModule, RawgGamesModule],
  providers: [ReviewsSitesEurogamerService],
  exports: [ReviewsSitesEurogamerService],
})
export class ReviewsSitesEurogamerModule {}