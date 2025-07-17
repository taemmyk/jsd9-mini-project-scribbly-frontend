import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pin, Pencil, Trash, Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import {
  updateNotePin,
  updateNotePublic,
  deleteNote,
  editNote,
} from "@/services/note.service";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { Note } from "@/types/note";

type NoteCardProps = {
  note: Note;
  onUpdated?: () => void; // callback to refresh note list
};

export const NoteCard: React.FC<NoteCardProps> = ({ note, onUpdated }) => {
  const [isPinned, setIsPinned] = useState(note.isPinned);
  const [isPublic, setIsPublic] = useState(note.isPublic);
  const [openDialog, setOpenDialog] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);
  const [editTags, setEditTags] = useState(note.tags.join(", "));
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const handlePinToggle = async () => {
    const newPinned = !isPinned;
    setIsPinned(newPinned);
    try {
      await updateNotePin(note._id, { isPinned: newPinned });
      onUpdated?.();
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
      onUpdated?.();
    } catch (err) {
      console.error("Failed to update public status", err);
      setIsPublic(!newPublic);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteNote(note._id);
      setOpenDialog(false);
      onUpdated?.();
    } catch (err) {
      console.error("Failed to delete note", err);
    }
  };

  const handleEditSubmit = async () => {
    try {
      await editNote(note._id, {
        title: editTitle,
        content: editContent,
        tags: editTags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      });
      setOpenEditDialog(false);
      onUpdated?.();
    } catch (err) {
      console.error("Failed to update note", err);
    }
  };

  return (
    <Card className="w-full bg-rose-200 border-2 border-rose-300">
      <CardHeader>
        <CardTitle
          className={`text-rose-800 text-2xl py-1 pl-2 rounded-lg ${
            isPinned ? "bg-rose-300" : ""
          }`}
        >
          {note.title}
        </CardTitle>
        <CardDescription className="text-rose-500">
          {note.tags.map((tag) => `#${tag}`).join(" ")}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p>{note.content}</p>
      </CardContent>

      <CardFooter>
        <div className="block w-full">
          <Separator className="bg-rose-300 mb-2" />
          <div className="flex justify-between items-center">
            <p className="italic font-semibold text-sm text-rose-600">
              {new Date(note.createdAt).toLocaleDateString()}
            </p>
            <div className="flex items-center space-x-2">
              <Toggle
                pressed={isPinned}
                onPressedChange={handlePinToggle}
                aria-label={isPinned ? "Unpin note" : "Pin note"}
                className="border-0 hover:bg-rose-400 hover:text-rose-50 data-[state=off]:bg-transparent data-[state=off]:text-rose-950 data-[state=on]:bg-rose-300 data-[state=on]:text-rose-950"
              >
                <Pin className="h-4 w-4" />
              </Toggle>

              <Toggle
                pressed={isPublic}
                onPressedChange={handlePublicToggle}
                aria-label={isPublic ? "Private note" : "Public note"}
                className="border-0 hover:bg-rose-400 hover:text-rose-50 data-[state=off]:bg-transparent data-[state=off]:text-rose-950 data-[state=on]:bg-rose-300 data-[state=on]:text-rose-950"
              >
                {isPublic ? (
                  <Unlock className="h-4 w-4" />
                ) : (
                  <Lock className="h-4 w-4" />
                )}
              </Toggle>

              {/* Edit Note Dialog */}
              <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="border-0">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent aria-describedby="">
                  <DialogHeader>
                    <DialogTitle>Edit Note</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        rows={6}
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="tags">Tags</Label>
                      <Input
                        id="tags"
                        placeholder="tag1, tag2"
                        value={editTags}
                        onChange={(e) => setEditTags(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" onClick={() => setOpenEditDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleEditSubmit}>Save</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Delete Note Dialog */}
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="border-0">
                    <Trash className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent aria-describedby="">
                  <DialogHeader>
                    <DialogTitle>
                      Confirm Deletion of "{note.title}"
                    </DialogTitle>
                    <p>Are you sure you want to delete this note?</p>
                  </DialogHeader>
                  <div className="flex justify-end space-x-2 pt-2">
                    <Button variant="ghost" onClick={() => setOpenDialog(false)}>
                      Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleDelete}>
                      Delete
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
