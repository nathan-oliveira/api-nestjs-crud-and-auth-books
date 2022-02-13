import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';

import { JwtPayloadDTO } from '../dto/jwt-payload.dto';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtPayloadDTO) {
    const userIsDisabled = await this.authService.userIsDisabled(payload.email);
    if (userIsDisabled) throw new UnauthorizedException();

    return {
      id: payload.sub,
      email: payload.email,
      active: payload.active,
    };
  }
}