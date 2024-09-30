// eslint-disable-next-line react/prop-types
const Loader = ({ height }) => {
    return (
        <div className={`h-[${height}] w-full  items-center justify-center flex flex-col gap-2`}>
            <div className="w-8 h-8 border-2 border-transparent border-t-green-700 border-r-green-700 rounded-full animate-spin"></div>
            <h2 className="text-xl font-semibold text-green-600">Loading...</h2>
        </div >
    )
}

export default Loader