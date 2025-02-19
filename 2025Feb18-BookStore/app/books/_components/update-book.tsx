"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Form from "./form"


export function UpdateExistingBook(id: { id: string }) {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Update Book</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Book</DialogTitle>
          <DialogDescription>
            Update an existing book
          </DialogDescription>
        </DialogHeader>
        <Form id={id.id} />
      </DialogContent>
    </Dialog >
  )
}
