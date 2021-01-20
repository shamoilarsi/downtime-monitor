import React from "react";
import { Box, Text } from "@chakra-ui/react";

function Navbar() {
  return (
    <div>
      <Box w="100%" bg="#ff0000" justifyContent="center">
        <Text fontFamily="Poppins">DownTime Monitor</Text>
      </Box>
    </div>
  );
}

export default Navbar;
