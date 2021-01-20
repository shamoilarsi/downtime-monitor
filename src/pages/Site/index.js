import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Text,
  Flex,
  Input,
  Button,
  Stack,
  HStack,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";

import axios from "utilities/axios";

const screenWidth = ["80%", "75%", "70%", "65%"];
function Site({ match: { params } }) {
  const { id } = params;
  const [URLData, setURLData] = useState(null);
  const [localUpdateInterval, setLocalUpdateInterval] = useState(0);
  const [showUpdateIntervalTick, setShowUpdateIntervalTick] = useState(false);

  const onDelete = async () => {
    const {
      data: { success },
    } = await axios.delete(`/${id}`);
    if (success) window.location = "/";
  };

  const getURLData = useCallback(async () => {
    const {
      data: { success, data },
    } = await axios.get(`/${id}`);

    if (success) {
      data.statuses.pop();
      setURLData(data);
      setLocalUpdateInterval(data.updateInterval);
    } else {
      alert("id was not found");
    }
  }, [id]);

  useEffect(() => {
    let timeout = null;
    if (URLData && localUpdateInterval !== URLData.updateInterval) {
      timeout = setTimeout(async () => {
        const {
          data: { success },
        } = await axios.post("/update-interval", {
          id,
          interval: localUpdateInterval,
        });
        if (success) {
          setShowUpdateIntervalTick(true);
          setTimeout(() => setShowUpdateIntervalTick(false), 2000);
          getURLData();
        }
      }, 2000);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [localUpdateInterval, id, URLData, getURLData]);

  useEffect(() => {
    getURLData();
    return () => {};
  }, [id, getURLData]);

  return (
    <Flex justify="center" align="center" h="100vh">
      {!URLData ? (
        <Text>Loading</Text>
      ) : (
        <Box w={screenWidth} bg={"blue.50"} p={8}>
          <Stack direction="row" justifyContent="space-between" wrap="wrap">
            <HStack align="center" justify="center" wrap="wrap">
              <Text fontWeight="bold" textAlign="center">
                {URLData.url}
              </Text>
              <Button size="xs" colorScheme="red" onClick={onDelete}>
                DELETE
              </Button>
            </HStack>

            <Stack w={["100%", null, "30%"]} mb={3}>
              <HStack>
                <Text fontSize={12}>Update Interval</Text>
                {showUpdateIntervalTick && <Text>✅</Text>}
              </HStack>
              <HStack>
                <Button
                  colorScheme="blue"
                  onClick={() =>
                    setLocalUpdateInterval((v) => (v - 5 >= 5 ? v - 5 : v))
                  }
                >
                  -
                </Button>
                <Input textAlign="center" value={localUpdateInterval} />
                <Button
                  colorScheme="blue"
                  onClick={() => setLocalUpdateInterval((v) => v + 5)}
                >
                  +
                </Button>
              </HStack>
            </Stack>
          </Stack>
          <Box h="50vh" overflow="scroll" className="scroll-box">
            <Table variant="simple" size={"sm"} mt={5}>
              <TableCaption>
                Future scope - Draw graphs for better visualisations
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>TimeStamp</Th>
                  <Th>Alive</Th>
                  <Th isNumeric>Response Time</Th>
                </Tr>
              </Thead>
              <Tbody>
                {URLData.statuses.map((item) => (
                  <Tr key={item._id}>
                    <Td>{new Date(item.timestamp).toLocaleString()}</Td>
                    <Td>{item.alive ? "Yes" : "No"}</Td>
                    <Td isNumeric>{item.responseTime}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      )}
    </Flex>
  );
}

export default Site;
