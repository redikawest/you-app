import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    login(): string {
        return "Login API";
    }

    register(): string {
        return "Register API";
    }
}
