import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { response } from 'express';
import { User } from 'src/entities/user.entity';

@Controller('users')
export class UsersController {
  // eslint-disable-next-line prettier/prettier
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.getUser(id);
  }

  @Post()
  createUser(@Body() newUser: CreateUserDto) {
    try {
      if (newUser == null) {
        response.status(HttpStatus.CONFLICT).json('Error esta vacio');
      } else {
        return this.usersService.createUser(newUser);
      }
    } catch (error) {
      console.log('Error: ' + error);
    }
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
