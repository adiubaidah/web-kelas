function Username({name, jabatan, className} : {name: string, jabatan: string, className?: string}) {
  return (
    <div className={`flex gap-x-4 w-fit mt-3 md:mt-0 ${className}`}>
        <div className="hidden sm:block w-8 h-8 md:w-14 md:h-14 rounded-full bg-second"></div>
        <div>
            <h4 className="md:text-lg font-medium md:leading-loose">{name}</h4>
            <span className="text-sm font-medium leading-normal text-second block mt-2">{jabatan}</span>
        </div>
    </div>
  )
}

export default Username