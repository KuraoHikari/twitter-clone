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

import { cn } from "@/lib/utils";

import Followers from "../followers/Followers";
import { InfiniteScrollArea } from "../infiniteScrollArea";
import { Loader2 } from "lucide-react";
import useCreateConversationMutation from "./mutations";
import useInfiniteFollowersCreateConversation from "@/hooks/useInfiniteFollowersCreateConversation";
import { useSession } from "@/app/(main)/SessionProvider";

interface CreateConversationDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateConversationDialog({
  open,
  onClose,
}: CreateConversationDialogProps) {
  const { user } = useSession();
  const mutation = useCreateConversationMutation(user.id);
  function handleOpenChange(open: boolean) {
    if (!open) {
      onClose();
    }
  }

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteFollowersCreateConversation();

  const followers = data?.pages.flatMap((page) => page.followers) || [];

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
          <TabsContent value="following">
            <InfiniteScrollArea
              onBottomReached={() =>
                hasNextPage && !isFetching && fetchNextPage()
              }
              className={cn(`h-[200px] border-gray-200 px-4`)}
            >
              {followers.map((follow) => (
                <Followers
                  onClick={() => mutation.mutate(follow.id)}
                  key={follow.id}
                  avatarUrl={follow.avatarUrl}
                  displayName={follow.displayName}
                  username={follow.username}
                />
              ))}
              {isFetchingNextPage && (
                <Loader2 className="mx-auto my-3 animate-spin" />
              )}
            </InfiniteScrollArea>
          </TabsContent>
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
