import { Request } from 'express';
import { User } from 'src/users/dto/user.dto';

export interface Payload {
  sub: number;
  username: string;
}

export interface Token {
  access_token: string;
}

export interface PassPortRequest extends Request {
  user: User;
}
