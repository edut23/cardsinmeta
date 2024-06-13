import { Api } from "../axios-config";


export const tradeCardsAPI = async (ofCardId: string, reCardId: string): Promise<string | Error> => {

    try{
        const { data } = await Api.post(`/trades`, {
                cards: [
                    {
                        cardId: ofCardId,
                        type: "OFFERING",
                    },
                    {
                        cardId: reCardId,
                        type: "RECEIVING"
                    }
                ]
            }
        );
        
        if(data)
            return data;
        else
            return new Error('Credenciais inválidas')

    } catch (error) {
        console.error(error)
        return new Error((error as { message: string}).message || 'Login error.')
    }
};