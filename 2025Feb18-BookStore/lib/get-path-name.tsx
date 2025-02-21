'use client'
import { usePathname } from "next/navigation";

export function GetPathName() {
  const pathName = usePathname();

  return (
    <>
      <span>{pathName}</span>
    </>
  )

}
