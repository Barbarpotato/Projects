import Head from 'next/head';
import { FaArrowLeft } from 'react-icons/fa';
import {
    Box, Heading, Text, HStack, Tooltip,
} from "@chakra-ui/react";
import { Fragment } from 'react';
import { motion } from 'framer-motion';

import ProjectGallery from '@/components/ProjectGallery';


export async function getStaticPaths() {
    const res = await fetch('https://api-barbarpotato.vercel.app/projects');
    if (!res.ok) return { paths: [], fallback: false };

    const { data } = await res.json();
    return {
        paths: data.map(project => ({ params: { slug: project.slug } })),
        fallback: false
    };
}


export async function getStaticProps({ params }) {
    const res = await fetch(`https://api-barbarpotato.vercel.app/projects?slug=${params.slug}`);
    if (!res.ok) return { notFound: true };

    let project = await res.json();
    if (project.data) project = project.data[0];
    if (!project) return { notFound: true };

    return { props: { project } };
}


function formatParagraphs(text) {
    if (!text) return null;
    return text.split(/\n\s*\n/).filter(Boolean).map((paragraph, i) => (
        <p key={i}>
            {paragraph.split('\n').map((line, j, arr) => (
                <Fragment key={j}>
                    {line}
                    {j < arr.length - 1 && <br />}
                </Fragment>
            ))}
        </p>
    ));
}

function extractGalleryImages(html) {
    if (!html) return [];
    return [...html.matchAll(/<img[^>]*src="([^"]+)"/g)].map((m) => m[1]);
}

function parseSkills(skillsUrl) {
    if (!skillsUrl) return [];
    const match = skillsUrl.match(/i=([^&]+)/);
    return match ? match[1].split(',') : [];
}

const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
};

const heroItemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};


