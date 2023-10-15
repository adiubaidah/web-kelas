import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationDot } from "@fortawesome/free-solid-svg-icons"

function Card() {
    return (
        <div className="bg-indigo-950 pt-2 px-2 pb-7 rounded-2xl">
            <div className="bg-second w-full h-[209px] rounded-2xl relative">
                <div className="w-[170px] h-[170px] rounded-full border-4 border-indigo-950 bg-second absolute top-1/2 left-1/2 -translate-x-1/2"></div>
            </div>
            <div className="mt-24">
                <h5 className="text-lg font-medium text-center leading-loose mb-2">Ahmad Adi Iskandar</h5>
                <h6 className="text-stone-300 text-center text-sm font-bold font-dm leading-normal"><FontAwesomeIcon icon={faLocationDot} className="me-2"/> Lumajang</h6>
            </div>
            <div className="flex justify-center gap-x-9 mt-6">
                <a href="" className="leading-loose font-dm font-bold text-center">instagram.com</a>
                <a href="" className="leading-loose font-dm font-bold text-center">tiktok.com</a>
            </div>
            <Link to='/' className="mt-6 mx-auto w-fit block h-12 px-14 py-2 rounded-lg border border-white hover:border-blue-600 hover:bg-blue-600 font-bold font-dm leading-loose">Lihat Profile</Link>
        </div>
    )
}

export default Card