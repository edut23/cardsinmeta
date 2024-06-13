import { useEffect, useState } from "react";
import { useMyContext } from "../../context/myContext";
import { addCardAPI } from "../../api/addCard";
import { getMyCardsAPI } from "../../api/getMyCards";
import { useSearchParams } from "react-router-dom";

interface List {
    id: string,
    name: string,
    description: string,
    imageUrl: string,
    createdAt: string
}

const useMyCards = () => {
    const [myCards, setMyCards] = useState<List[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const {toDoList, setModal} = useMyContext();

    const fetchData = async () => {
        try{
            const response = await getMyCardsAPI();
            if(!(response instanceof Error)){
                setMyCards(response);
            }
        }catch(error){
            console.error(error)
            alert(error)
        }
    }

    useEffect(() => {
        fetchData();
    },[]);
    

    return { myCards, toDoList, setModal, fetchData, isLoaded, setIsLoaded }
}

export default useMyCards;