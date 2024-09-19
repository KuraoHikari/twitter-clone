"use client";

import Loading from "@/components/ImageLoading";
import { Media } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

interface MediaPreviewProps {
  media: Media;
}

export default function MediaPreview({ media }: MediaPreviewProps) {
  const [loading, setLoading] = useState(true);

  if (media.type === "IMAGE") {
    return (
      <div className="">
        {loading && <Loading />}
        <Image
          src={media.url}
          alt="Attachment"
          width={500}
          height={500}
          className={`mx-auto size-fit max-h-[30rem] rounded-2xl ${loading ? "opacity-0" : "opacity-100"}`}
          onLoadingComplete={() => setLoading(false)} // Trigger when the image is loaded
        />
      </div>
    );
  }

  if (media.type === "VIDEO") {
    return (
      <div className="relative">
        {loading && <Loading />}
        <video
          src={media.url}
          controls
          className="mx-auto size-fit max-h-[30rem] rounded-2xl"
          onLoadedData={() => setLoading(false)}
        />
      </div>
    );
  }

  return <p className="text-destructive">Unsupported media type</p>;
}
