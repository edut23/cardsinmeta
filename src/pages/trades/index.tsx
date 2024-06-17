import { Link } from "react-router-dom";
import Tooltip from "../../components/tooltip";
import useList from "../../hooks/useCards";
import Pagination from "../../components/pagination";
import Loading from "../../components/loading";
import useTrades from "../../hooks/useTrades";

const Trades: React.FC = () => {
    const {trades, addCard, currentPage, setCurrentPage, isLoaded, setIsLoaded} = useTrades();

    return(
        <>
            <h2>MarketTrade</h2>
            <div className="cardDiv">
                {trades.map((item) => 
                    (<>
                        <h2>{item.user.name}</h2>
                        {item.tradeCards.map(cards => 
                        (cards.card.name && cards.card.imageUrl &&
                        <div style={ {display: isLoaded ? "flex" : "none"}} className="card" key={cards.id}>
                            <Tooltip text={`Description: ${cards.card.description}\nCreated: ${new Date(cards.card.createdAt).toLocaleString('pt-br')}`}>
                                <img onLoad={() => setIsLoaded(true)} src={cards.card.imageUrl}/>
                            </Tooltip>
                            <button onClick={() => addCard(item.id)}>Add</button>
                        </div>))}
                    </>)
                )}
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
            <Link to="/cards"><button>Cards</button></Link>
            <Link to="/mycards"><button>My Cards</button></Link>
        </>
    )
}

export default Trades;