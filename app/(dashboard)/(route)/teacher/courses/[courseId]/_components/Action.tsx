"use client";

import ConfirmModal from "@/components/modals/ConfirmModal";
import { Button } from "@/components/ui/Button";
import { useConfettiStore } from "@/hooks/useConfettiStore";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ActionProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

const Action = ({
  disabled,
  courseId,
  isPublished,
}: ActionProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const confetti = useConfettiStore();

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}`);
      toast.success("Course deleted");
      router.push(`/teacher/courses`);
      router.refresh();
      setIsLoading(false);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(
          `/api/courses/${courseId}/unpublish`
        );
        toast.success("Course unpublished");
      } else {
        await axios.patch(
          `/api/courses/${courseId}/publish`
        );
        toast.success("Course published");
        confetti.onOpen();
      }

      router.refresh();

      setIsLoading(false);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>

      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className=" h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default Action;
