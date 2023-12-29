import { Button } from '@/components/ui/Button'
import { UserButton } from "@clerk/nextjs";
import Image from 'next/image'

export default function Home() {
  return (
    <div className="h-screen">
      <UserButton afterSignOutUrl="/"/>
    </div>
  )
}
