import Tooltip from "../../components/tooltip";
import useList from "../../hooks/useList";

const List: React.FC = () => {
    const {toDoList, removeItem, setModal} = useList();

    return(
        <>
            <h2>Cards</h2>
            <div className="cardDiv">
                {toDoList.map((item) => (item.name && item.imageUrl &&
                        <div className="card" key={item.id}>
                            <Tooltip text={`Description: ${item.description}\nCreated: ${new Date(item.createdAt).toLocaleString('pt-br')}`}>
                                <img src={item.imageUrl}/>
                            </Tooltip>
                            <button onClick={() => setModal(item.id)}>Edit</button>
                            <button onClick={() => removeItem(item.id)}>Delete</button>
                        </div>
                ))}
            </div>
            <button onClick={() => {localStorage.removeItem("token"); window.location.reload();}}>Exit</button>
            <button onClick={() => setModal(true)}>New</button>
        </>
    )
}

export default List;