import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
        where: {
            id: params.courseId,
            userId: userId,
        }
    })

    if (!course) {
        return new Response("Not Found", { status: 404 });
    }
    
    const unpublishedCourse = await db.course.update({
        where: {
            id: params.courseId,
            userId: userId,
        },
        data: {
            isPublished: false
        }
    })

    return NextResponse.json(unpublishedCourse);
  } catch (error) {
    console.log("[CourseId_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
