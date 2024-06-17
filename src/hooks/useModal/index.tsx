import { useEffect, useState } from "react"
import { tradeCardsAPI } from "../../api/tradeCards"
import { useMyContext } from "../../context/myContext"
import useList from "../useCards"
import useMyCards from "../useMyCards"
import { getItems } from "../../api/getItems"

interface List {
    id: string,
    name: string,
    description: string,
    imageUrl: string,
    createdAt: string
}

const useModal = (show: boolean | string) => {
    const [tradeCards, setTradeCards] = useState<List[]>([]);
    const {setModal} = useMyContext();
    const {myCards} = useMyCards();
    const offeringCard = myCards.find(item => item.id === show);

    const fetchData = async () => {
        try{
            const response = await getItems(72, 1);
            if(!(response instanceof Error)){
                setTradeCards(response);
            }
        }catch(error){
            console.error(error)
            alert(error)
        }
    }


    useEffect(() => {
        if(typeof show === "string")
            fetchData();
        console.log(show)
    }, [show])


    const tradeFunc = async(cardId: string) => {
        if(typeof show === 'string'){
            try{
                await tradeCardsAPI(show, cardId)
                alert("Item updated");
                await fetchData();
                setModal(false);
            }catch(error){
                console.error(error)
            }
        }
    }

    return {offeringCard, tradeCards, tradeFunc}
}

export default useModal;