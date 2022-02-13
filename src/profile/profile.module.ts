import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/model/users.model';
import { ProfileController } from './shared/profile.controller';
import { UsersService } from 'src/users/shared/users.service';

@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    controllers: [ProfileController],
    providers: [UsersService],
})
export class ProfileModule {}
