import Card from "./components/Card"
function Members() {
    return (
        <div className="container max-w-full">
            <div className="grid grid-cols-3 gap-7">
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    )
}

export default Members