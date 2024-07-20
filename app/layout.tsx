import Head from 'next/head';
import '@styles/global.css';
import Nav from '@components/Nav';
import {
    ClerkProvider,
} from '@clerk/nextjs';

export const metadata = {
    title: "LuxePrompt",
    description: "Discover & Share Prompts"
};
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
    children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
    return (
        <ClerkProvider>
            <html lang='en'>
                <Head>
                    <title>{metadata.title}</title>
                    <meta name="description" content={metadata.description} />
                </Head>
                <body className={inter.className}>
            
                    <div className='main'>
                        <div className='gradient' />
                    </div>
                    <main className='app'>
                        <Nav />
                      {children}
                    </main>
                </body>
            </html>
        </ClerkProvider>
    );
};

export default RootLayout;
