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
                <link rel="icon" href="https://firebasestorage.googleapis.com/v0/b/personal-blog-darmajr.appspot.com/o/portofolio%2Fadmin%2FAvatar.svg?alt=media&token=622405c3-9dff-4483-af0c-ddc95fbe6445" />
                <title>Darmawan Jr - Proyek</title>
                <meta name="description" content="Kumpulan proyek yang telah dikembangkan oleh Darmawan Jr, mulai dari aplikasi mobile, platform web, hingga sistem internal perusahaan." />
                <meta property="og:title" content="Darmawan Jr - Proyek" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://barbarpotato.github.io/Projects/" />
            </Head>

            <Box minH="100vh" bg="#292b37" position="relative">

                {/* ── Hero ── */}
                <Box position="relative" overflow="hidden" borderBottom="1px solid rgba(134, 107, 171, 0.12)">
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
                                <Box mb={6} lineHeight="1.2">
                                    <Heading
                                        as="h1"
                                        fontFamily="'Playfair Display', Georgia, serif"
                                        fontWeight="800"
                                        fontStyle="italic"
                                        fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
                                        color="#faf9ff"
                                        display="block"
                                    >
                                        Seluruh
                                    </Heading>

                                    <Box display="inline-block" position="relative" mt={1}>
                                        <Heading
                                            as="span"
                                            fontFamily="'Playfair Display', Georgia, serif"
                                            fontWeight="800"
                                            fontStyle="italic"
                                            fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
                                            color="#faf9ff"
                                            display="inline"
                                        >
                                            Proyek
                                        </Heading>
                                        <svg
                                            viewBox="0 0 200 14"
                                            style={{
                                                position: 'absolute',
                                                bottom: '-10px',
                                                left: 0,
                                                width: '100%',
                                                overflow: 'visible',
                                                pointerEvents: 'none',
                                            }}
                                        >
                                            <path
                                                d="M 4,7 C 50,1 150,1 196,7"
                                                fill="none"
                                                stroke="#cc7bc9"
                                                strokeWidth="3.5"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </Box>
                                </Box>

                                <Text
                                    fontFamily="'Outfit', system-ui, sans-serif"
                                    fontSize={{ base: 'md', md: 'lg' }}
                                    color="#c0c0c0"
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
                            color="#c0c0c0"
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
