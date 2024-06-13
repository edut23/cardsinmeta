import { Api } from "../axios-config";

interface List {
    id: string,
    name: string,
    description: string,
    imageUrl: string,
    createdAt: string
}

export const getMyCardsAPI = async (): Promise<List[] | Error> => {
    try{
        const { data } = await Api.get(`/me/cards`);
        
        if(data)
            return data;
        else
            return new Error('Credenciais inválidas')

    } catch (error) {
        console.error(error)
        return new Error((error as { message: string}).message || 'Login error.')
    }
};