
const Appbar=()=>{
    return(
        <div className="flex w-full  justify-between px-6 items-center py-4 shadow-md">
            <div className="text-xl font-bold uppercase tracking-wide text-slate-950">
                Trixity
            </div>
            <div>
            <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Connect Your Wallet</button>
            </div>
        </div>
    )   
}

export default Appbar;