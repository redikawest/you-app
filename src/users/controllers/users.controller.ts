import { Body, Controller, Get, Post, Put, Request, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateProfileDto } from '../dtos/create-profile.dto';
import { UpdateProfileDto } from '../dtos/update-profile.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { UsersService } from '../services/users.service';

@Controller('')
export class UsersController {
    
    constructor(
        private userService: UsersService
    ) {}

    @UseGuards(AuthGuard)
    @Get('getProfile')
    GetProfile(@Request() req, @Res() res) {
        return this.userService.getProfile(res, req.user);
    }

    @UseGuards(AuthGuard)
    @Post('createProfile')
    async CreateProfile(@Request() req, @Res() res, @Body(new ValidationPipe()) payload: CreateProfileDto) 
    {
        return this.userService.createProfile(res, req.user, payload);
    }

    @UseGuards(AuthGuard)
    @Put('updateProfile')
    async UpdateProfile(@Request() req, @Res() res, @Body(new ValidationPipe()) payload: UpdateProfileDto) 
    {
        return this.userService.updateProfile(res, req.user, payload);
    }
}
