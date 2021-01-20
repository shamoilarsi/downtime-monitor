import React, { useEffect, useState } from "react";
import axios from "utilities/axios";
import { Box, Text, Flex, Input, Button, Stack } from "@chakra-ui/react";

const screenWidth = ["80%", "60%", "50%", "40%"];
const URL_Regex = new RegExp(
  "^http(s)?://(www.)[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$",
  "i"
);

function Home() {
  const [urls, setUrls] = useState([]);
  const [inputURL, setInputURL] = useState("");
  const [inputValid, setInputValid] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchURLs = async () => {
    const { data } = await axios.get("/urls");
    setUrls(data);
  };

  useEffect(() => {
    fetchURLs();
    return () => {};
  }, []);

  return (
    <Flex w="100%" h="100vh" align="center" justify="center" direction="column">
      <Stack w={screenWidth} mb={8}>
        <Stack direction="row">
          <Input
            isInvalid={!inputValid}
            variant="filled"
            value={inputURL}
            onChange={(e) => setInputURL(e.target.value)}
            placeholder="https://www.website.com/"
          />
          <Button
            colorScheme="blue"
            isLoading={loading}
            onClick={async () => {
              if (URL_Regex.test(inputURL)) {
                setInputValid(true);
                setLoading(true);
                const {
                  data: { success },
                } = await axios.post("/add", { url: inputURL });
                if (success) await fetchURLs();
                setInputURL("");
                setLoading(false);
              } else {
                setInputValid(false);
              }
            }}
          >
            +
          </Button>
        </Stack>
        {!inputValid && (
          <Text fontSize={13} color="#ff0000">
            Invalid URL. Please enter in the following format <br />
            https://www.website.com/
          </Text>
        )}
      </Stack>

      <Flex
        direction="column"
        h="50%"
        w={screenWidth}
        overflowY="scroll"
        className="scroll-box"
      >
        {urls.map((item) => {
          const isUp = item.statuses[0].alive ?? "unknown";
          return (
            <Flex
              key={item._id}
              as="a"
              href={`/${item._id}`}
              p={5}
              my={2}
              mx={1}
              rounded="md"
              bg="blue.50"
              boxShadow="base"
              cursor="pointer"
              justifyContent="space-between"
              // w={screenWidth}
              _hover={{ boxShadow: "md" }}
            >
              <Box>
                <Text fontSize={15}>{item.url}</Text>
                <Text fontSize={12} mt={1}>
                  Last Updated -{" "}
                  {isUp !== "unknown"
                    ? new Date(item.statuses[0].timestamp).toLocaleString()
                    : "Yet to Ping"}
                </Text>
              </Box>
              <Flex
                w={4}
                h={4}
                bg={
                  isUp === "unknown"
                    ? "#0000007f"
                    : isUp
                    ? "#00ff00"
                    : "#ff0000"
                }
                justify="center"
                align="center"
                alignSelf="center"
                borderRadius="50%"
              />
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
}

export default Home;
