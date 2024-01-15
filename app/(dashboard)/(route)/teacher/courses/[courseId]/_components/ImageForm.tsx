"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import Image from "next/image";
import UploadFile from "@/components/UploadFile";

interface ImageFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, { message: "Image is required" }),
});

const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { imageUrl: initialData?.imageUrl || "" },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course image updated!");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const toggleEdit = () => setIsEditing((current) => !current);

  return (
    <div className="mt-6 border bg-slate-50 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course image
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className=" h-4 w-4 mr-2" />
              Add Image
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className=" h-4 w-4 mr-2" />
              Edit Image
            </>
          )}
        </Button>
      </div>

      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className=" flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon />
          </div>
        ) : (
          <div className=" relative aspect-video mt-2">
            <Image
              alt="Upload"
              src={initialData.imageUrl}
              fill
              className=" object-cover rounded-md"
            />
          </div>
        ))}

      {isEditing && (
        <div>
          <UploadFile
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />

          <div className=" text-xs mt-4 text-muted-foreground">
            16:9 aspect ratio recommended 
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageForm;
