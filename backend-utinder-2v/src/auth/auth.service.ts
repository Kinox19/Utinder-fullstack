import { BadRequestException, Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { faker } from '@faker-js/faker';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService){}

    async login (dto: AuthDto){
        const user = await this.validateUser(dto)
        const tokens = await this.createToken(user.id)
        return {
            user: this.returnUserFields(user),
            ...tokens
        }
    }

    async getNewToken (refreshToken: string){

        const result = await this.jwt.verifyAsync(refreshToken)
        if(!result) throw new UnauthorizedException('Invalid refresh token')

        const user = await this.prisma.user.findUnique({where: {
            id: result.id
        }})

        const tokens = await this.createToken(user.id)

        return {
            user: this.returnUserFields(user),
            ...tokens
        }
    }


    async register(dto: AuthDto){
        const isUserAlreadyExist = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            }
        })

        if (isUserAlreadyExist){
            throw new BadRequestException('Пользователь с таким e-mail уже существует.')
        }

        const user = await this.prisma.user.create({
            data: {
               email: dto.email,
               password: await hash(dto.password),
               name: faker.person.firstName(),
               avatarPath: faker.image.avatar(),
            }
        })


        const tokens = await this.createToken(user.id)

        return {
            user: this.returnUserFields(user),
            ...tokens
        }
    }


    private async createToken(userId: number){
        const data = {id: userId}
        const accessToken = this.jwt.sign(data, {
            expiresIn: '1h',
        })
        const refreshToken = this.jwt.sign(data, {
            expiresIn: '30d',
        })

        return {accessToken, refreshToken}
    }

    private returnUserFields(user: User){
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            avatarPath: user.avatarPath
        }
    }

    private async validateUser(dto: AuthDto){
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            }
        })

        if (!user){
            throw new NotFoundException('Пользователь с таким e-mail не существует.')
        }

        const isValidPassword = await verify(user.password, dto.password)

        if(!isValidPassword) throw new UnauthorizedException('Неправильный пароль')


        return user
    }
}

/////////////