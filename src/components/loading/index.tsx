import React from "react"
import magicCard from "../../assets/magicCard.png"
import "./index.css"

const Loading: React.FC = () => {
    return(
        <div className="loading">
            <img className="loadingImg" src={magicCard}/>
        </div>
    )
}

export default Loading;