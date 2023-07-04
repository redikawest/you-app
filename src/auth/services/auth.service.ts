import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { RegisterDto } from '../dtos/register.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/entities/users.schema';
import { LoginDto } from '../dtos/login.dto';
import { bcryptCompare, bcryptHash } from 'src/utils/bcrypt.utils';
import { JwtService } from '@nestjs/jwt';
import { errorResponse, successResponse } from 'src/utils/api.response';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private userModel: Model <UserDocument>,
        private jwtService: JwtService
    ) {}

    async login(@Res() res, payload: LoginDto): Promise<any>
    {
        let findUser = await this.userModel.findOne({email: payload.email});
        if (!findUser) {
            findUser = await this.userModel.findOne({username: payload.email});
            if (!findUser) {
                throw errorResponse(res, HttpStatus.NOT_FOUND, `Email/Username ${payload.email} not found`);
            }
        }

        const comparePassword = await bcryptCompare(payload.password, findUser.password)
        if (!comparePassword) {
            throw errorResponse(res, HttpStatus.FORBIDDEN, "Password not match");
        }

        const response = { email: findUser.email, username: findUser.username };
        return successResponse(res, HttpStatus.OK, 'User created successfully', {access_token: await this.jwtService.signAsync(response)});
    }

    async register(@Res() res, payload: RegisterDto): Promise<any> 
    {
        try {

            const existingUserEmail = await this.userModel.findOne({email: payload.email});
            if (existingUserEmail) {
                throw errorResponse(res, HttpStatus.CONFLICT, `Email ${payload.email} is exist`);
            }

            const existingUserUsername = await this.userModel.findOne({username: payload.username});
            if (existingUserUsername) {
                throw errorResponse(res, HttpStatus.CONFLICT, `Username ${payload.username} is exist`);
            }

            if (payload.password !== payload.confirmPassword) {
                throw errorResponse(res, HttpStatus.FORBIDDEN, "Password not match");
            }
            
            const saveData = await this.payloadRegister(payload)

            const newUser = await new this.userModel(saveData);
            newUser.save();

            return successResponse(res, HttpStatus.OK, 'User created successfully');

        } catch (err: any) {
            return res.status(err.status).json(err.response)
        }
    }

    private async payloadRegister(data: any): Promise<any> 
    {
        const payload = {
            email: data.email,
            password: await bcryptHash(data.password),
            username: data.username
        }

        return payload;
    }
}
