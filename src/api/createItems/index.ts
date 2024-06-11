import { Api } from "../axios-config";

interface List {
    id: number,
    name: string,
    description: string,
    imageUrl: string,
    createdAt: string
}

export const createItems = async (item: List): Promise<List[] | Error> => {
    try{
        const { data } = await Api.post('/items', item);
        
        if(data)
            return data;
        else
            return new Error('Credenciais inválidas')

    } catch (error) {
        console.error(error)
        return new Error((error as { message: string}).message || 'Login error.')
    }
};