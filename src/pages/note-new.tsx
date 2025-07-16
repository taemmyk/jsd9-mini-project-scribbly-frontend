import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Pin, Lock, Unlock } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import api from "@/services/api";
import { useNavigate } from "react-router-dom";

const NoteNew = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string>("");
  const [isPinned, setIsPinned] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title || !content) {
      setError("Title and content are required.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const payload = {
        title,
        content,
        tags: tags.split(",").map((tag) => tag.trim()),
        isPinned,
        isPublic,
      };

      await api.post("/mongo/notes", payload);
      navigate("/home");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 mx-auto">
      <div className="flex items-center space-x-2">
        <h2 className="text-2xl font-bold mb-4">Create a New Note</h2>
        <Toggle
          aria-label="Toggle isPinned"
          pressed={isPinned}
          onPressedChange={setIsPinned}
          className="border-0 hover:bg-rose-400 hover:text-rose-50 data-[state=off]:bg-transparent data-[state=off]:text-rose-950 data-[state=on]:bg-rose-300 data-[state=on]:text-rose-950 data-[state=on]:hover:bg-rose-400 data-[state=on]:hover:text-rose-50 data-[state=off]:hover:bg-rose-400 data-[state=off]:hover:text-rose-50"
        >
          <Pin />
        </Toggle>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              aria-label="Toggle isPublic"
              pressed={isPublic}
              onPressedChange={setIsPublic}
              className="border-0 hover:bg-rose-400 hover:text-rose-50 data-[state=off]:bg-transparent data-[state=off]:text-rose-950 data-[state=on]:bg-rose-300 data-[state=on]:text-rose-950 data-[state=on]:hover:bg-rose-400 data-[state=on]:hover:text-rose-50 data-[state=off]:hover:bg-rose-400 data-[state=off]:hover:text-rose-50"
            >
              {isPublic ? <Unlock /> : <Lock />}
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            {isPublic
              ? "This note is currently public"
              : "This note is now private"}
          </TooltipContent>
        </Tooltip>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title" className="mb-2">
            Title
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="content" className="mb-2">
            Content
          </Label>
          <Textarea
            id="content"
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="tags" className="mb-2">
            Tags
          </Label>
          <Input
            id="tags"
            placeholder="Enter tags separated by commas"
            value={tags}
            onChange={(e) => {
              const raw = e.target.value;
              const cleaned = raw.toLowerCase();
              setTags(cleaned);
            }}
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Create Note"}
        </Button>
      </form>
    </div>
  );
};

export default NoteNew;
