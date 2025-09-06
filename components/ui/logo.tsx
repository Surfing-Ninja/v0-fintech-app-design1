interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "full" | "icon" | "text"
  className?: string
}

export function Logo({ size = "md", variant = "full", className = "" }: LogoProps) {
  const sizeClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-12",
    xl: "h-16",
  }

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  }

  const LogoIcon = () => (
    <div className="relative">
      <svg viewBox="0 0 40 40" className={`${sizeClasses[size]} w-auto`} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="50%" stopColor="#0891b2" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>

        {/* Shield Base */}
        <path
          d="M20 2L32 8V18C32 26 26 32 20 36C14 32 8 26 8 18V8L20 2Z"
          fill="url(#logoGradient)"
          className="drop-shadow-lg"
        />

        {/* Infinity Loop */}
        <path
          d="M14 20C14 17.5 15.5 16 17 16C18.5 16 19.5 17 20 18C20.5 17 21.5 16 23 16C24.5 16 26 17.5 26 20C26 22.5 24.5 24 23 24C21.5 24 20.5 23 20 22C19.5 23 18.5 24 17 24C15.5 24 14 22.5 14 20Z"
          fill="white"
          fillOpacity="0.9"
        />

        {/* Growth Bars */}
        <rect x="16" y="26" width="2" height="4" fill="url(#accentGradient)" rx="1" />
        <rect x="19" y="24" width="2" height="6" fill="url(#accentGradient)" rx="1" />
        <rect x="22" y="22" width="2" height="8" fill="url(#accentGradient)" rx="1" />

        {/* Subtle Glow Effect */}
        <circle cx="20" cy="20" r="18" fill="none" stroke="url(#logoGradient)" strokeWidth="0.5" opacity="0.3" />
      </svg>
    </div>
  )

  if (variant === "icon") {
    return <LogoIcon />
  }

  if (variant === "text") {
    return (
      <span
        className={`font-bold text-white ${textSizeClasses[size]} ${className}`}
        style={{
          background: "linear-gradient(135deg, #00d4ff 0%, #06b6d4 50%, #0891b2 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Credence
      </span>
    )
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoIcon />
      <span
        className={`font-bold text-white ${textSizeClasses[size]}`}
        style={{
          background: "linear-gradient(135deg, #00d4ff 0%, #06b6d4 50%, #0891b2 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Credence
      </span>
    </div>
  )
}
