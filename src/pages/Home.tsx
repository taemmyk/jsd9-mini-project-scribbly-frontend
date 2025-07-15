import React, { useState, useEffect, ChangeEvent, FC } from "react";
import { NoteCard } from "@/components/note-card";
import Masonry from "react-masonry-css";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAllNotes } from "@/services/note.service";
import { Note } from "@/types/note";

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

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllNotes();
        setNotes(data.notes || []);
      } catch (err: any) {
        setError(err.message || "Failed to load notes.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredNotes = notes.filter((note) =>
    note.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div>Loading notes...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="min-h-28 flex items-end space-x-4 p-4 pt-12 bg-gradient-to-b from-rose-300 to-rose-200">
        <div className="flex-col space-y-2 flex-grow">
          <div className="flex space-x-2">
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
        <Button disabled>Search</Button>
      </div>

      <div className="m-4">
        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {filteredNotes.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </Masonry>
      </div>
    </>
  );
};

export default Home;
