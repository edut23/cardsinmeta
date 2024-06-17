import { Link } from "react-router-dom";
import Tooltip from "../../components/tooltip";
import useList from "../../hooks/useCards";
import useMyCards from "../../hooks/useMyCards";
import Loading from "../../components/loading";

const MyCards: React.FC = () => {
    const {myCards, setModal, isLoaded, setIsLoaded} = useMyCards();

    return(
        <>
            <h2>My Cards</h2>
            <div className="cardDiv">
                {myCards.map((item) => (item.name && item.imageUrl &&
                    <div className="card" style={ {display: isLoaded ? "flex" : "none"}} key={item.id}>
                        <Tooltip text={`Description: ${item.description}\nCreated: ${new Date(item.createdAt).toLocaleString('pt-br')}`}>
                            <img onLoad={() => setIsLoaded(true)} src={item.imageUrl}/>
                        </Tooltip>
                        <button onClick={() => setModal(item.id)}>Trade</button>
                    </div>
                ))}
                {!isLoaded && 
                <>
                    <Loading/>
                    <Loading/>
                    <Loading/>
                </>}
            </div>
            <button onClick={() => {localStorage.removeItem("token"); window.location.reload();}}>Exit</button>
            <Link to="/cards"><button>Cards</button></Link>
            <Link to="/trades"><button>Trades</button></Link>
        </>
    )
}

export default MyCards;