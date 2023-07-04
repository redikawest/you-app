import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsNotEmpty()
    password: string;
}