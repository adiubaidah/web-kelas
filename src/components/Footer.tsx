import { Link } from "react-router-dom"
import { navLinks, socialMedias } from "../constant"

function Footer() {
  return (
    <footer className="mt-9 py-9">
      <div className="container flex flex-col gap-y-7 md:flex-row justify-between">
        <div className="lg:w-[500px]">
          <h2 className="text-4xl">TI A PSDKU LUMAJANG</h2>
          <p className="font-dm text-[16px] mt-[32px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet tristique placerat eleifend aliquam pellentesque facilisis ultrices. Imperdiet mus urna egestas at tellus.
          </p>
        </div>

        <ul>
          <h5 className="text-lg font-medium font-noto leading-loose">Quick Links</h5>
          {
            navLinks.map((item, index) => (
              <li key={index}><Link to={item.link} className="text-base leading-7 font-dm">{item.name}</Link></li>
            ))
          }
        </ul>

        <ul>
          <h5 className="text-lg font-medium font-noto leading-loose">Sosial Media</h5>
          {
            socialMedias.map((item, index) => (
              <li key={index}><Link to={item.link} className="text-base leading-7 font-dm">{item.name}</Link></li>
            ))
          }
        </ul>
      </div>

      <div className="flex justify-center mt-12">
        <span className="block">Develop by <a href="">Ahmad Adi Iskandar Ubaidah</a></span>
      </div>
    </footer>
  )
}

export default Footer