import { Injectable } from '@nestjs/common';
import { User } from './dto/user.dto';

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'alexis',
        password: '1234',
      },
      {
        userId: 2,
        username: 'frank',
        password: '123',
      },
      {
        userId: 3,
        username: 'kevin',
        password: '111',
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
