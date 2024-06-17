import { useEffect, useState } from "react";
import { useMyContext } from "../../context/myContext";
import { getItems } from "../../api/getItems";
import { addCardAPI } from "../../api/addCard";

const useCards = () => {
    const {toDoList, setToDoList, setModal} = useMyContext();
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchData = async () => {
        try{
            const response = await getItems(6, currentPage);
            if(!(response instanceof Error)){
                setToDoList(response);
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
    

    return { toDoList, addCard, currentPage, setCurrentPage, fetchData, isLoaded, setIsLoaded }
}

export default useCards;