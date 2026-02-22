import logoImg from "@assets/logo.png";

export function Header() {
  return (
    <header className="w-full pt-8 pb-4">
      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Om Symbol Top Center */}
        <div className="flex justify-center mb-2">
          <span className="text-5xl text-[#5c3d2e] opacity-80 select-none">ॐ</span>
        </div>

        <div className="flex items-center justify-center relative py-4">
          {/* Logo Left-ish but aligned with title */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:block">
            <img 
              src={logoImg} 
              alt="Logo" 
              className="h-28 w-auto object-contain drop-shadow-md"
            />
          </div>

          {/* Title and Tagline Center */}
          <div className="text-center">
            <h1 className="text-5xl font-bold text-[#5c3d2e] mb-2 tracking-tight">
              The Karma Compass
            </h1>
            <p className="text-[#8b5e3c] text-xl italic font-medium">
              Share Your Karma & Enlighten the Journey
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
