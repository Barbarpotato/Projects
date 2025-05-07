import { useState, useEffect, Fragment } from 'react';
import Darwin from '@/components/Darwin';
import {
    useBreakpointValue, Flex, Stack, Text, Image,
    Heading, Box, Center, Card, CardBody
} from '@chakra-ui/react';
import { chunkArray, partitionArray } from '../utils/PreprocessProjectData';
import Loading from '@/components/Loading';
import { motion } from 'framer-motion';
import Head from 'next/head';


function Project() {
    const [tabletContents, setTabletContents] = useState([]);
    const [desktopContent, setDesktopContent] = useState({
        leftPartitions: [],
        rightPartitions: []
    });
    const [contents, setContents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const isMobile = useBreakpointValue({ base: true, sm: true, md: true, lg: false, xl: false });
    const isTablet = useBreakpointValue({ base: false, sm: false, md: false, lg: true, xl: false });
    const isDesktop = useBreakpointValue({ base: false, sm: false, md: false, lg: false, xl: true });

    // Fetch data from the endpoint
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setIsLoading(true);

                let url = "";
                if (process.env.NODE_ENV === "development") {
                    url = "Projects/data/projects.json";
                } else {
                    url = "https://api-barbarpotato.vercel.app/projects";
                }

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch projects');
                }
                const res = await response.json();

                const data = res.data;

                setContents(data);
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Handle content partitioning for tablet and desktop using breakpoint values
    useEffect(() => {
        if (contents.length > 0) {
            if (isDesktop) {
                const [leftPartitions, rightPartitions] = partitionArray(contents);
                const chunkedArrRes = chunkArray(leftPartitions, 3);
                setDesktopContent({ leftPartitions: chunkedArrRes, rightPartitions });
            } else if (isTablet) {
                setTabletContents(chunkArray(contents, 3));
            }
        }
    }, [isDesktop, isTablet, contents]);

    if (isLoading) return <Loading />;
    if (error) return <Text>Error loading projects: {error}</Text>;

    // Function to generate href from heading
    const generateHref = (slug) => {
        return `https://barbarpotato.github.io/Projects/${slug}`;
    };

    return (
        <Fragment>

            <Head>
                <link
                    rel="icon"
                    href="https://firebasestorage.googleapis.com/v0/b/personal-blog-darmajr.appspot.com/o/portofolio%2Fadmin%2FAvatar.svg?alt=media&token=622405c3-9dff-4483-af0c-ddc95fbe6445"
                />
                <title>Barbarpotato - Projects</title>
                <meta name="description" content="A mix of things I’ve built—some for fun, some for work, all focused on making ideas come to life with clean and solid code." />
                <meta property="og:type" content="project" />
            </Head>

            <Darwin />

            <Box id='projects' py={20}>





                <Box className='stars'></Box>
                <Box className='stars2'></Box>
                <Box className='stars3'></Box>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <Box py={{ base: 8, md: 12 }} marginBottom={20} borderBottomWidth={1} borderColor="#536189">
                        <Box maxW="7xl" mx="auto" px={{ base: 4, md: 6 }}>
                            <Heading as="h1" size={{ base: 'xl', md: '2xl' }} color="#faf9ff" mb={4}>
                                Projects
                            </Heading>
                            <Text fontSize={{ base: 'md', md: 'lg' }} color="#faf9ff" maxW="2xl">
                                A mix of things I’ve built—some for fun, some for work, all focused on making ideas come to life with clean and solid code.
                            </Text>

                        </Box>
                    </Box>
                </motion.div>

                {
                    isMobile && (
                        contents.map((object, idx) => (
                            <Center mx={5} my={5} key={`project-regular-${idx}`}>
                                <Card
                                    as="a"
                                    href={generateHref(object.slug)}
                                    boxShadow={'dark-lg'}
                                    backgroundColor={"#292b37"}
                                    maxW='xl'
                                    _hover={{ '.show-project': { opacity: 1, transform: 'translateY(0)' } }}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <CardBody>
                                        <Image
                                            loading='lazy'
                                            width={"auto"}
                                            height={"auto"}
                                            src={object.imageUrl}
                                            alt={`Image for ${object.heading}`}
                                            borderRadius="2xl"
                                        />
                                        <Stack mt='6' spacing='3'>
                                            <Heading color={"#faf9ff"}>{object.heading}</Heading>
                                            <Text color={"#faf9ff"} fontWeight={'bold'}>{object.text}</Text>
                                            <Box
                                                as="a"
                                                href={generateHref(object.slug)}
                                                color="#bd93f9"
                                                fontWeight="bold"
                                                fontSize="sm"
                                                opacity={0}
                                                transform="translateY(10px)"
                                                transition="opacity 0.3s ease, transform 0.3s ease"
                                                display="inline-block"
                                                mt={2}
                                                className="show-project"
                                            >
                                                Show Project
                                            </Box>
                                        </Stack>
                                    </CardBody>
                                </Card>
                            </Center>
                        ))
                    )
                }
                {
                    isTablet && (
                        <Fragment>
                            {tabletContents.map((contentArray, idx) => (
                                <Fragment key={idx}>
                                    {contentArray.length === 1 ? (
                                        <Flex key={`tablet-project-large-${idx}`}>
                                            <Card
                                                as="a"
                                                href={generateHref(contentArray[0].slug)}
                                                margin={5}
                                                boxShadow={'dark-lg'}
                                                backgroundColor={"#292b37"}
                                                _hover={{ '.show-project': { opacity: 1, transform: 'translateY(0)' } }}
                                                style={{ textDecoration: 'none' }}
                                            >
                                                <CardBody>
                                                    <Image
                                                        width={"auto"}
                                                        height={"auto"}
                                                        src={contentArray[0].imageUrl}
                                                        alt={contentArray[0].heading}
                                                        borderRadius="2xl"
                                                    />
                                                    <Stack mt='6' spacing='3'>
                                                        <Heading color={"#faf9ff"}>{contentArray[0].heading}</Heading>
                                                        <Text color={"#faf9ff"} fontWeight={'bold'}>{contentArray[0].text}</Text>
                                                        <Box
                                                            as="a"
                                                            href={generateHref(contentArray[0].slug)}
                                                            color="#bd93f9"
                                                            fontWeight="bold"
                                                            fontSize="sm"
                                                            opacity={0}
                                                            transform="translateY(10px)"
                                                            transition="opacity 0.3s ease, transform 0.3s ease"
                                                            display="inline-block"
                                                            mt={2}
                                                            className="show-project"
                                                        >
                                                            Show Project
                                                        </Box>
                                                    </Stack>
                                                </CardBody>
                                            </Card>
                                        </Flex>
                                    ) : (
                                        <Flex key={idx}>
                                            {contentArray.map((content, contentIdx) => (
                                                <Card
                                                    as="a"
                                                    href={generateHref(content.slug)}
                                                    key={`tablet-project-small-${contentIdx}`}
                                                    margin={5}
                                                    boxShadow={'dark-lg'}
                                                    backgroundColor={"#292b37"}
                                                    _hover={{ '.show-project': { opacity: 1, transform: 'translateY(0)' } }}
                                                    style={{ textDecoration: 'none' }}
                                                >
                                                    <CardBody>
                                                        <Image
                                                            alt={content.heading}
                                                            width={"auto"}
                                                            height={"300px"}
                                                            borderWidth={10}
                                                            borderBottomColor={"#ff79c6"}
                                                            src={content.imageUrl}
                                                            borderRadius="2xl"
                                                        />
                                                        <Stack mt='6' spacing='3'>
                                                            <Heading color={"#faf9ff"}>{content.heading}</Heading>
                                                            <Text color={"#faf9ff"} fontWeight={'bold'}>{content.text}</Text>
                                                            <Box
                                                                as="a"
                                                                href={generateHref(content.slug)}
                                                                color="#bd93f9"
                                                                fontWeight="bold"
                                                                fontSize="sm"
                                                                ntSize="sm"
                                                                opacity={0}
                                                                transform="translateY(10px)"
                                                                transition="opacity 0.3s ease, transform 0.3s ease"
                                                                display="inline-block"
                                                                mt={2}
                                                                className="show-project"
                                                            >
                                                                Show Project
                                                            </Box>
                                                        </Stack>
                                                    </CardBody>
                                                </Card>
                                            ))}
                                        </Flex>
                                    )}
                                </Fragment>
                            ))}
                        </Fragment>
                    )
                }
                {
                    isDesktop && (
                        <Fragment>
                            <Flex justifyContent={'center'}>
                                <Box width={'50%'}>
                                    {desktopContent?.leftPartitions.map((contentArray, idx) => (
                                        <Fragment key={`left-partitions-${idx}`}>
                                            {contentArray.length === 1 ? (
                                                <Card
                                                    as="a"
                                                    href={generateHref(contentArray[0].slug)}
                                                    className='project-card'
                                                    margin={5}
                                                    boxShadow={'dark-lg'}
                                                    backgroundColor={"#292b37"}
                                                    _hover={{ '.show-project': { opacity: 1, transform: 'translateY(0)' } }}
                                                    style={{ textDecoration: 'none' }}
                                                >
                                                    <CardBody>
                                                        <Box className='zoom-container'>
                                                            <Image
                                                                alt={contentArray[0].heading}
                                                                src={contentArray[0].imageUrl}
                                                                width={"auto"}
                                                                height={"auto"}
                                                                borderRadius="2xl"
                                                            />
                                                        </Box>
                                                        <Stack mt='6' spacing='3'>
                                                            <Heading color={"#faf9ff"}>{contentArray[0].heading}</Heading>
                                                            <Text color={"#faf9ff"} fontWeight={'bold'}>{contentArray[0].text}</Text>
                                                            <Box
                                                                as="a"
                                                                href={generateHref(contentArray[0].slug)}
                                                                color="#bd93f9"
                                                                fontWeight="bold"
                                                                fontSize="sm"
                                                                opacity={0}
                                                                transform="translateY(10px)"
                                                                transition="opacity 0.3s ease, transform 0.3s ease"
                                                                display="inline-block"
                                                                mt={2}
                                                                className="show-project"
                                                            >
                                                                Show Project
                                                            </Box>
                                                        </Stack>
                                                    </CardBody>
                                                </Card>
                                            ) : (
                                                <Flex>
                                                    {contentArray.map((object, index) => (
                                                        <Card
                                                            as="a"
                                                            href={generateHref(object.slug)}
                                                            key={index}
                                                            className='project-card'
                                                            margin={5}
                                                            boxShadow={'dark-lg'}
                                                            backgroundColor={"#292b37"}
                                                            _hover={{ '.show-project': { opacity: 1, transform: 'translateY(0)' } }}
                                                            style={{ textDecoration: 'none' }}
                                                        >
                                                            <CardBody>
                                                                <Box className='zoom-container'>
                                                                    <Image
                                                                        width={"auto"}
                                                                        height={"300px"}
                                                                        borderWidth={10}
                                                                        borderBottomColor={"#ff79c6"}
                                                                        src={object.imageUrl}
                                                                        alt={object.heading}
                                                                        borderRadius="2xl"
                                                                    />
                                                                </Box>
                                                                <Stack mt='6' spacing='3'>
                                                                    <Heading color={"#faf9ff"}>{object.heading}</Heading>
                                                                    <Text color={"#faf9ff"} fontWeight={'bold'}>{object.text}</Text>
                                                                    <Box
                                                                        as="a"
                                                                        href={generateHref(object.slug)}
                                                                        color="#bd93f9"
                                                                        fontWeight="bold"
                                                                        fontSize="sm"
                                                                        opacity={0}
                                                                        transform="translateY(10px)"
                                                                        transition="opacity 0.3s ease, transform 0.3s ease"
                                                                        display="inline-block"
                                                                        mt={2}
                                                                        className="show-project"
                                                                    >
                                                                        Show Project
                                                                    </Box>
                                                                </Stack>
                                                            </CardBody>
                                                        </Card>
                                                    ))}
                                                </Flex>
                                            )}
                                        </Fragment>
                                    ))}
                                </Box>
                                <Box>
                                    {desktopContent?.rightPartitions.map((content, idx) => (
                                        <Card
                                            as="a"
                                            href={generateHref(content.slug)}
                                            key={`right-partition-${idx}`}
                                            className='project-card'
                                            margin={5}
                                            boxShadow={'dark-lg'}
                                            backgroundColor={"#292b37"}
                                            maxW={'sm'}
                                            _hover={{ '.show-project': { opacity: 1, transform: 'translateY(0)' } }}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <CardBody>
                                                <Box className='zoom-container'>
                                                    <Image
                                                        loading='lazy'
                                                        alt={content.heading}
                                                        width={"auto"}
                                                        height={"300px"}
                                                        src={content.imageUrl}
                                                        borderRadius="2xl"
                                                    />
                                                </Box>
                                                <Stack mt='6' spacing='3'>
                                                    <Heading color={"#faf9ff"}>{content.heading}</Heading>
                                                    <Text color={"#faf9ff"} fontWeight={'bold'}>{content.text}</Text>
                                                    <Box
                                                        as="a"
                                                        href={generateHref(content.slug)}
                                                        color="#bd93f9"
                                                        fontWeight="bold"
                                                        fontSize="sm"
                                                        opacity={0}
                                                        transform="translateY(10px)"
                                                        transition="opacity 0.3s ease, transform 0.3s ease"
                                                        display="inline-block"
                                                        mt={2}
                                                        className="show-project"
                                                    >
                                                        Show Project
                                                    </Box>
                                                </Stack>
                                            </CardBody>
                                        </Card>
                                    ))}
                                </Box>
                            </Flex>
                        </Fragment>
                    )
                }
            </Box>
        </Fragment>
    );
}

export default Project;