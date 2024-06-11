import { useEffect } from "react";
import { useMyContext } from "../../context/myContext";
import { getItems } from "../../api/getItems";
import { removeItemsAPI } from "../../api/removeItems";

const useList = () => {
    const {toDoList, setToDoList, setModal} = useMyContext();

    const fetchData = async () => {
        try{
            const response = await getItems(6, 1);
            if(!(response instanceof Error)){
                setToDoList(response);
            }
        }catch(error){
            console.error(error)
            alert(error)
        }
    }

    const removeItem = async (id: number) => {
        try{
            await removeItemsAPI(id);
            alert("Item deleted")
            fetchData();
        }catch(error){
            console.error(error)
        }
    };

    useEffect(() => {
        fetchData();
    },[]);
    

    return { toDoList, removeItem, setModal, fetchData }
}

export default useList;