import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../entities/users.schema';
import { Model } from 'mongoose';
import { CreateProfileDto } from '../dtos/create-profile.dto';
import { successResponse } from '../../utils/api.response';
import { UpdateProfileDto } from '../dtos/update-profile.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private userModel: Model <UserDocument>,
    ) {}

    async getProfile(@Res() res, user: any): Promise<any>
    {
        const data = await this.userModel.findOne({email: user.email});
        return successResponse(res, HttpStatus.OK, 'OK', this.responseProfile(data));
    }

    async createProfile(@Res() res, user: any, payload: CreateProfileDto, image: string): Promise<any>
    {
        try {

            let filter = {email: user.email}
            payload.image = image;

            const data = await this.userModel.findOneAndUpdate(filter, payload);

            return successResponse(res, HttpStatus.OK, "Success Create Profile", this.responseProfile(data))

        } catch (err: any) {
            return res.status(err.status).json(err.response)
        }
    }

    async updateProfile(@Res() res, user: any, payload: UpdateProfileDto, image: string): Promise<any>
    {
        try {

            let filter = {email: user.email}
            payload.image = image;

            const data = await this.userModel.findOneAndUpdate(filter, payload);

            return successResponse(res, HttpStatus.OK, "Success Update Profile", this.responseProfile(data))
            
        } catch (err: any) {
            return res.status(err.status).json(err.response)
        }
    }

    private responseProfile(data: any): any {

        const result = {
            
            email: data.email,
            username: data.username,
            displayName: data.displayName ? data.displayName : null,
            image: data.image ? data.image : null,
            gender: data.gender ? data.gender : null,
            birthdate: data.birthdate ? data.birthdate : null,
            horoscope: data.horoscope ? data.horoscope : null,
            zodiac: data.zodiac ? data.zodiac : null,
            height: data.height ? data.height : null,
            weight: data.weight ? data.weight : null,
        }

        return result;
    }
    
}
