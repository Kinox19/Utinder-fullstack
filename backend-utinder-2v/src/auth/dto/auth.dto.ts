import { IsEmail, MinLength, IsString } from "class-validator";

export class AuthDto{

    @IsEmail()
    email: string;

    @MinLength(1, {
        message: 'Минимальная длина пароля 6 символов',
    })
    @IsString()
    password: string;
}