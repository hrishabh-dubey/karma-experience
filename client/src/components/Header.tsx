import logoImg from "@assets/logo.png";

export function Header() {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <img 
            src={logoImg} 
            alt="The Karma Compass" 
            className="h-20 w-auto object-contain"
          />
        </div>
      </div>
    </header>
  );
}
