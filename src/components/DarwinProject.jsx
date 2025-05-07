import React, { useEffect, useState } from 'react';
import {
    Drawer, Button, Input, Text,
    DrawerBody, DrawerFooter, Box,
    DrawerHeader, DrawerOverlay,
    DrawerContent, DrawerCloseButton,
    Flex, Heading
} from '@chakra-ui/react';

// Fetch with timeout and error handling
const fetchData = async (message = "", history = [], content = "") => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    try {
        const filteredHistory = history.map(item => ({
            ...item,
            message: undefined
        }));

        const response = await fetch("https://darwin-assistant.vercel.app/api/v1/conversation/projects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ history: filteredHistory, content, message }),
            signal: controller.signal
        });

        clearTimeout(timeout);
        const data = await response.json();
        return data;
    } catch (err) {
        return {
            status: "failed",
            response: err.name === 'AbortError'
                ? "Request timed out. Please try again later."
                : "Darwin is currently unavailable. Please try again."
        };
    }
};

function DarwinProject({ btnRef, isOpen, onClose, content }) {
    const [message, setMessage] = useState("");
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const initialize = async () => {
            const data = await fetchData("", [], content);
            setHistory([
                { role: "user", parts: [{ text: "" }], message: "" },
                { role: "model", parts: [{ text: data.response }], message: data.response }
            ]);
        };
        initialize();
    }, [content]);

    const handleSendMessage = async () => {
        if (!message.trim() || loading) return;

        const currentMessage = message;
        setMessage("");
        setLoading(true);

        setHistory(prev => [
            ...prev,
            { role: "user", parts: [{ text: currentMessage }], message: currentMessage },
            { role: "model", parts: [{ text: "Thinking..." }], message: "Thinking..." }
        ]);

        const data = await fetchData(currentMessage, [...history, {
            role: "user", parts: [{ text: currentMessage }], message: currentMessage
        }], content);

        setHistory(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = {
                role: "model",
                parts: [{ text: data.response }],
                message: data.response
            };
            return updated;
        });

        setLoading(false);
    };

    return (
        <Drawer
            blockScrollOnMount={false}
            size="lg"
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>
                    <Heading color="#ff79c6" size="md">Conversation With Darwin</Heading>
                </DrawerHeader>

                <DrawerBody>
                    {history.map((msg, index) => (
                        msg.message && (
                            <Flex
                                key={index}
                                direction="column"
                                align={msg.role === "model" ? "flex-start" : "flex-end"}
                            >
                                <Box
                                    mb={4}
                                    p={3}
                                    borderRadius="md"
                                    bg={msg.role === "model" ? "#2D3748" : "#4A5568"}
                                    color="white"
                                    width="85%"
                                    transition="all 0.2s ease-in-out"
                                    _hover={{
                                        bg: msg.role === "model" ? "#394150" : "#5A6478",
                                        transform: "scale(1.02)",
                                        boxShadow: "md"
                                    }}
                                >
                                    <Text fontWeight="bold" color="#ff79c6">
                                        {msg.role === "model" ? "Darwin" : "You"}
                                    </Text>
                                    <Text mt={1}>{msg.message}</Text>
                                </Box>
                            </Flex>
                        )
                    ))}
                </DrawerBody>

                <DrawerFooter>
                    <Flex w="100%">
                        <Input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSendMessage();
                            }}
                            isDisabled={loading}
                            placeholder="Send a message..."
                            borderLeftRadius="2xl"
                            borderRightRadius={0}
                            borderWidth={3}
                            borderColor="#536189"
                            focusBorderColor="#ff79c6"
                            my={2}
                        />
                        <Button
                            onClick={handleSendMessage}
                            isLoading={loading}
                            loadingText="Sending..."
                            colorScheme="purple"
                            borderLeftRadius={0}
                            my={2}
                        >
                            Send
                        </Button>
                    </Flex>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

export default DarwinProject;
