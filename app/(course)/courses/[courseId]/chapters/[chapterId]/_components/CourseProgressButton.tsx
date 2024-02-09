"use client";

import { Button } from "@/components/ui/Button";
import { useConfettiStore } from "@/hooks/useConfettiStore";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseProgressButtonProps {
  courseId: string;
  chapterId: string;
  isCompleted?: boolean;
  nextChapterId?: string;
}

const CourseProgressButton = ({
  courseId,
  chapterId,
  isCompleted,
  nextChapterId,
}: CourseProgressButtonProps) => {
  const Icon = isCompleted ? XCircle : CheckCircle;

  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onClick = async () => {
    try {
        setIsLoading(true);
        await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`,{
            isCompleted: !isCompleted
        });

        // If there is no NextChapterId, then we are on the last chapter 
        // So we mark the course as completed
        if(!isCompleted && !nextChapterId) {
            confetti.onOpen();
        }

        if(!isCompleted && nextChapterId) {
            router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
        }

        toast.success("Progress updated.")
        router.refresh()

    } catch (error) {
        toast.error("Something went wrong.")
    }
    finally {
        setIsLoading(false)
    }
  }

  return (
    <Button
      type="button"
      variant={isCompleted ? "outline" : "success"}
      className=" w-full md:w-auto"
      onClick={onClick}
      disabled={isLoading}
    >
      {isCompleted ? "Not Completed" : "Mark as completed"}
      <Icon className=" h-4 w-4 ml-2" />
    </Button>
  );
};

export default CourseProgressButton;
