import logoImg from "@assets/logo.png";

export function Header() {
  return (
    <header className="w-full pt-8 pb-4">
      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Om Symbol Top Center */}
        <div className="flex justify-center mb-2">
          <span className="text-3xl sm:text-4xl lg:text-5xl text-[#5c3d2e] opacity-80 select-none">ॐ</span>
        </div>

        <div className="flex flex-row items-center justify-center gap-4 py-4">
          <img 
            src={logoImg} 
            alt="Logo" 
            className="h-12 sm:h-16 md:h-28 w-auto object-contain drop-shadow-md flex-shrink-0"
          />
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#5c3d2e] mb-1 sm:mb-2 tracking-tight">
              The Karma Compass
            </h1>
            <p className="text-[#8b5e3c] text-sm sm:text-base md:text-lg lg:text-xl italic font-medium">
              Find all your answers here
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
