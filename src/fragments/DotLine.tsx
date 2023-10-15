

function DotLine({ className }: { className?: string }) {
    return (
        <div className={`w-fit flex flex-col items-center ` + className}>
            <span className={`bg-white w-[2px] h-[45.5px] block `}></span>
            <span className="bg-white h-2 w-2 block rounded-full"></span>
        </div>
    )
}

export default DotLine