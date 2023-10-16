import { Link, NavLink } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons"
function Pagination() {
    // const queryString  = window.location.search
    // const urlParams = new URLSearchParams(queryString)
    const pages = []

    for (let i = 1; i <= 6; i++) {
        pages.push(<li key={i} className="w-8 h-8 flex justify-center items-center bg-blue-600 rounded text-white"><NavLink to="" className="font-dm leading-loose text-center">{i}</NavLink></li>)
    }
    return (
        <div className="flex">
            <ul className="flex gap-x-4 items-center">
                <Link to='' className="block w-4 h-4"><FontAwesomeIcon icon={faChevronLeft} /></Link>
                {pages}
                <Link to='' className="block w-4 h-4"><FontAwesomeIcon icon={faChevronRight} /></Link>
            </ul>
        </div>
    )
}

export default Pagination