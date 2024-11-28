import axios from "axios";
import { config } from "@/utils/config";
import { Roles } from "@/utils/enums";
import { setCookie, deleteCookie } from "@/app/actions";

export const register = async (companyName: string, userName: string, email: string, password: string, role: Roles | string) => {
    try {
        const response = await axios.post(`${config.BASE_API_URL}/auth/register`, { companyName, userName, email, password, role });

        return {
            response: response.data.message
        };
    } catch (error: any) {
        return {
            error: error.response.data.message
        };
    }
}

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${config.BASE_API_URL}/auth/login`, { email, password });

        await setCookie('jwt_token', response.data.accessToken);

        return {
            response: response.data.message,
            role: response.data.user.role,
        };
    } catch (error: any) {
        return {
            error: error.response.data.message
        };
    }
}

export const requestOtp = async (email: string) => {
    try {
        const response = await axios.post(`${config.BASE_API_URL}/auth/request-otp`, { email });

        return {
            response: response.data.message
        };
    } catch (error: any) {
        return {
            error: error.response.data.message
        };
    }
}

export const resetPassword = async (otp: string, email: string, password: string) => {
    try {
        const response = await axios.post(`${config.BASE_API_URL}/auth/reset-password`, { otp, email, password });

        return {
            response: response.data.message
        };
    } catch (error: any) {
        console.log(error);
        return {
            error: error.response.data.message
        };
    }
}

export const logout = async () => {
    await deleteCookie('jwt_token');
}
