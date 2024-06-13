import { Api } from "../axios-config";

interface List {
    id: string,
    name: string,
    description: string,
    imageUrl: string,
    createdAt: string
}

export const getItems = async (rpp: number, page: number): Promise<List[] | Error> => {
    try{
        const { data } = await Api.get(`/cards?rpp=${page === 1 ? rpp + 4 : rpp }&page=${page}`);
        
        if(data)
            return data.list;
        else
            return new Error('Credenciais inválidas')

    } catch (error) {
        console.error(error)
        return new Error((error as { message: string}).message || 'Login error.')
    }
};