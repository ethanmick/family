import {
  Button,
  Dialog,
  DialogTrigger,
  Heading,
  Modal,
  ModalOverlay,
} from 'react-aria-components'

export default function Sidebar() {
  return (
    <DialogTrigger>
      <Button>Open modal</Button>
      <ModalOverlay>
        <Modal className="my-modal">
          <Dialog>
            {({ close }) => (
              <>
                <Heading>Notice</Heading>
                <p>This is a modal with a custom modal overlay.</p>
                <Button onPress={close}>Close</Button>
              </>
            )}
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  )
}
