import { Api } from "../axios-config";

interface User{
    id: string,
    name: string,
    email: string
}

interface LoginResponse {
    token: string,
    user: User
}

export const loginApi = async (email: string, password: string): Promise<LoginResponse | Error> => {
    try{
        const { data } = await Api.post('/login', {email, password});
        
        if(data)
            return data;
        else
            return new Error('Credenciais inválidas')

    } catch (error) {
        console.error(error)
        return new Error((error as { message: string}).message || 'Login error.')
    }
};