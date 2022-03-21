import React, { useState } from "react";
import Editor from "rich-markdown-editor";
import {
  Box,
  Input,
  Flex,
  Spacer,
  Stack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ResourceEditorProps } from "./props";
import CreateSchedule from "./CreateSchedule";

const ResourceEditor: React.FC<ResourceEditorProps> = ({
  content: initialContent,
  title: initialTitle,
  action,
  onSubmit,
  onSave,
  onPublish,
  onSchedule,
  isLoading,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [content, setContent] = useState(initialContent);
  const [title, setTitle] = useState(initialTitle);

  const validForm = !!(title && content);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Schedule</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateSchedule
              onSave={(timestamp) => {
                if (onSchedule && validForm) {
                  onSchedule({ title, content, timestamp });
                  onClose();
                }
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Stack>
        <Flex>
          {action}
          <Spacer />
          <Menu>
            <MenuButton
              as={Button}
              isLoading={isLoading}
              rightIcon={<FontAwesomeIcon icon="chevron-down" />}
            >
              Save
            </MenuButton>
            <MenuList>
              {onSubmit && (
                <MenuItem
                  icon={<FontAwesomeIcon icon="save" />}
                  isDisabled={!validForm}
                  onClick={() => {
                    if (validForm) onSubmit({ title, content });
                  }}
                >
                  Submit
                </MenuItem>
              )}
              {onSave && (
                <MenuItem
                  icon={<FontAwesomeIcon icon="save" />}
                  isDisabled={!validForm}
                  onClick={() => {
                    if (validForm) onSave({ title, content });
                  }}
                >
                  Save as Draft
                </MenuItem>
              )}
              {onPublish && (
                <MenuItem
                  isDisabled={!validForm}
                  icon={<FontAwesomeIcon icon="file-upload" />}
                  onClick={() => {
                    if (validForm) onPublish({ title, content });
                  }}
                >
                  Publish
                </MenuItem>
              )}
              {onSchedule && (
                <MenuItem
                  icon={<FontAwesomeIcon icon={["far", "calendar-alt"]} />}
                  isDisabled={!validForm}
                  onClick={onOpen}
                >
                  Schedule
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        </Flex>
        <Stack>
          <Input
            id="ResourceEditor_Title"
            size="lg"
            minW="100%"
            placeholder="Resource title"
            value={title}
            fontSize="xl"
            fontWeight="semibold"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </Stack>
        <Box
          px={8}
          py={4}
          mt={2}
          minH="80vh"
          borderTopWidth="2px"
          borderLeftWidth="2px"
          borderRightWidth="5px"
          borderColor="gray.100"
          borderTopRadius="lg"
        >
          <Editor
            id="ResourceEditor_Editor"
            defaultValue={content}
            placeholder="Write your resource here..."
            onChange={(e: any) => {
              const c = e();
              if (c === "\\\n") {
                setContent("");
              } else {
                setContent(c);
              }
            }}
          />
        </Box>
      </Stack>
    </>
  );
};
export default ResourceEditor;
