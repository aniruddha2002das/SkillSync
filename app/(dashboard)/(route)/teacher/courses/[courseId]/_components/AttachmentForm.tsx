"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { File, Loader2, PlusCircle, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";
import UploadFile from "@/components/UploadFile";

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});

const AttachmentForm = ({ initialData, courseId }: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { url: initialData?.imageUrl || "" },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Course attachments updated!");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Attachment deleted!");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setDeletingId(null);
    }
  };

  const toggleEdit = () => setIsEditing((current) => !current);

  return (
    <div className="mt-6 border bg-slate-50 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course attachments
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircle className=" h-4 w-4 mr-2" />
              Add a file
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className=" text-sm text-slate-500 italic">No Attachments</p>
          )}

          {initialData.attachments.length > 0 && (
            <div className=" space-y-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className=" flex items-center p-3 w-full bg-violet-100 border-violet-200 text-violet-700 rounded-md"
                >
                  <File className=" h-4 w-4 mr-2 flex-shrink-0" />
                  <p className=" text-xs line-clamp-1">{attachment.name}</p>

                  {deletingId === attachment.id ? (
                    <>
                      <div className="ml-auto">
                        <Loader2 className=" h-4 w-4 animate-spin" />
                      </div>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => onDelete(attachment.id)}
                        className=" ml-auto hover:opacity-75 transition"
                      >
                        <X className=" h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {isEditing && (
        <div>
          <UploadFile
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />

          <div className=" text-xs mt-4 text-muted-foreground">
            Add anything your students might need to complete the course.
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentForm;
