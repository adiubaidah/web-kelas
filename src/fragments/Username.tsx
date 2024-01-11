import {motion} from "framer-motion"


function Username({name, jabatan} : {name: string, jabatan: string}) {
  return (
    <motion.div initial={{opacity: 0, y: 300}} whileInView={{opacity: 1, y:0}} transition={{duration: 0.8, ease: "backOut",}} viewport={{once: true}}>
        <div className="block rounded-full bg-second"></div>
        <div>
            <h4 className="md:text-lg font-medium">{name}</h4>
            <span className="text-sm font-medium leading-normal text-second block mt-2">{jabatan}</span>
        </div>
    </motion.div>
  )
}

export default Username