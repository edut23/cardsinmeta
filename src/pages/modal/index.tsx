import { Formik } from "formik";
import useModal from "../../hooks/useModal";
import { useMyContext } from "../../context/myContext";
import Tooltip from "../../components/tooltip";
import Pagination from "../../components/pagination";
import useList from "../../hooks/useList";

interface ModalProps{
    show: boolean | string
}

const Modal: React.FC<ModalProps> = (show) => {
    const {offeringCard, tradeCards, tradeFunc} = useModal(show.show);
    const {toDoList, setModal} = useMyContext();
    const {currentPage, setCurrentPage} = useList();

    return(
        <div className="modal" style={show.show ? {} :  {display: "none"}}>
            <div className="modalView">
                {offeringCard &&
                <div>
                    <h2>Offering Card</h2>
                    <div className="card" key={offeringCard.id}>
                        <Tooltip text={`Description: ${offeringCard.description}\nCreated: ${new Date(offeringCard.createdAt).toLocaleString('pt-br')}`}>
                            <img src={offeringCard.imageUrl}/>
                        </Tooltip>
                    </div>
                </div> 
                }
                <div>
                    <h2>Receiving Card</h2>
                    <div className="tradeCardsDiv">
                        {tradeCards.map((item) => (item.name && item.imageUrl && item.id !== offeringCard?.id &&
                            <div className="card" key={item.id}>
                                <Tooltip text={`Description: ${item.description}\nCreated: ${new Date(item.createdAt).toLocaleString('pt-br')}`}>
                                    <img src={item.imageUrl}/>
                                </Tooltip>
                                <button onClick={() => tradeFunc(item.id)}>Receive</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;