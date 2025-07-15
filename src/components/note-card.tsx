import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pin, Pencil, Trash, Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { updateNotePin, updateNotePublic, deleteNote } from "@/services/note.service";
import { Note } from "@/types/note";

export function NoteCard({
  note ,
}: {
  note: {
    _id: string;
    title: string;
    content: string;
    tags: string[];
    userId: string;
    isPinned: boolean;
    isPublic: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
}) {
  const [isPinned, setIsPinned] = useState(note.isPinned);
  const [isPublic, setIsPublic] = useState(note.isPublic);

  const handlePinToggle = async () => {
    const newPinned = !isPinned;
    setIsPinned(newPinned);
    try {
      await updateNotePin(note._id, { isPinned: newPinned });
    } catch (err) {
      console.error("Failed to update pin status", err);
      setIsPinned(!newPinned);
    }
  };

  const handlePublicToggle = async () => {
    const newPublic = !isPublic;
    setIsPublic(newPublic);
    try {
      await updateNotePublic(note._id, { isPublic: newPublic });
    } catch (err) {
      console.error("Failed to update public status", err);
      setIsPublic(!newPublic); // rollback if fail
    }
  };

  const handleDelete = async () => {
    try {
      await deleteNote(note._id);
      // setOpenDialog(false);
      // Optionally: refresh or notify parent to remove the note from UI
    } catch (err) {
      console.error("Failed to delete note", err);
    }
  };
  return (
    <Card className="w-full bg-rose-200 border-2 border-rose-300">
      <CardHeader>
        <CardTitle className="text-rose-800 text-2xl">{note.title}</CardTitle>
        <CardDescription className="text-rose-500">
          {note.tags.map((tag) => `#${tag}`).join(" ")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{note.content}</p>
      </CardContent>
      <CardFooter>
        <div className="block w-full">
          <Separator className="bg-rose-300" />
          <div className="flex justify-between items-center">
            <p className="italic font-semibold">
              {new Date(note.createdAt).toLocaleDateString()}
            </p>
            <div className="flex justify-end-safe items-center space-x-2">
              <Toggle
                pressed={isPinned}
                onPressedChange={handlePinToggle}
                aria-label={isPinned ? "Unpin note" : "Pin note"}
                className="border-0 hover:bg-rose-400 hover:text-rose-50 data-[state=off]:bg-rose-300 data-[state=off]:text-rose-950 data-[state=on]:bg-transparent data-[state=on]:text-rose-950 data-[state=on]:hover:bg-rose-400 data-[state=on]:hover:text-rose-50 data-[state=off]:hover:bg-rose-400 data-[state=off]:hover:text-rose-50"
              >
                <Pin className="h-4 w-4" />
              </Toggle>
              <Toggle
                pressed={isPublic}
                onPressedChange={handlePublicToggle}
                aria-label={isPublic ? "Private note" : "Public note"}
                className="border-0 hover:bg-rose-400 hover:text-rose-50 data-[state=off]:bg-rose-300 data-[state=off]:text-rose-950 data-[state=on]:bg-transparent data-[state=on]:text-rose-950 data-[state=on]:hover:bg-rose-400 data-[state=on]:hover:text-rose-50 data-[state=off]:hover:bg-rose-400 data-[state=off]:hover:text-rose-50"
              >
                {isPublic ? (
                  <Unlock className="h-4 w-4" />
                ) : (
                  <Lock className="h-4 w-4" />
                )}
              </Toggle>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Edit note"
                className="border-0"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Delete note"
                className="border-0"
                onClick={handleDelete}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
