import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Game, GameDocument } from './models/Game.schema';
import { Model } from 'mongoose';
import { RawgGameResponseDto } from './dto/rawg-game-response.dto';

@Injectable()
export class GamesRepository {
  constructor(@InjectModel(Game.name) private gameModel: Model<GameDocument>) {}

  async saveGames(games: RawgGameResponseDto[]) {
    const gamesToSave = games.map(
      (game) => new this.gameModel({ game_id: game.id, rawgGame: game }),
    );
    return this.gameModel.insertMany(gamesToSave);
  }

  async saveGame(game: Game): Promise<Game> {
    const gameToSave = new this.gameModel(game);
    return gameToSave.save();
  }

  async updateGame(gameId: number, updateGame: Partial<Game>) {
    await this.gameModel.updateOne({ game_id: gameId }, updateGame);
  }

  async findGame(gameId: number): Promise<Game> {
    const game = this.gameModel.findOne({
      game_id: gameId,
    });

    return game;
  }
}