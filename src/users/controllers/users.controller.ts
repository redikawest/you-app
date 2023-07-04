import { Controller, Get, Post, Put } from '@nestjs/common';

@Controller('users')
export class UsersController {
    
    @Get()
    GetProfile() {
        return "Hello World";
    }

    @Post()
    CreateProfile() {

    }

    @Put()
    UpdateProfile() {

    }
}
