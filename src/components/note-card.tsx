// note-card.tsx
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pin, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function NoteCard({
  note,
}: {
  note: { title: string; tags: string[]; content: string };
}) {
  return (
    <Card className="w-full bg-rose-200 border-rose-300 border-2">
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
          <div className="flex justify-between">
            <p className="italic">{new Date().toLocaleDateString()}</p>
            <div className="flex justify-end-safe items-center space-x-2">
              <Button variant="outline" size="icon" aria-label="Pin note" className="border-0 :hover:text-teal-500">
                <Pin className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" aria-label="Edit note" className="border-0 :hover:text-teal-500">
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" aria-label="Delete note" className="border-0 :hover:text-teal-500">
                <Trash className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
