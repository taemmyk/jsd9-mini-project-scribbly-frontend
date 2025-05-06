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
  note,
}: {
  note: { title: string; tags: string[]; content: string };
}) {
  const [isPinned, setIsPinned] = useState(false);
  const [isPublic, setIsPublic] = useState(true);

  const handlePinToggle = () => {
    setIsPinned(!isPinned);
  };

  const handlePublicToggle = () => {
    setIsPublic(!isPublic);
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
            <p className="italic">{new Date().toLocaleDateString()}</p>
            <div className="flex justify-end-safe items-center space-x-2">
              <Toggle
                pressed={isPinned}
                onPressedChange={handlePinToggle}
                aria-label={isPinned ? "Unpin note" : "Pin note"}
                className="border-0 hover:bg-rose-400 hover:text-rose-50 data-[state=on]:bg-rose-300 data-[state=on]:text-rose-95"
              >
                <Pin className="h-4 w-4" />
              </Toggle>
              <Toggle
                pressed={isPublic}
                onPressedChange={handlePublicToggle}
                aria-label={isPublic ? "Private note" : "Public note"}
                className="border-0 hover:bg-rose-400 hover:text-rose-50 data-[state=on]:bg-rose-300 data-[state=on]:text-rose-950"
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
