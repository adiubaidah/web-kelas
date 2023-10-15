function Line({className} : {className: string}) {
  return (
    <span className={'bg-white h-[2px] block '+ className}></span>
  )
}

export default Line