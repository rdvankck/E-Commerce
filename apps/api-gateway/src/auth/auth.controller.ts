import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Tenant } from '../tenant/tenant.decorator';
import { TenantContext } from '../tenant/tenant.service';

class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}

class RefreshTokenDto {
  @IsString()
  refreshToken!: string;
}

interface RequestWithUser extends Request {
  user: {
    id: string;
    email: string;
    tenantId: string;
    role: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Tenant() tenant: TenantContext,
  ) {
    return this.authService.login(loginDto.email, loginDto.password, tenant.tenantId);
  }

  @Post('refresh')
  async refresh(@Body() refreshDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshDto.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req: RequestWithUser) {
    return req.user;
  }
}
