import { cn } from "@/lib/utils";
import { Progress } from "./ui/Progress";

interface CourseProgressProps {
  variant?: "success" | "default";
  value: number;
  size?: "default" | "sm";
}

const colorByVariant = {
  default: "text-violet-500",
  success: "text-violet-700",
};

const sizeByVariant = {
  default: "text-sm",
  sm: "text-xs",
};

const CourseProgress = ({ value, variant, size }: CourseProgressProps) => {
  return (
    <div>
      <Progress className=" h-2" value={value} variant={variant} />
      <p
        className={cn(
          "font-medium mt-2 text-violet-700",
          colorByVariant[variant || "default"],
          sizeByVariant[size || "default"]
        )}
      >
        {Math.round(value)}% Complete
      </p>
    </div>
  );
};

export default CourseProgress;
