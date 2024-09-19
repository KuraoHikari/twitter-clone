import { Attachment } from "@/hooks/useMediaUpload";
import AttachmentPreview from "./AttachmentPreview";
import { cn } from "@/lib/utils";

interface AttachmentListPreviewsProps {
  attachments: Attachment[];
  removeAttachment: (fileName: string) => void;
}

export default function AttachmentListPreviews({
  attachments,
  removeAttachment,
}: AttachmentListPreviewsProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        attachments.length > 1 && "sm:grid sm:grid-cols-2",
      )}
    >
      {attachments.map((attachment) => (
        <AttachmentPreview
          key={attachment.file.name}
          attachment={attachment}
          onRemoveClick={() => removeAttachment(attachment.file.name)}
        />
      ))}
    </div>
  );
}
