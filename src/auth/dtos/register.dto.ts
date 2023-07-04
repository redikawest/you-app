import { IsEmail, IsNotEmpty } from "class-validator";

export class RegisterDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    confirmPassword: string
}