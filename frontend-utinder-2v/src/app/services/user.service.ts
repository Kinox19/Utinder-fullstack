import { instance } from "../api/api.interceptor";
import { IUser } from "../types/user.interface";

const USERS = 'users'

type TypeData = {
    email: string
    password?:string
    name?:string
    avatarPath?:string
}

export const UserService = {
    async getProfile(){
        return instance<IUser[]>({
            url: `${USERS}/$profile`,
            method: 'GET'
        })
    },

    async updateProfile(data: TypeData){
        return instance<IUser>({
            url: `${USERS}/profile`,
            method: 'PUT',
            data
        })
    },

    // async toggleFavorite(userLikedMeid: string | number){
    //     return instance<IUser>({
    //         url: `${USERS}/profile/likes/${userLikedMeid}`,
    //         method: 'PATCH'
    //     })
    // },
}

