import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('login')
    login(@Body(new ValidationPipe()) payload: LoginDto) {
        return this.authService.login();
    }

    @Post('register')
    register(@Body(new ValidationPipe()) payload: RegisterDto) {
        return this.authService.register();
    }
}
