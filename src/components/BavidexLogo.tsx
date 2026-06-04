import React from 'react';

interface BavidexLogoProps extends React.SVGProps<SVGSVGElement> {
  variant?: 'standard' | 'red-white';
  className?: string;
  style?: React.CSSProperties;
}

export default function BavidexLogo(props: BavidexLogoProps) {
  const { variant = 'standard', className, ...rest } = props;
  const isRedWhite = variant === 'red-white';

  const bgColor = isRedWhite ? '#DC2626' : '#FFFFFF';
  const maleColor = isRedWhite ? '#FFFFFF' : '#18181B';
  const femaleColor = isRedWhite ? '#FFFFFF' : '#DC2626';
  const strokeColor = isRedWhite ? 'none' : '#E4E4E7';
  const textColorPrimary = isRedWhite ? '#FFFFFF' : '#09090B';
  const textColorSecondary = isRedWhite ? '#FFFFFF' : '#18181B';
  const barbellSteelColor = isRedWhite ? '#FFFFFF' : '#09090B';
  const barbellPlatesColor1 = isRedWhite ? '#FFFFFF' : '#09090B';
  const barbellPlatesColor2 = isRedWhite ? '#FFFFFF' : '#18181B';
  const barbellVColor = isRedWhite ? '#FFFFFF' : '#DC2626';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 400"
      width="100%"
      height="105%"
      className={className}
      {...rest}
    >
      {/* 1. Circular background tag */}
      <circle cx="200" cy="200" r="190" fill={bgColor} stroke={strokeColor} strokeWidth={isRedWhite ? "0" : "2"} />

      {/* 2. Male Silhouette (Left Side) */}
      <g id="male-silhouette" fill={maleColor}>
        {/* Head & Neck */}
        <path d="M 185,100 C 182,90 174,80 162,81 C 150,82 148,95 152,108 C 155,118 163,123 172,123 C 175,123 178,121 180,119 C 181,123 184,127 188,131 L 180,145 C 170,143 162,148 158,155 L 157,175 C 160,185 165,190 172,190 L 176,145 L 186,138 Z" />
        
        {/* Flexing arm and major bicep */}
        <path d="M 160,110 C 145,110 120,115 105,130 C 95,140 90,155 78,170 C 74,175 74,185 82,192 C 90,200 102,194 107,185 L 121,158 C 121,158 126,170 137,176 C 148,182 165,183 172,175 C 176,170 175,150 172,138 C 170,128 168,110 160,110 Z" />
        <path d="M 85,175 C 80,165 83,148 93,142 C 103,136 113,145 113,155 C 113,165 92,185 85,175 Z" />

        {/* Strong male chest, shoulders and back torso */}
        <path d="M 175,136 C 162,138 152,143 152,154 C 152,165 158,178 165,200 C 166,203 167,208 165,214 L 172,214 C 175,195 180,175 180,154 C 180,143 178,137 175,136 Z" />
      </g>

      {/* 3. Female Silhouette (Right Side) */}
      <g id="female-silhouette" fill={femaleColor}>
        {/* Head, Neck, & High Ponytail */}
        <path d="M 215,100 C 218,90 226,80 238,81 C 250,82 252,95 248,108 C 245,118 237,123 228,123 C 225,123 222,121 220,119 C 219,123 216,127 212,131 L 220,145 C 230,143 238,148 242,155 L 243,175 C 240,185 235,190 228,190 L 224,145 L 214,138 Z" />
        {/* High dynamic ponytail arching backwards */}
        <path d="M 245,95 C 255,90 270,95 273,110 C 275,120 265,135 258,145 C 255,148 250,148 249,142 C 248,135 253,125 253,115 C 253,105 249,98 245,95 Z" />
        
        {/* Flexing arm and bicep */}
        <path d="M 240,110 C 255,110 280,115 295,130 C 305,140 310,155 322,170 C 326,175 326,185 318,192 C 310,200 298,194 293,185 L 279,158 C 279,158 274,170 263,176 C 252,182 235,183 228,175 C 224,170 225,150 228,138 C 230,128 232,110 240,110 Z" />
        <path d="M 315,175 C 320,165 317,148 307,142 C 297,136 287,145 287,155 C 287,165 308,185 315,175 Z" />

        {/* Torso */}
        <path d="M 225,136 C 238,138 248,143 248,154 C 248,165 242,178 235,200 C 234,203 233,208 235,214 L 228,214 C 225,195 220,175 220,154 C 220,143 222,137 225,136 Z" />
      </g>

      {/* Background architectural framing lines matching the prompt image */}
      <path d="M 70,125 L 140,125 L 160,170 L 100,205 Z" fill="none" stroke={isRedWhite ? "#FFFFFF" : "#27272A"} strokeWidth="3" strokeDasharray="3,3" opacity={isRedWhite ? "0.35" : "0.4"} />
      <path d="M 330,125 L 260,125 L 240,170 L 300,205 Z" fill="none" stroke={isRedWhite ? "#FFFFFF" : "#27272A"} strokeWidth="3" strokeDasharray="3,3" opacity={isRedWhite ? "0.35" : "0.4"} />

      {/* 4. BAVIDEX Brand Text Labels inside SVG */}
      <text
        x="200"
        y="245"
        textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Space Grotesk', sans-serif"
        fontWeight="900"
        fontSize="38"
        letterSpacing="1"
        fill={textColorPrimary}
      >
        BAVIDEX
      </text>

      <text
        x="200"
        y="272"
        textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Space Grotesk', sans-serif"
        fontWeight="800"
        fontSize="14.5"
        letterSpacing="4"
        fill={textColorSecondary}
      >
        FITNESS STORE
      </text>

      {/* 5. Barbell with intersection line art */}
      <g id="vector-barbell">
        {/* Steel core shaft line */}
        <line x1="98" y1="324" x2="302" y2="324" stroke={barbellSteelColor} strokeWidth="7" strokeLinecap="round" />
        
        {/* Left load sleeves & plates */}
        <rect x="94" y="306" width="6" height="36" rx="2" fill={isRedWhite ? "#FFFFFF" : "#27272A"} opacity={isRedWhite ? "0.7" : "1"} />
        <rect x="106" y="296" width="10" height="56" rx="3.5" fill={barbellPlatesColor1} />
        <rect x="118" y="290" width="12" height="68" rx="4.5" fill={barbellPlatesColor2} />
        <rect x="132" y="290" width="12" height="68" rx="4.5" fill={barbellPlatesColor1} />

        {/* Right load sleeves & plates */}
        <rect x="300" y="306" width="6" height="36" rx="2" fill={isRedWhite ? "#FFFFFF" : "#27272A"} opacity={isRedWhite ? "0.7" : "1"} />
        <rect x="284" y="296" width="10" height="56" rx="3.5" fill={barbellPlatesColor1} />
        <rect x="270" y="290" width="12" height="68" rx="4.5" fill={barbellPlatesColor2} />
        <rect x="256" y="290" width="12" height="68" rx="4.5" fill={barbellPlatesColor1} />

        {/* Center collars */}
        <rect x="146" y="314" width="7" height="20" rx="1.5" fill={barbellPlatesColor1} />
        <rect x="247" y="314" width="7" height="20" rx="1.5" fill={barbellPlatesColor1} />

        {/* "V"-Shape overlap design elements */}
        <path
          d="M 170,285 L 200,358 L 230,285"
          fill="none"
          stroke={barbellVColor}
          strokeWidth="8.5"
          strokeLinecap="miter"
          strokeLinejoin="miter"
        />
      </g>
    </svg>
  );
}
