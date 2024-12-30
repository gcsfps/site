import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '../contexts/AuthContext';
import { ToastProvider } from '../contexts/ToastContext';
import CustomCursor from '../components/ui/CustomCursor';

const inter = Inter({ subsets: ['latin'] });

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <AuthProvider>
        <ToastProvider>
          <main className={inter.className}>
            <CustomCursor />
            <Component {...pageProps} />
          </main>
        </ToastProvider>
      </AuthProvider>
    </SessionProvider>
  );
}

export default MyApp;
