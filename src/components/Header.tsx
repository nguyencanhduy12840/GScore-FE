const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-[#0081a7] text-white shadow-md z-[100]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Left (logo hoặc menu icon) */}
        <div className="w-[40px] flex items-center justify-start">
          {/* Add optional menu/icon here in future */}
        </div>

        {/* Center title/logo */}
        <div className="flex-1 text-center">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold">GScore</h1>
        </div>

        {/* Right (placeholder to balance layout) */}
        <div className="w-[40px] flex items-center justify-end">
          {/* Add user icon/logout button in future */}
        </div>
      </div>
    </header>
  );
};

export default Header;
