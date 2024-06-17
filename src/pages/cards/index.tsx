import { Link } from "react-router-dom";
import Tooltip from "../../components/tooltip";
import useList from "../../hooks/useCards";
import Pagination from "../../components/pagination";
import Loading from "../../components/loading";
import useCards from "../../hooks/useCards";

const Cards: React.FC = () => {
    const {toDoList, addCard, currentPage, setCurrentPage, isLoaded, setIsLoaded} = useCards();

    return(
        <>
            <h2>Cards Market</h2>
            <div className="cardDiv">
                {toDoList.map((item) => (item.name && item.imageUrl &&
                    <div style={ {display: isLoaded ? "flex" : "none"}} className="card" key={item.id}>
                        <Tooltip text={`Description: ${item.description}\nCreated: ${new Date(item.createdAt).toLocaleString('pt-br')}`}>
                            <img onLoad={() => setIsLoaded(true)} src={item.imageUrl}/>
                        </Tooltip>
                        <button onClick={() => addCard(item.id)}>Add</button>
                    </div>
                ))}
                {!isLoaded && 
                <>
                    <Loading/>
                    <Loading/>
                    <Loading/>
                    <Loading/>
                    <Loading/>
                    <Loading/>
                </>}
            </div>
            <Pagination currentPage={currentPage} onPageChange={setCurrentPage}/>
            <button onClick={() => {localStorage.removeItem("token"); window.location.reload();}}>Exit</button>
            <Link to="/mycards"><button>My Cards</button></Link>
            <Link to="/trads"><button>Trades</button></Link>
        </>
    )
}

export default Cards;