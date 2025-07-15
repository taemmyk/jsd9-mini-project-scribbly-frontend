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

  const handlePinToggle = () => {
    setIsPinned(!isPinned);
    console.log(`Toggling pin for note: ${note._id}`);
  };

  const handlePublicToggle = () => {
    setIsPublic(!isPublic);
    console.log(`Toggling public status for note: ${note._id}`);
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
