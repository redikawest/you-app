import { Body, Controller, Get, Post, Put, Request, Res, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { CreateProfileDto } from '../dtos/create-profile.dto';
import { UpdateProfileDto } from '../dtos/update-profile.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { UsersService } from '../services/users.service';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const storage = {
    storage: diskStorage({
        destination: './storage/uploads',
        filename: (req, image, cb) => {
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            cb(null, `${uniqueSuffix}${extname(image.originalname)}`);
        },
    }),
}

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
    @UseInterceptors(FileInterceptor('image', storage))
    @Post('createProfile')
    async CreateProfile(@Request() req, @Res() res, @UploadedFile() image: Express.Multer.File, @Body(new ValidationPipe()) payload: CreateProfileDto)
    {
        return this.userService.createProfile(res, req.user, payload, image.path);
    }

    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('image', storage))
    @Put('updateProfile')
    async UpdateProfile(@Request() req, @Res() res, @UploadedFile() image: Express.Multer.File, @Body(new ValidationPipe()) payload: UpdateProfileDto) 
    {
        return this.userService.updateProfile(res, req.user, payload, image.path);
    }
}
