// Core Modules
import { ChakraProvider } from "@chakra-ui/react";

// Custom Components
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

// CSS
import '../styles/globals.css';  // Import global CSS here
import '../styles/StarField.css';


function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider>
            {/* Navigation Bar */}
            <Navigation />

            {/* Render the current page */}
            <Component {...pageProps} />

            {/* Footer */}
            <Footer />

        </ChakraProvider>
    );
}

export default MyApp;
