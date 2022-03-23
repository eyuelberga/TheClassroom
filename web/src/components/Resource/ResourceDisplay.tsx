import React from "react";
import { Link } from "react-router-dom";
import Editor from "rich-markdown-editor";
import {
  Box,
  Text,
  Flex,
  Spacer,
  Divider,
  IconButton,
  Heading,
  Tag,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ResourceDisplayProps } from "./props";

const ResourceDisplay: React.FC<ResourceDisplayProps> = ({
  title,
  content,
  onPreview,
  onRemove,
  onEdit,
  isLoading,
  label,
  description,
  link,
  smallFont,
  updatedAt,
}) => {
  const iconSize = content ? "lg" : "md";
  const tagSize = !smallFont ? "md" : "sm";
  const titleSize = !smallFont ? "lg" : "sm";
  const ResourceStats = (
    <Text color="gray.500">{`Last Updated: ${new Date(
      updatedAt
    ).toDateString()}`}</Text>
  );
  const ResourceBody = (
    <Box
      p={4}
      borderWidth="1px"
      borderColor="gray.500"
      borderRight="2px"
      borderBottom="2px"
      role="article"
    >
      {label && (
        <Flex>
          <Tag size="lg" variant="subtle">
            {label}
          </Tag>
        </Flex>
      )}

      <Flex>
        <Box>
          <Heading size={titleSize} noOfLines={content ? undefined : 1}>
            {title}
          </Heading>
          {description && (
            <Text
              color="gray.500"
              noOfLines={content ? undefined : 2}
              fontSize={tagSize}
            >
              {description}
            </Text>
          )}
        </Box>
      </Flex>

      {content && (
        <>
          <Divider my={2} />
          <Box px={2}>
            <Editor defaultValue={content} readOnly onChange={() => {}} />
          </Box>
        </>
      )}

      <Flex alignItems="baseline" px={2}>
        <Spacer />
        <Box p={1} rounded="10px" bg="gray.50">
          {onEdit && (
            <IconButton
              id="ResourceDisplay_Edit"
              ml={1}
              colorScheme="gray"
              aria-label="edit"
              variant="ghost"
              size={iconSize}
              isDisabled={isLoading}
              onClick={onEdit}
              icon={<FontAwesomeIcon icon="edit" />}
            />
          )}
          {onRemove && (
            <IconButton
              id="ResourceDisplay_Remove"
              ml={1}
              colorScheme="red"
              aria-label="remove"
              variant="ghost"
              size={iconSize}
              isDisabled={isLoading}
              onClick={onRemove}
              icon={<FontAwesomeIcon icon="trash-alt" />}
            />
          )}
        </Box>
        <Box>
          {onPreview && (
            <IconButton
              id="ResourceDisplay_Preview"
              ml={1}
              colorScheme="gray"
              aria-label="preview"
              variant="ghost"
              size={iconSize}
              isDisabled={isLoading}
              onClick={onPreview}
              icon={<FontAwesomeIcon icon="external-link-alt" />}
            />
          )}
        </Box>
      </Flex>
      {ResourceStats}
    </Box>
  );
  return <>{link ? <Link to={link}>{ResourceBody}</Link> : ResourceBody}</>;
};
export default ResourceDisplay;
