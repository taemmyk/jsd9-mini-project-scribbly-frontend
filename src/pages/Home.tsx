// home.tsx
import { useState, useEffect, useContext, ChangeEvent, FC, useCallback } from "react";
import { NoteCard } from "@/components/note-card";
import Masonry from "react-masonry-css";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { getNotesByMe, getNotesByTag } from "@/services/note.service";
import { Note } from "@/types/note";
import UserContext from "../components/contexts/user-context";
import { useParams } from "react-router-dom";

const breakpoints = {
  default: 3,
  640: 1,
  768: 2,
  1024: 2,
};

const Home: FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useContext(UserContext);
  const { tag } = useParams();

  const fetchNotes = useCallback(async () => {
    if (!user?._id) return;
    setLoading(true);
    setError(null);
    try {
      const data = tag
        ? await getNotesByTag(tag)
        : await getNotesByMe(user._id);

      const notesArray: Note[] = data.notes || [];

      const sortedNotes = notesArray.sort((a: Note, b: Note) => {
        return (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0);
      });

      setNotes(sortedNotes);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load notes.");
    } finally {
      setLoading(false);
    }
  }, [tag, user?._id]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div>Loading notes...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="min-h-28 flex items-end space-x-4 p-4 pt-12 bg-gradient-to-b from-rose-300 to-rose-200">
        <div className="flex-col space-y-2 flex-grow">
          <div className="flex space-x-2 items-center">
            <Search className="h-4 w-4 text-gray-500" />
            <Label htmlFor="query">Search</Label>
          </div>
          <Input
            type="text"
            id="query"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="h-8 px-4">
        {tag ? (
          <p className="text-2xl">Notes with #{tag}</p>
        ) : (
          <p className="text-2xl">All Notes</p>
        )}
      </div>

      <div className="m-4">
        {filteredNotes.length > 0 ? (
          <Masonry
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {filteredNotes.map((note) => (
              <NoteCard key={note._id} note={note} onUpdated={fetchNotes} />
            ))}
          </Masonry>
        ) : (
          <p className="text-center">No note yet</p>
        )}
      </div>
    </>
  );
};

export default Home;
