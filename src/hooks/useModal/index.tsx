import { createItems } from "../../api/createItems"
import { updateItems } from "../../api/updateItems"
import { useMyContext } from "../../context/myContext"
import useList from "../useList"

interface List {
    id: number,
    name: string,
    description: string,
    imageUrl: string,
    createdAt: string
}

const useModal = (show: boolean | number) => {
    const {fetchData} = useList();
    const {toDoList, setModal} = useMyContext();
    const correctItem = toDoList.find(item => item.id === show);
    const item = {name: correctItem?.name ?? '', description: correctItem?.description ?? '', imageUrl: correctItem?.imageUrl ?? ''}

    const createItem = async(values: List) => {
        if(typeof show === 'boolean'){
            try{
                await createItems(values);
                alert("Item created");
                await fetchData();
                setModal(false);
            }catch(error){
                console.error(error)
            }
        }
    }

    const updateItem = async(values: List) => {
        if(typeof show === 'number'){
            try{
                await updateItems(values, show);
                alert("Item updated");
                await fetchData();
                setModal(false);
            }catch(error){
                console.error(error)
            }
        }
    }

    return {item, createItem, updateItem}
}

export default useModal;