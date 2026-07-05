import { Box, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import Link from 'next/link';

// Bento-style size pattern: mostly small tiles, occasional wide/tall ones for asymmetry
const SIZE_PATTERN = ['lg', 'sm', 'sm', 'md', 'sm', 'sm', 'md', 'sm'];

export function getTileSize(index) {
    return SIZE_PATTERN[index % SIZE_PATTERN.length];
}

const SPAN = {
    lg: { gridColumn: { base: 'span 1', sm: 'span 2' }, gridRow: { base: 'span 1', sm: 'span 2' } },
    md: { gridColumn: { base: 'span 1', sm: 'span 1' }, gridRow: { base: 'span 1', sm: 'span 2' } },
    sm: { gridColumn: { base: 'span 1', sm: 'span 1' }, gridRow: { base: 'span 1', sm: 'span 1' } },
};

function ProjectListCard({ project, index = 0, size = 'sm' }) {
    const href = `/${project.slug}`;

    return (
        <Box sx={SPAN[size]} h="100%">
            <Link href={href} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                <Box className="masonry-tile" h="100%" display="flex" flexDirection="column">
                    {/* Only the image animates in on scroll — caption stays fully visible */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5, ease: 'easeOut', delay: (index % 6) * 0.07 }}
                        style={{ flex: '1 1 auto', minHeight: 0 }}
                    >
                        <Box
                            className="masonry-tile-image"
                            position="relative"
                            borderRadius="xl"
                            overflow="hidden"
                            h="100%"
                        >
                            <img src={project.imageUrl} alt={project.heading} />
                            <Box className="masonry-tile-overlay">
                                <Box className="masonry-tile-arrow">
                                    <FiArrowUpRight size={17} />
                                </Box>
                            </Box>
                        </Box>
                    </motion.div>

                    <Text
                        mt={3}
                        className="masonry-tile-title"
                        fontFamily="'Playfair Display', Georgia, serif"
                        fontWeight="700"
                        fontSize="lg"
                        color="#faf9ff"
                        noOfLines={1}
                        flexShrink={0}
                    >
                        {project.heading}
                    </Text>

                    <Text
                        mt={1}
                        fontFamily="'Outfit', system-ui, sans-serif"
                        fontWeight="500"
                        fontSize="xs"
                        letterSpacing="0.08em"
                        textTransform="uppercase"
                        color="#866bab"
                        flexShrink={0}
                    >
                        Studi Kasus Proyek
                    </Text>
                </Box>
            </Link>
        </Box>
    );
}

export default ProjectListCard;
