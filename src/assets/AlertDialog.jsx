import { AlertDialogBody,AlertDialogHeader,AlertDialogFooter, AlertDialogCloseButton, AlertDialogContent, AlertDialogOverlay, Button, AlertDialog } from "@chakra-ui/react"
import React from "react"

export default function AlertDialogButton({type,onDelete,onClose,isOpen}) {
  
    return (
      <AlertDialog motionPreset="slideInBottom"  onClose={onClose} isOpen={isOpen} isCentered>
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>
            <h2 className="text-2xl font-normal tracking-wide">Confirm Delete !</h2>
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
          Are you sure you want to delete this {type}? If you proceed, this {type} will be permanently removed.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button  onClick={onClose}>
              <h2 className="text-xl font-normal tracking-wide">No</h2>
            </Button>
            <Button onClick={onDelete} colorScheme="red" ml={3}>
              <h2 className="text-xl font-normal tracking-wide">Yes</h2>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }