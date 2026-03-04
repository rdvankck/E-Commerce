import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export interface JwtPayload {
  sub: string;
  email: string;
  tenantId: string;
  role: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Validate user credentials
   * In production, this would query the user service
   */
  async validateUser(email: string, password: string, tenantId: string): Promise<any> {
    // Mock validation for development
    // In production, call the core-service via TCP/HTTP
    if (email === 'admin@example.com' && password === 'password') {
      return {
        id: 'user-1',
        email,
        name: 'Admin User',
        role: tenantId === 'platform' ? 'platform_admin' : 'store_admin',
        tenantId,
      };
    }
    return null;
  }

  /**
   * Login user and generate tokens
   */
  async login(email: string, password: string, tenantId: string): Promise<LoginResponse> {
    const user = await this.validateUser(email, password, tenantId);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      tenantId: user.tenantId,
      role: user.role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '30d' }),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  /**
   * Verify JWT token
   */
  async verifyToken(token: string): Promise<JwtPayload> {
    try {
      return this.jwtService.verify<JwtPayload>(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    const payload = await this.verifyToken(refreshToken);

    const newPayload: JwtPayload = {
      sub: payload.sub,
      email: payload.email,
      tenantId: payload.tenantId,
      role: payload.role,
    };

    return {
      accessToken: this.jwtService.sign(newPayload),
    };
  }
}
