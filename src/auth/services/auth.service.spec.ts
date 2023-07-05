import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { LoginDto } from '../dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../users/entities/users.schema';
import { getModelToken } from '@nestjs/mongoose';
import { HttpStatus } from '@nestjs/common';

describe('AuthService', () => {
    let service: AuthService;
    let userModel: Model<UserDocument>;
    let jwtService: JwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [AuthService, {
            provide: getModelToken(User.name),
            useValue: Model,
          },
          {
            provide: JwtService,
            useValue: {
              sign: jest.fn(),
            },
          },],
        }).compile();

        service = module.get<AuthService>(AuthService);
        userModel = module.get<Model<UserDocument>>(getModelToken(User.name));
        jwtService = module.get<JwtService>(JwtService);
    });

    describe('login', () => {
        it('should return the login result', async () => {


            // Mocked request payload
            const payload: LoginDto = {
              email: 'testuser',
              password: 'password123',
            };

            // Mocked user data
            const mockUser: UserDocument = new userModel({
                _id: 'mockUserId',
                email: 'testuser',
                password: 'hashedTestPassword', // The actual implementation would hash the password
            });
        
            // Mock the findOne method of the userModel to return the mockUser
            jest.spyOn(userModel, 'findOne').mockResolvedValue(mockUser);

            // Mock the jwtService to return a token
            jest.spyOn(jwtService, 'sign').mockReturnValue('mockToken');

            // Mocked response object
            const mockResponse: any = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };
        
            // Call the login function with mocked arguments
            await service.login(mockResponse, payload);

            // Verify that the response methods were called with the expected parameters
            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
            expect(mockResponse.json).toHaveBeenCalledWith({ accessToken: 'mockToken' });

            // Verify that the userModel.findOne method was called with the correct parameters
            expect(userModel.findOne).toHaveBeenCalledWith({ email: payload.email });
        });
    });
});
