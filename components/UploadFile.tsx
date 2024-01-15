"use client";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/uploadthing";
import toast from "react-hot-toast";

interface UploadFileProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

const UploadFile = ({ onChange, endpoint }: UploadFileProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        console.log("Hi , I am in onClientUploadComplete function")
        onChange(res?.[0].url);
      }}
      onUploadError={(err: Error) => {
        toast.error(`${err?.message}`);
      }}
    />
  );
};

export default UploadFile;


