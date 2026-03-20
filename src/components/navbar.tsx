

function Navbar() {
    return (
    <nav className="flex flex-row justify-between items-center px-6 py-3">
            <a id="logo" href="/" className="text-2xl font-bold tracking-tighter text-white hover:opacity-80 transition-opacity">
                ClearFrame
            </a>
            <div className="hidden sm:flex flex-row gap-8 items-center text-sm font-medium text-gray-400">
                <a href="/chat" className="hover:text-white transition-colors">Chat</a>
                <a href="/login" className="hover:text-white transition-colors">Login</a>
                <a href="/extenstion" className="px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors">Get Extension</a>
            </div>
    </nav>
    )
}


export default Navbar