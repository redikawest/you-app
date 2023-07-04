import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../entities/users.schema';
import { Model } from 'mongoose';
import { CreateProfileDto } from '../dtos/create-profile.dto';
import { successResponse } from 'src/utils/api.response';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private userModel: Model <UserDocument>,
    ) {}

    async getProfile(@Res() res, user: any): Promise<any>
    {
        const data = await this.userModel.findOne({email: user.email});
        return successResponse(res, HttpStatus.OK, 'OK', data);
    }

    async createProfile(@Res() res, user: any, payload: CreateProfileDto): Promise<any>
    {
        try {

            let filter = {email: user.email}
            let update = {payload}

            const data = await this.userModel.findOneAndUpdate(filter, update);

            return successResponse(res, HttpStatus.OK, "OK", data)

        } catch (err: any) {
            return res.status(err.status).json(err.response)
        }
    }

    async updateProfile(@Res() res, user: any, payload: CreateProfileDto): Promise<any>
    {
        try {

            let filter = {email: user.email}
            let update = {payload}

            const data = await this.userModel.findOneAndUpdate(filter, update);

            return successResponse(res, HttpStatus.OK, "OK", data)
            
        } catch (err: any) {
            return res.status(err.status).json(err.response)
        }
    }
    
}
