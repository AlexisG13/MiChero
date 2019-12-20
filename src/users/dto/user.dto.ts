export class User {
  userId: number;
  username: string;
  password: string;
  constructor(userId: number, username: string, password: string) {
    this.userId = userId;
    this.username = username;
    this.password = password;
  }
}

export interface ValidatedUser {
  userId: number;
  username: string;
}
