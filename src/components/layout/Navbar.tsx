import { NavLink, useLocation } from "react-router-dom"
import { navLinks } from "../../constant"

function Navbar() {

  const location = useLocation()

  return (
    <header className={`container max-w-full flex justify-between py-[45px] ${location.pathname === "/" ? "absolute": ""} z-20`}>
      <h1 className="font-lemon text-xl">T1 A 2022</h1>
      <ul className="flex gap-x-[40px]">
        {
          navLinks.map((item, index) => (
            <li key={index}><NavLink to={item.link} className={({isActive} : {isActive: boolean}) => (`${isActive ? 'text-yellow-200': 'text-second'} leading-7`)}>{item.name}</NavLink></li>
          ))
        }
      </ul>
    </header>
  )
}

export default Navbar