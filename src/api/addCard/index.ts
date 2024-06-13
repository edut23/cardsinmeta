import { Api } from "../axios-config";

export const addCardAPI = async (item: string): Promise<string | Error> => {
    try{
        const { data } = await Api.post('/me/cards', {"cardIds": [item]});
        
        if(data)
            return data;
        else
            return new Error('Credenciais inválidas')

    } catch (error) {
        console.error(error)
        return new Error((error as { message: string}).message || 'Login error.')
    }
};