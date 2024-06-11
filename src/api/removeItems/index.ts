import { Api } from "../axios-config";

export const removeItemsAPI = async (id: number): Promise<string | Error> => {
    try{
        const { data } = await Api.delete(`/items/${id}`);
        
        if(data)
            return data;
        else
            return new Error('Credenciais inválidas')

    } catch (error) {
        console.error(error)
        return new Error((error as { message: string}).message || 'Register error.')
    }
};