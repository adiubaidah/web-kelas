import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationDot } from "@fortawesome/free-solid-svg-icons"

import type { Member } from "../../../types"


function Card({id, name, backgroundImage, image, instagram, tiktok}: Member) {
    
    return (
        <div className="bg-indigo-950 pt-2 px-2 pb-7 rounded-2xl" key={id}>
            <div className={`bg-[url('${backgroundImage}')] w-full h-[209px] rounded-2xl relative`}>
                <img src={image} className="w-[170px] h-[170px] rounded-full border-4 border-indigo-950 object-cover absolute top-1/2 left-1/2 -translate-x-1/2" />
            </div>
            <div className="mt-24">
                <h5 className="text-lg font-medium text-center leading-loose mb-2">{name}</h5>
                <h6 className="text-stone-300 text-center text-sm font-bold font-dm leading-normal"><FontAwesomeIcon icon={faLocationDot} className="me-2"/> Lumajang</h6>
            </div>
            <div className="flex justify-center gap-x-9 mt-6">
                <a href="" className="leading-loose font-dm font-bold text-center">{instagram}</a>
                <a href="" className="leading-loose font-dm font-bold text-center">{tiktok}</a>
            </div>
            <Link to='/' className="mt-6 mx-auto w-fit block h-12 px-14 py-2 rounded-lg border border-white hover:border-blue-600 hover:bg-blue-600 font-bold font-dm leading-loose">Lihat Profile</Link>
        </div>
    )
}

export default Card