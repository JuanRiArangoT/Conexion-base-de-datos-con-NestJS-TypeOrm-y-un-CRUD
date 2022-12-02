import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    // eslint-disable-next-line prettier/prettier
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  createUser(user: CreateUserDto) {
    try {
      const password = crypto.createHmac('SHA256', user.password).digest('hex');
      delete user.password;
      const partialUser: DeepPartial<User> = {
        username: user.username,
        password,
        email: user.email,
        nombre: user.nombre,
        apellido: user.apellido,
      };
      return this.userRepository.save(partialUser);
    } catch (error) {
      console.log('Error: ' + error);
    }
  }

  getUsers() {
    return this.userRepository.find();
  }

  getUser(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }
}
