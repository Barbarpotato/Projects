import { useState, useCallback, useEffect } from 'react';
import { IconButton, Text } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiZoomIn, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const ProjectGallery = ({ images }) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const isOpen = activeIndex !== null;

    const close = useCallback(() => setActiveIndex(null), []);
    const showPrev = useCallback(
        () => setActiveIndex((i) => (i - 1 + images.length) % images.length),
        [images.length]
    );
    const showNext = useCallback(
        () => setActiveIndex((i) => (i + 1) % images.length),
        [images.length]
    );

    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e) => {
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'ArrowRight') showNext();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isOpen, close, showPrev, showNext]);

    if (!images.length) return null;

    return (
        <>
            <div className="gallery">
                {images.map((src, i) => (
                    <motion.div
                        key={i}
                        className="gallery-item"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: i * 0.08 }}
                        onClick={() => setActiveIndex(i)}
                    >
                        <img src={src} alt={`Galeri proyek ${i + 1}`} />
                        <span className="gallery-item-zoom">
                            <FiZoomIn size={18} />
                        </span>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="lightbox-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={close}
                    >
                        <IconButton
                            aria-label="Tutup pratinjau"
                            icon={<FiX size={20} />}
                            onClick={(e) => { e.stopPropagation(); close(); }}
                            className="lightbox-close"
                            isRound
                            bg="rgba(41,43,55,0.8)"
                            border="1px solid rgba(134,107,171,0.4)"
                            color="#faf9ff"
                            _hover={{ bg: '#866bab' }}
                            transition="all 0.2s ease"
                        />

                        {images.length > 1 && (
                            <IconButton
                                aria-label="Gambar sebelumnya"
                                icon={<FiChevronLeft size={22} />}
                                onClick={(e) => { e.stopPropagation(); showPrev(); }}
                                className="lightbox-nav lightbox-prev"
                                isRound
                                bg="rgba(41,43,55,0.6)"
                                border="1px solid rgba(134,107,171,0.4)"
                                color="#faf9ff"
                                _hover={{ bg: '#866bab' }}
                                transition="all 0.2s ease"
                            />
                        )}

                        <motion.img
                            key={activeIndex}
                            src={images[activeIndex]}
                            alt={`Pratinjau galeri ${activeIndex + 1}`}
                            className="lightbox-image"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            onClick={(e) => e.stopPropagation()}
                        />

                        {images.length > 1 && (
                            <IconButton
                                aria-label="Gambar selanjutnya"
                                icon={<FiChevronRight size={22} />}
                                onClick={(e) => { e.stopPropagation(); showNext(); }}
                                className="lightbox-nav lightbox-next"
                                isRound
                                bg="rgba(41,43,55,0.6)"
                                border="1px solid rgba(134,107,171,0.4)"
                                color="#faf9ff"
                                _hover={{ bg: '#866bab' }}
                                transition="all 0.2s ease"
                            />
                        )}

                        {images.length > 1 && (
                            <Text
                                className="lightbox-counter"
                                fontFamily="'Outfit', system-ui, sans-serif"
                                fontSize="xs"
                                color="#c0c0c0"
                            >
                                {activeIndex + 1} / {images.length}
                            </Text>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ProjectGallery;
