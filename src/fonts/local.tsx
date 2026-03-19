import localFont from 'next/font/local';

export const drunkText = localFont({
  src: "./local/DRUNKFONTS-Regular.otf",
  variable: "--font-drunk-text",
  weight: "400",
  display: "swap",
});

export const cracked = localFont({
  src: "./local/Cracked Code.ttf",
  variable: "--font-cracked",
  weight: "400",
  display: "swap",
});

export const blastimoSans = localFont({
  src: "./local/BLASTIMO SANS.ttf",
  variable: "--font-blastimo-sans",
  weight: "400",
  display: "swap",
});