export default function ProjectPage({ project }) {
    const galleryImages = extractGalleryImages(project.htmlImage);
    const skills = parseSkills(project.skillsUrl);

    return (
        <>
            <Head>
                <link rel="icon" href="https://firebasestorage.googleapis.com/v0/b/personal-blog-darmajr.appspot.com/o/portofolio%2Fadmin%2FAvatar.svg?alt=media&token=622405c3-9dff-4483-af0c-ddc95fbe6445" />
                <title>{project.heading}</title>
                <meta name="description" content={project.text} />
                <meta property="og:title" content={project.heading} />
                <meta property="og:description" content={project.text} />
                <meta property="og:image" content={project.imageUrl} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`https://barbarpotato.github.io/Projects/${project.slug}`} />
            </Head>

            <Box as="article" bg="#292b37" minH="100vh">

                {/* ── Hero ── */}
                <Box
                    position="relative"
                    overflow="hidden"
                    pt={{ base: 12, md: 20 }}
                    pb={{ base: 10, md: 16 }}
                    borderBottom="1px solid rgba(134, 107, 171, 0.12)"
                >
                    {/* Ambient glow blobs — animated pulse */}
                    <motion.div
                        className="hero-glow hero-glow-purple"
                        animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.15, 1] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="hero-glow hero-glow-pink"
                        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.2, 1] }}
                        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    />
                    <motion.div
                        className="hero-ring"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                    />

                    <Box mx="auto" maxW={{ base: "720px", md: "1060px" }} px={{ base: 5, md: 8 }} position="relative">
                        <motion.div variants={heroContainerVariants} initial="hidden" animate="visible">

                            {/* Back button */}
                            <motion.div variants={heroItemVariants}>
                                <Box
                                    as="a"
                                    href="https://barbarpotato.github.io/"
                                    display="flex"
                                    alignItems="center"
                                    gap={2}
                                    mb={8}
                                    color="#866bab"
                                    fontFamily="'Outfit', system-ui, sans-serif"
                                    fontSize="sm"
                                    fontWeight="500"
                                    transition="color 0.2s ease"
                                    _hover={{ color: "#cc7bc9" }}
                                    style={{ textDecoration: 'none', width: 'fit-content' }}
                                >
                                    <FaArrowLeft size={13} />
                                    Back to Projects
                                </Box>
                            </motion.div>

                            {/* Eyebrow label */}
                            <motion.div variants={heroItemVariants}>
                                <HStack spacing={3} mb={6}>
                                    <Box w="24px" h="1px" bg="#866bab" borderRadius="full" />
                                    <Box w="5px" h="5px" borderRadius="full" bg="#866bab" flexShrink={0} />
                                    <Text
                                        fontFamily="'Outfit', sans-serif"
                                        fontWeight="600"
                                        fontSize="10px"
                                        letterSpacing="0.30em"
                                        textTransform="uppercase"
                                        color="#866bab"
                                    >
                                        Studi Kasus Proyek
                                    </Text>
                                </HStack>
                            </motion.div>

                            {/* Title */}
                            <motion.div variants={heroItemVariants}>
                                <Heading
                                    position="relative"
                                    display="inline-block"
                                    fontFamily="'Playfair Display', Georgia, serif"
                                    fontWeight="800"
                                    fontStyle="italic"
                                    fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
                                    color="#faf9ff"
                                    lineHeight="1.15"
                                    letterSpacing="-0.01em"
                                    mb={6}
                                >
                                    {project.heading}
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
                                        <motion.path
                                            d="M 4,7 C 50,1 150,1 196,7"
                                            fill="none"
                                            stroke="#cc7bc9"
                                            strokeWidth="3.5"
                                            strokeLinecap="round"
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            animate={{ pathLength: 1, opacity: 1 }}
                                            transition={{ duration: 1, delay: 0.7, ease: 'easeInOut' }}
                                        />
                                    </svg>
                                </Heading>
                            </motion.div>

                            {/* Subtitle */}
                            <motion.div variants={heroItemVariants}>
                                <Text
                                    fontFamily="'Outfit', system-ui, sans-serif"
                                    fontSize={{ base: "md", md: "lg" }}
                                    color="#c0c0c0"
                                    lineHeight="1.8"
                                    maxW="640px"
                                    mb={8}
                                >
                                    {project.text}
                                </Text>
                            </motion.div>

                            {/* Tech stack chips */}
                            {skills.length > 0 && (
                                <motion.div variants={heroItemVariants}>
                                    <HStack spacing={3} mb={10} flexWrap="wrap">
                                        {skills.map((skill, i) => (
                                            <motion.div
                                                key={skill}
                                                initial={{ opacity: 0, scale: 0.5, rotate: 8 }}
                                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                                transition={{ duration: 0.5, delay: 0.5 + i * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
                                                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                            >
                                                <Tooltip label={skill} bg="#383a4a" color="#faf9ff" fontSize="xs">
                                                    <span className="skill-chip">
                                                        <img src={`https://skillicons.dev/icons?i=${skill}`} alt={skill} />
                                                    </span>
                                                </Tooltip>
                                            </motion.div>
                                        ))}
                                    </HStack>
                                </motion.div>
                            )}

                            {/* Hero image */}
                            <motion.div variants={heroItemVariants}>
                                <motion.div
                                    className="hero-image-frame"
                                    whileHover={{ scale: 1.012, transition: { type: 'spring', stiffness: 220, damping: 22 } }}
                                    style={{
                                        borderRadius: '16px',
                                        overflow: 'hidden',
                                        border: '1px solid rgba(134, 107, 171, 0.25)',
                                        boxShadow: '0px 0px 50px rgba(204, 123, 201, 0.15)',
                                    }}
                                >
                                    <img
                                        src={project.imageUrl}
                                        alt={project.heading}
                                        style={{ margin: 0, borderRadius: 0, width: '100%', maxHeight: '520px', objectFit: 'cover', display: 'block' }}
                                    />
                                </motion.div>
                            </motion.div>

                        </motion.div>
                    </Box>
                </Box>

                {/* ── Content body ── */}
                <Box
                    mx="auto"
                    maxW={{ base: "720px", md: "1060px" }}
                    px={{ base: 5, md: 8 }}
                    py={{ base: 10, md: 14 }}
                >
                    <div className="content">
                        {formatParagraphs(project.htmlContent)}
                    </div>
                </Box>

                {/* ── Gallery ── */}
                {galleryImages.length > 0 && (
                    <Box
                        bg="rgba(56, 58, 74, 0.35)"
                        borderTop="1px solid rgba(134, 107, 171, 0.12)"
                        borderBottom="1px solid rgba(134, 107, 171, 0.12)"
                        py={{ base: 12, md: 16 }}
                    >
                        <Box mx="auto" maxW={{ base: "720px", md: "1060px" }} px={{ base: 5, md: 8 }}>
                            <Box mb={4}>
                                <Heading
                                    fontFamily="'Playfair Display', Georgia, serif"
                                    fontWeight="800"
                                    fontStyle="italic"
                                    fontSize={{ base: "2xl", md: "3xl" }}
                                    color="#faf9ff"
                                    display="inline-block"
                                >
                                    Galeri{" "}
                                    <Box as="span" position="relative" display="inline-block">
                                        Proyek
                                        <svg
                                            viewBox="0 0 200 14"
                                            style={{
                                                position: 'absolute',
                                                bottom: '-6px',
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
                                </Heading>
                            </Box>

                            <Text
                                fontFamily="'Outfit', system-ui, sans-serif"
                                fontSize="sm"
                                color="#c0c0c0"
                                mb={8}
                            >
                                Klik gambar untuk memperbesar
                            </Text>

                            <ProjectGallery images={galleryImages} />
                        </Box>
                    </Box>
                )}

            </Box>
        </>
    );
}
