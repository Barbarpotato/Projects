// Core Modules
import { ChakraProvider } from "@chakra-ui/react";
import { motion } from "framer-motion";

// Custom Components
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// CSS
import '../styles/globals.css';  // Import global CSS here
import Darwin from "@/components/DarwinProject";


function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider>
            {/* Navigation Bar */}

            <Darwin />

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <Header />
            </motion.div>

            {/* Render the current page */}
            <Component {...pageProps} />

            {/* Footer */}
            <Footer />

        </ChakraProvider>
    );
}

export default MyApp;
