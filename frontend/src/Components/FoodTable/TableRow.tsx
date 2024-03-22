import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";

interface TableRowProps {
  name: string;
  datetime: Date;
}

const TableRow: React.FC<TableRowProps> = (props) => {
  const product_text: string = "Name: " + props.name;
  const product_date: string =
    "Date of purchase: " + props.datetime.toLocaleDateString();

  const rowsInList: string[] = [product_text, product_date];

  return (
    <Box bg="brand.highlight" p={4} borderRadius="lg" width="100%">
      <Flex justifyContent="space-between" alignItems="center">
        {rowsInList.map((row, index) => (
          <Text key={index} fontWeight="bold">
            {row}
          </Text>
        ))}
      </Flex>
    </Box>
  );
};

export default TableRow;
