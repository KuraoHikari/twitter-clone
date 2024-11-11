import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import LoadingButton from "../LoadingButton";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface CreateConversationDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateConversationDialog({
  open,
  onClose,
}: CreateConversationDialogProps) {
  function handleOpenChange(open: boolean) {
    if (!open) {
      onClose();
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Conversation </DialogTitle>
          <DialogDescription>
            Please enter the details for the new conversation you want to
            create. Make sure to fill in all the required fields.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="following" className="mb-2">
          <TabsList>
            <TabsTrigger value="following">Following</TabsTrigger>
            <TabsTrigger value="find-user">
              Find with their username
            </TabsTrigger>
          </TabsList>
          <TabsContent value="following"></TabsContent>
          <TabsContent value="find-user"></TabsContent>
        </Tabs>

        <DialogFooter>
          <LoadingButton
            variant="destructive"
            onClick={() => {}}
            loading={false}
          >
            Delete
          </LoadingButton>
          <Button variant="outline" onClick={onClose} disabled={false}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
