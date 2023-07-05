import { Body, Controller, Get, Post, Request, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';

@Controller('')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Res() res, @Body(new ValidationPipe()) payload: LoginDto)
    {
        return await this.authService.login(res, payload);
    }

    @Post('register')
    async register(@Res() res, @Body(new ValidationPipe()) payload: RegisterDto)
    {
        return await this.authService.register(res, payload);
    }
}
