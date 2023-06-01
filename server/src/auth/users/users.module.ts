import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.schema';
import { UsersRepository } from './users.repositry';
import { HashService } from './hash.service';
import { CollectionsModule } from 'src/collections/collections.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CollectionsModule,
  ],
  providers: [UsersService, UsersRepository, HashService],
  exports: [UsersService, UsersRepository, HashService],
})
export class UsersModule {}
