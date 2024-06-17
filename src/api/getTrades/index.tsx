import { Api } from "../axios-config";

interface Card {
    id: string,
    name: string,
    description: string,
    imageUrl: string,
    createdAt: string
}

interface TradeCards {
    id: string,
    cardId: string,
    tradeId: string,
    type: string,
    card: Card
}

interface Trades {
    id: string,
    userId: string,
    createdAt: string,
    user: {
        name: string
    },
    tradeCards: TradeCards[]
}

export const getTrades = async (rpp: number, page: number): Promise<Trades[] | Error> => {
    try{
        const { data } = await Api.get(`/trades?rpp=${page === 1 ? rpp + 4 : rpp }&page=${page}`);
        
        if(data)
            return data.list;
        else
            return new Error('Credenciais inválidas')

    } catch (error) {
        console.error(error)
        return new Error((error as { message: string}).message || 'Login error.')
    }
};