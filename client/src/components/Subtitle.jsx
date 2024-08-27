import { Link } from "react-router-dom"
import "../css/components/Subtitle.css"

export function Subtitle({text}){
    return(
        <div className="subtitle-container">
            <p className="subtitle-text">{text}</p>
            <Link className="subtitle-link">See all</Link>
        </div>
    )
}