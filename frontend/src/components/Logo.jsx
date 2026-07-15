import React from 'react';

/**
 * Premium Unified Logo Component for StackKraft
 * Renders the official SK split geometric logo system with transparent backgrounds,
 * sharp vector curves, and premium startup styling. Uses a single premium dark-mode theme.
 */
const Logo = ({ variant = 'main', className = 'w-9 h-9' }) => {
  // SVG Icon representing the geometric 'SK' shape cut by a diagonal blue slash
  const LogoIcon = ({ iconClass, isMono = false }) => {
    const letterColor = '#ffffff';
    const slashColor = isMono ? '#ffffff' : '#0066ff';

    return (
      <svg 
        className={`${iconClass} transition-transform duration-300 group-hover:scale-105`} 
        viewBox="0 0 160 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {/* Channel Mask to cut S and K with perfect spacing parallel to the slash */}
          <mask id="sk-cut-mask-unified">
            <rect width="160" height="100" fill="white" />
            <line x1="40" y1="85" x2="120" y2="15" stroke="black" strokeWidth="12" />
          </mask>
        </defs>

        {/* Masked Letters */}
        <g mask="url(#sk-cut-mask-unified)">
          {/* Geometric S Path */}
          <path 
            d="M 68 33 C 68 27, 63 24, 56 24 C 48 24, 44 28, 44 34 C 44 42, 52 44, 59 47 C 67 49, 72 53, 72 61 C 72 70, 65 76, 54 76 C 43 76, 38 70, 38 62 L 46 62 C 46 67, 50 70, 54 70 C 60 70, 64 67, 64 61 C 64 54, 58 52, 50 49 C 42 46, 36 43, 36 34 C 36 25, 43 18, 56 18 C 67 18, 70 26, 70 33 Z" 
            fill={letterColor} 
          />
          {/* Geometric K Path */}
          <path 
            d="M 88 18 H 95 V 45 L 112 18 H 121 L 101 48 L 122 76 H 113 L 95 52 V 76 H 88 Z" 
            fill={letterColor} 
          />
        </g>

        {/* Diagonal Slash Line */}
        <line 
          x1="43" 
          y1="82" 
          x2="117" 
          y2="18" 
          stroke={slashColor} 
          strokeWidth="6" 
          strokeLinecap="round" 
        />
      </svg>
    );
  };

  switch (variant) {
    case 'favicon':
    case 'icon':
      return <LogoIcon iconClass={className} />;

    case 'mono-black':
    case 'mono-white':
      return (
        <div className="flex items-center gap-3.5 sm:gap-4">
          <LogoIcon iconClass={className} isMono={true} />
          <span className="font-display font-black text-base sm:text-lg lg:text-xl tracking-wider text-white uppercase">
            StackKraft
          </span>
        </div>
      );

    case 'footer':
      return (
        <div className="flex items-center gap-3.5 sm:gap-4">
          <LogoIcon iconClass={className} />
          <div className="text-left">
            <span className="font-display font-black text-base sm:text-lg lg:text-xl tracking-wider text-white uppercase block leading-none">
              StackKraft
            </span>
            <span className="text-[9px] font-sans font-semibold tracking-widest text-slate-400 uppercase block mt-1.5 leading-none">
              Modern Web Solutions
            </span>
          </div>
        </div>
      );

    case 'light':
    case 'dark':
    case 'main':
    default:
      return (
        <div className="flex items-center gap-3.5 sm:gap-4">
          <LogoIcon iconClass={className} />
          <span className="font-display font-black text-base sm:text-lg lg:text-xl tracking-wider text-white uppercase transition-colors">
            StackKraft
          </span>
        </div>
      );
  }
};

export default Logo;
