import React from "react";
import { Link } from "react-router-dom";
import { Heading, Box, Text, IconButton, Flex, Spacer } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClassroomDisplayProps } from "./props";

const ClassroomDisplay: React.FC<ClassroomDisplayProps> = ({
  title,
  link,
  updatedAt,
  description,
  onEdit,
  onRemove,
  onPreview,
  smallFont,
  isLoading,
}) => {
  const tagSize = !smallFont ? "md" : "sm";
  const titleSize = !smallFont ? "lg" : "sm";

  const ClassroomStats = (
    <Text color="gray.500">{`Started At: ${new Date(
      updatedAt
    ).toDateString()}`}</Text>
  );
  const ClassroomBody = (
    <Box
      borderWidth="1px"
      borderColor="gray.500"
      borderRight="2px"
      borderBottom="2px"
      role="article"
    >
      <Box py={4} px={6}>
        <Heading size={titleSize} noOfLines={2}>
          {title}
        </Heading>

        {description && (
          <Text
            color="gray.500"
            noOfLines={2}
            fontSize={tagSize}
            mt={smallFont ? 2 : 4}
          >
            {description}
          </Text>
        )}

        <Flex mt={smallFont ? 2 : 4}>
          <Spacer />

          <Box>
            {onEdit && (
              <IconButton
                ml={1}
                isLoading={isLoading}
                colorScheme="gray"
                aria-label="edit"
                variant="ghost"
                onClick={onEdit}
                icon={<FontAwesomeIcon icon="edit" />}
              />
            )}
            {onRemove && (
              <IconButton
                ml={1}
                isLoading={isLoading}
                colorScheme="red"
                aria-label="remove"
                variant="ghost"
                onClick={onRemove}
                icon={<FontAwesomeIcon icon="trash-alt" />}
              />
            )}

            {onPreview && (
              <IconButton
                id="ClassroomDisplay_Preview"
                ml={1}
                isLoading={isLoading}
                colorScheme="gray"
                aria-label="preview"
                variant="ghost"
                onClick={onPreview}
                icon={<FontAwesomeIcon icon="external-link-alt" />}
              />
            )}
          </Box>
        </Flex>
        {ClassroomStats}
      </Box>
    </Box>
  );
  return <>{link ? <Link to={link}>{ClassroomBody}</Link> : ClassroomBody}</>;
};
export default ClassroomDisplay;
