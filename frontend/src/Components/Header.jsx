import logo from  '../assets/logo2.png'

const Header = () => {
    return(
        <div className="bg-black text-white p-4 flex items-center justify-between shadow-md">
            <h1 className="text-2xl font-bold">DevNotex</h1>
            {/* <img src={logo} alt="Logo" className="h-16 w-24 rounded-2xl" /> */}
        </div>
    );
}

export default Header;
