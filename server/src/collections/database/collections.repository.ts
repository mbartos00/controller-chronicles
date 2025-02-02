import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Collection, Model, Types } from 'mongoose';

import { CollectionDocument } from '../models/collection.model';

import { Game } from 'src/games/models/game.schema';

import { CreateNewCollectionDto } from '../dto/create-new-collection.dto';

const MAX_COLLECTIONS = 5;

@Injectable()
export class CollectionsRepository {
  constructor(
    @InjectModel(Collection.name) private collectionModel: Model<CollectionDocument>
  ) {}

  async addGameToCollection(game: Game, collectionId: string) {
    const collection = await this.findCollectionById(collectionId);

    if (!collection) {
      throw new NotFoundException('Collection not found');
    }

    if (collection.games.find((g) => g._id.toString() === game._id.toString())) {
      throw new BadRequestException('Game already exists in this collection');
    }

    collection.games.push(game);

    return collection.save();
  }

  async deleteGameFromCollection(game: Game, collectionId: string) {
    const collection = await this.findCollectionById(collectionId);

    if (!collection) {
      throw new NotFoundException('Collection not found');
    }

    const gameIndex = collection.games.findIndex(g => g._id.toString() === game._id.toString());
    if (gameIndex === -1) {
      throw new BadRequestException('Game does not exist in this collection');
    }

    collection.games.splice(gameIndex, 1);

    await collection.save();

    return collection;
  }

  async createCollection(userId: string, createNewCollectionDto: CreateNewCollectionDto) {
    const userCollections = await this.findAllCollectionsByUserId(userId);

    if (userCollections.length >= MAX_COLLECTIONS) {
      throw new BadRequestException('You cannot create more than 5 collections');
    }

    if (userCollections.find((c) => c.name.toLowerCase().trim() === createNewCollectionDto.name.toLowerCase().trim())) {
      throw new BadRequestException('You cannot create a collection with the same name');
    }

    const newCollection = new this.collectionModel({
      userId,
      games: [],
      ...createNewCollectionDto,
    });

    return newCollection.save();
  }

  async deleteCollection(userId: string, collectionId: string) {
    const collectionToDelete = await this.collectionModel.findOne({ _id: collectionId, userId: userId });

    if (!collectionToDelete) {
      throw new NotFoundException('Collection not found');
    }

    return collectionToDelete.deleteOne();
  }

  async getCollections(userId: string) {
    const collections = await this.findAllCollectionsByUserId(userId);

    return collections;
  }

  private findAllCollectionsByUserId(userId: string): Promise<CollectionDocument[]> {
    return this.collectionModel.find({ userId });
  }

  private findCollectionById(collectionId: string) {
    return this.collectionModel.findById(collectionId);
  }
}
