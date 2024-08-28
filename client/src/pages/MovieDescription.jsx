import { useParams } from "react-router-dom"
import { ReturnHeader } from "../components/ReturnHeader"

export function MovieDescription(){

    const { idPeli } = useParams()

    return (
        <ReturnHeader />
    )
}