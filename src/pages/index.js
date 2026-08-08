import Head from 'next/head';
import { Box, Heading, Text } from "@chakra-ui/react";
import { motion } from 'framer-motion';

import StarField from '@/components/StarField';
import ProjectListCard, { getTileSize } from '@/components/ProjectListCard';


export async function getStaticProps() {
    const res = await fetch('https://api-barbarpotato.vercel.app/projects');
    if (!res.ok) return { props: { projects: [] } };

    const { data } = await res.json();
    return { props: { projects: data || [] } };
}


export default function ProjectsIndex({ projects }) {
    return (
        <>
            <Head>
                <link rel="icon" href="/Projects/Avatar.ico" />
                <title>Darmawan Jr - Proyek</title>
                <meta name="description" content="Kumpulan proyek yang telah dikembangkan oleh Darmawan Jr, mulai dari aplikasi mobile, platform web, hingga sistem internal perusahaan." />
                <meta property="og:title" content="Darmawan Jr - Proyek" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://barbarpotato.github.io/Projects/" />
            </Head>

            <Box minH="100vh" bg="#ffffff" position="relative">

                {/* ── Hero ── */}
                <Box position="relative" overflow="hidden" borderBottom="1px solid rgba(0, 0, 0, 0.12)">
                    <Box position="absolute" inset={0} overflow="hidden" pointerEvents="none" zIndex={0}>
                        <StarField />
                    </Box>

                    <Box position="relative" zIndex={1} py={{ base: 16, md: 24 }}>
                        <Box maxW="7xl" mx="auto" px={{ base: 4, md: 6 }}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                            >
                                <Box mb={6} lineHeight="1.3">
                                    <Heading
                                        as="h1"
                                        fontFamily="'Space Grotesk', system-ui, sans-serif"
                                        fontWeight="700"
                                        fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
                                        display="block"
                                    >
                                        <Box
                                            as="span"
                                            display="inline-block"
                                            bg="#000000"
                                            color="#ffffff"
                                            px={{ base: 3, md: 4 }}
                                            py={{ base: 0.5, md: 1 }}
                                            borderRadius="md"
                                        >
                                            Seluruh
                                        </Box>
                                    </Heading>

                                    <Heading
                                        as="span"
                                        fontFamily="'Space Grotesk', system-ui, sans-serif"
                                        fontWeight="700"
                                        fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
                                        display="block"
                                        mt={2}
                                    >
                                        <Box
                                            as="span"
                                            display="inline-block"
                                            bg="#000000"
                                            color="#ffffff"
                                            px={{ base: 3, md: 4 }}
                                            py={{ base: 0.5, md: 1 }}
                                            borderRadius="md"
                                        >
                                            Proyek
                                        </Box>
                                    </Heading>
                                </Box>

                                <Text
                                    fontFamily="'Outfit', system-ui, sans-serif"
                                    fontSize={{ base: 'md', md: 'lg' }}
                                    color="#666666"
                                    maxW="580px"
                                    lineHeight="1.85"
                                >
                                    Kumpulan proyek yang telah saya kembangkan, mulai dari aplikasi mobile,
                                    platform web, hingga sistem internal perusahaan.
                                </Text>
                            </motion.div>
                        </Box>
                    </Box>
                </Box>

                {/* ── Grid ── */}
                <Box maxW="7xl" mx="auto" py={{ base: 12, md: 16 }} px={{ base: 4, md: 6 }}>
                    {projects.length > 0 ? (
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: { base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
                                gridAutoRows: { base: '260px', sm: '240px', lg: '260px' },
                                gridAutoFlow: 'dense',
                                gap: '28px',
                            }}
                        >
                            {projects.map((project, i) => (
                                <ProjectListCard
                                    key={project.project_id}
                                    project={project}
                                    index={i}
                                    size={getTileSize(i)}
                                />
                            ))}
                        </Box>
                    ) : (
                        <Text
                            fontFamily="'Outfit', system-ui, sans-serif"
                            color="#666666"
                            textAlign="center"
                        >
                            Belum ada proyek untuk ditampilkan.
                        </Text>
                    )}
                </Box>
            </Box>
        </>
    );
}
