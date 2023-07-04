import { ConflictException, HttpStatus, Injectable, NotFoundException, Res } from '@nestjs/common';
import { RegisterDto } from '../dtos/register.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/entities/users.schema';
import { LoginDto } from '../dtos/login.dto';
import { bcryptCompare, bcryptHash } from 'src/utils/bcrypt.utils';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    // constructor(private authRepository: AuthRepository) {}
    constructor(
        @InjectModel(User.name) private userModel: Model <UserDocument>,
        private jwtService: JwtService
    ) {}

    async login(@Res() res, payload: LoginDto)
    {
        let findUser = await this.userModel.findOne({email: payload.email});
        if (!findUser) {
            findUser = await this.userModel.findOne({username: payload.email});
            if (!findUser) {
                throw new NotFoundException(`Email/Username ${payload.email} not found`);
            }
        }

        const comparePassword = await bcryptCompare(payload.password, findUser.password)
        if (!comparePassword) {
            return res.status(HttpStatus.FORBIDDEN).json({message: "Password not match", statusCode: HttpStatus.FORBIDDEN})
        }

        const response = { email: findUser.email, username: findUser.username };
        return res.status(HttpStatus.OK).json({
            message: 'Login successfully',
            data: {
                access_token: await this.jwtService.signAsync(response),
            }});
 
    }

    async register(@Res() res, payload: RegisterDto): Promise<UserDocument> 
    {
        try {

            const existingUserEmail = await this.userModel.findOne({email: payload.email});
            if (existingUserEmail) {
                throw new ConflictException(`Email ${payload.email} is exist`);
            }

            const existingUserUsername = await this.userModel.findOne({username: payload.username});
            if (existingUserUsername) {
                throw new ConflictException(`Username ${payload.username} is exist`);
            }

            if (payload.password !== payload.confirmPassword) {
                return res.status(HttpStatus.FORBIDDEN).json({message: "Password not match", statusCode: HttpStatus.FORBIDDEN})
            }

            const saveData = {
                email: payload.email,
                password: await bcryptHash(payload.password),
                username: payload.username
            }

            const newStudent = await new this.userModel(saveData);
            newStudent.save();

            return res.status(HttpStatus.OK).json({
                message: 'User created successfully'});

        } catch (err: any) {
            return res.status(err.status).json(err.response)
        }
    }
}
