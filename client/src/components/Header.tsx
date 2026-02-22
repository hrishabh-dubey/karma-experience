import logoImg from "@assets/logo.png";

export function Header() {
  return (
    <header className="w-full bg-background/90 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50 py-4 h-32">
      <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center relative">
        {/* Logo Left */}
        <div className="flex-shrink-0 absolute left-6">
          <img 
            src={logoImg} 
            alt="The Karma Compass" 
            className="h-20 w-auto object-contain drop-shadow-sm"
          />
        </div>

        {/* Title Center */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-2xl text-primary/80 animate-pulse">
              ॐ
            </div>
            <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full scale-150 -z-10" />
            <h1 className="text-4xl font-bold text-primary drop-shadow-sm">
              The Karma Compass
            </h1>
            <p className="text-muted-foreground italic font-medium mt-1">
              "Share Your Karma & Enlighten the Journey"
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
