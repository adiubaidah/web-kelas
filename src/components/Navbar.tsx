import { NavLink } from "react-router-dom"
import { navLinks } from "../constant"

function Navbar() {

  return (
    <header className="container flex justify-between py-[45px]">
      <h1>T1 A 2022</h1>
      <ul className="flex gap-x-[40px]">
        {
          navLinks.map((item, index) => (
            <li key={index}><NavLink to={item.link} className={({isActive} : {isActive: boolean}) => (`${isActive ? 'text-white': 'text-second'} leading-7`)}>{item.name}</NavLink></li>
          ))
        }
      </ul>
    </header>
  )
}

export default Navbar