import { useEffect, useState } from "react";
import { useMyContext } from "../../context/myContext";
import { getItems } from "../../api/getItems";
import { addCardAPI } from "../../api/addCard";
import { getTrades } from "../../api/getTrades";

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

const useTrades = () => {
    const [trades, setTrades] = useState<Trades[]>([])
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchData = async () => {
        try{
            const response = await getTrades(6, currentPage)
            if(!(response instanceof Error)){
                setTrades(response);
            }
        }catch(error){
            console.error(error)
            alert(error)
        }
    }

    const addCard = async (id: string) => {
        try{
            await addCardAPI(id);
            alert("Item added");
        }catch(error){
            console.error(error)
        }
    };

    useEffect(() => {
        fetchData();
        setIsLoaded(false)
    },[currentPage]);

    useEffect(() => {
        console.log(isLoaded)
    }, [isLoaded])
    

    return { trades, addCard, currentPage, setCurrentPage, fetchData, isLoaded, setIsLoaded }
}

export default useTrades;