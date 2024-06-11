import { Api } from "../axios-config";

interface List {
    id: number,
    name: string,
    description: string,
    imageUrl: string,
    createdAt: string
}
export const updateItems = async (item: List, id: number): Promise<List[] | Error> => {
    try{
        const { data } = await Api.put(`/items/${id}`, item);
        
        if(data)
            return data;
        else
            return new Error('Credenciais inválidas')

    } catch (error) {
        console.error(error)
        return new Error((error as { message: string}).message || 'Login error.')
    }
};