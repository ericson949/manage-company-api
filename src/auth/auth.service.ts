import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findByUsername(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.uuid, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(
    username: string,
    pass: string,
  ): Promise<{ isSaved: boolean; message: string }> {
    const user = await this.usersService.findByUsername(username);
    if (user) {
      throw new ConflictException('User already exist');
    }
    const save = this.usersService.create(username, pass);
    return {
      isSaved: true,
      message: 'Utilisateur crée',
    };
  }
}
