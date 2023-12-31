import { getContentType } from "@/app/api/api.helper"
import { saveToStorage } from "./auth.helper"
import Cookies from "js-cookie"
import axios from "axios"
import { IAuthResponse, IEmailPassword } from "@/app/store/user/user.interface"
import { instance } from "@/app/api/api.interceptor"

export const AuthService = {

    async main(type: 'login' | 'register', data: IEmailPassword){
        const responce = await instance<IAuthResponse>({
            url: `/auth/${type}`,
            method: 'POST',
            data
        })

        if(responce.data.accessToken) saveToStorage(responce.data)
        return responce.data
    },



    async getNewTokens(){
        const refreshToken = Cookies.get('refresh-token')
        const response = await axios.post<string, {data:
        IAuthResponse}>(
            process.env.SERVER_URL + '/auth/login/access-token',
            {refreshToken},
            {
                headers: getContentType()
            }
        )
        if (response.data.accessToken) saveToStorage(response.data)
        return response
    }
}