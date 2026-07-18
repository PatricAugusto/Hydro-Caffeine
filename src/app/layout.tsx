import StyledComponentsRegistry from '@/lib/registry';
import { Providers } from './providers';
import { Bangers, Space_Grotesk, JetBrains_Mono } from 'next/font/google';

const bangers = Bangers({ weight: '400', subsets: ['latin'], variable: '--font-display' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-body' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${bangers.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}