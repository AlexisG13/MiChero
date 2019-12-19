import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Request } from 'express';

@Injectable()
export class ValidationJWTGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    if (!req.query.provider || req.query.provider === 'ny') {
      if (req.headers) {
        const token = <string>req.headers['authorization'];
        if (!token) return false;
        try {
          verify(token.split(' ')[1], 'secretKey');
          return true;
        } catch {
          return false;
        }
      }
    }
    return true;
  }
}
