import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { ROLES_KEY } from './roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { ReadAuthDto } from 'src/auth/dto';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user }: { user: ReadAuthDto } = context.switchToHttp().getRequest();

    const isRoleValid = requiredRoles.some((role) => user.level === role);
    if (!isRoleValid) throw new UnauthorizedException();
    return isRoleValid;
  }
}
