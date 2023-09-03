// import { AlertDialogBody,AlertDialogHeader,AlertDialogFooter, AlertDialogCloseButton, AlertDialogContent, AlertDialogOverlay, Button, useDisclosure } from "@chakra-ui/react"
import React from "react"

export default function AlertDialog({name,alertFor}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
  
    return (
      <>
        <Button onClick={onOpen}>{name}</Button>
        {/* <AlertDialog
          motionPreset='slideInBottom'
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay />
  
          <AlertDialogContent>
            <AlertDialogHeader>are you Sure {alertFor} ?</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              Are you sure you want to {alertFor} ? 
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' ml={3}>
                {name}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog> */}
      </>
    )
  }