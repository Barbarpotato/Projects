import {
    Box, VStack, Heading, Text, Image, useBreakpointValue, Button,
    Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, useDisclosure
} from '@chakra-ui/react';
import { MdSupportAgent } from "react-icons/md";
import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';

// Custom Components
import Darwin from '@/components/Darwin';


const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

export default function ProjectPage({ project }) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreen = () => setIsMobile(window.innerWidth < 768);
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);


    // Responsive values
    const paddingX = useBreakpointValue({ base: '16px', md: '20%' });
    const headingFontSize = useBreakpointValue({ base: '5xl', lg: '7xl' });
    const subHeadingFontSize = useBreakpointValue({ base: 'lg', lg: '2xl' });
    const contentFontSize = useBreakpointValue({ base: 'sm', lg: 'md' });

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.4, ease: 'easeOut' },
        },
    };

    return (
        <>
            <Head>
                <link
                    rel="icon"
                    href="https://firebasestorage.googleapis.com/v0/b/personal-blog-darmajr.appspot.com/o/portofolio%2Fadmin%2FAvatar.svg?alt=media&token=622405c3-9dff-4483-af0c-ddc95fbe6445"
                />
                <title>Barbarpotato - {project.heading}</title>
                <meta name="description" content={`${project.text + " Project"}`} />
                <meta property="og:title" content={project.heading} />
                <meta property="og:description" content={project.text + " Project"} />
                <meta property="og:type" content="project" />
                <meta
                    property="og:url"
                    content={`https://barbarpotato.github.io/projects/${project.heading
                        .replace(/[^\w\s-]/g, '')
                        .trim()
                        .replace(/\s+/g, '-')}`}
                />
            </Head>

            <MotionBox
                paddingX={paddingX}
                py={12}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >

                {/* Project Header */}
                <MotionVStack spacing={8} align="start" variants={containerVariants}>
                    <MotionBox variants={itemVariants} p={6}>
                        <Text
                            color="#faf9ff"
                            fontSize={subHeadingFontSize}
                            mt={2}
                            opacity={0.9}
                            fontStyle="italic"
                        >
                            {project.text}
                        </Text>
                        <Heading
                            color="#faf9ff"
                            fontSize={headingFontSize}
                            bgGradient="linear(to-r, #faf9ff, #a8a4ff)"
                            bgClip="text"
                            fontWeight="extrabold"
                        >
                            {project.heading}
                        </Heading>
                    </MotionBox>

                    {/* Breadcrumb Navigation */}
                    <Breadcrumb
                        my={8}
                        separator=">"
                        fontSize={contentFontSize}
                        color="#faf9ff"
                        p={6}
                        borderRadius="md"
                        backdropFilter="blur(5px)"
                    >
                        <BreadcrumbItem>
                            <BreadcrumbLink href="https://barbarpotato.github.io" _hover={{ color: '#a8a4ff' }} transition="color 0.2s">
                                Home
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem isCurrentPage>
                            <BreadcrumbLink href="#" fontWeight="bold">
                                {project.heading}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>

                    <Flex
                        direction={{ base: 'column', md: 'row' }}
                        gap={6}
                        align="flex-start"
                        w="100%"
                    >

                        {/* Project Content */}
                        <MotionBox
                            variants={itemVariants}
                            p={6}
                            flex="0.9"
                        >

                            <Text
                                color="#faf9ff"
                                style={{
                                    textAlign: 'justify',
                                    whiteSpace: 'pre-wrap',
                                    fontFamily:
                                        '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica',
                                    fontSize: contentFontSize,
                                    lineHeight: 1.8,
                                }}
                            >
                                {project.htmlContent}
                            </Text>
                        </MotionBox>

                        {/* Skills Display */}
                        <MotionBox
                            p={6}
                            variants={itemVariants}
                            flex={{ base: 'none', md: '0 0 300px' }} // fixed width on desktop
                        >

                            <Text
                                color="#faf9ff"
                                fontSize={contentFontSize}
                                fontWeight="semibold"
                            >
                                Tech Stack
                            </Text>
                            <Image
                                src={project.skillsUrl}
                                alt="Project technologies"
                                maxH="24px"
                                objectFit="contain"
                            />
                        </MotionBox>

                    </Flex>

                    {/* User Interface Images */}
                    <MotionBox
                        variants={itemVariants}
                        p={6}
                        w="100%"
                    >
                        <Heading
                            color="#faf9ff"
                            mb={4}
                            fontSize={subHeadingFontSize}
                            fontWeight="bold"
                        >
                            User Interface (UI)
                        </Heading>
                        <Box
                            sx={{
                                '& img': {
                                    borderRadius: 'md',
                                    boxShadow: 'md',
                                    width: '100%',       // ensure full container width
                                    height: 'auto',      // maintain aspect ratio
                                    mb: 4,
                                },
                            }}
                            dangerouslySetInnerHTML={{ __html: project.htmlImage }}
                        />
                    </MotionBox>
                </MotionVStack>
            </MotionBox>

            {/* Floating Button */}
            {isMobile ? (
                <button
                    ref={btnRef}
                    onClick={onOpen}
                    style={{
                        opacity: "70%",
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        zIndex: 1000,
                        backgroundColor: '#ff79c6',
                        borderRadius: '50%',
                        padding: '12px',
                        border: 'none'
                    }}
                >
                    <MdSupportAgent size={30} color="white" />
                </button>
            ) : (
                <Button
                    ref={btnRef}
                    position="fixed"
                    right="20px"
                    bottom="20px"
                    zIndex={1000}
                    colorScheme="purple"
                    onClick={onOpen}
                >
                    Ask Darwin AI
                </Button>
            )}


            <Darwin btnRef={btnRef} isOpen={isOpen} onOpen={onOpen} onClose={onClose} content={project.htmlContent + project.skillsUrl} />

        </>
    );
}



export async function getStaticPaths() {
    const res = await fetch('https://api-barbarpotato.vercel.app/projects');
    if (!res.ok) return { paths: [], fallback: false };

    const { data } = await res.json();
    return {
        paths: data.map(project => ({
            params: {
                slug: project.heading.toLowerCase()
                    .replace(/[^\w\s-]/g, '')
                    .trim()
                    .replace(/\s+/g, '-')
            }
        })),
        fallback: false
    };
}

export async function getStaticProps({ params }) {

    // translate the heading slug to normal heading
    const heading = params.slug.replace(/-/g, ' ');

    const res = await fetch(`https://api-barbarpotato.vercel.app/projects?heading=${encodeURIComponent(heading)}`);
    if (!res.ok) return { notFound: true };

    let project = await res.json();
    if (project.data) project = project.data[0];

    return { props: { project } };
}