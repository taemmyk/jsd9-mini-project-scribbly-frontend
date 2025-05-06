import React, { useState, useEffect, useRef } from "react";
import { NoteCard } from "@/components/note-card";
import Masonry from "react-masonry-css";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { getAllNotes } from "../services/api";

const breakpoints = {
  default: 3,
  640: 1,
  768: 2,
  1024: 2,
};

function Home() {
  const [notes, setNotes] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllNotes();
        setNotes(data.notes || []);
      } catch (err) {
        setError(err.message || "Failed to load notes.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  // Event handler for search input
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    // TODO: implement your search filtering logic
  };

  // Event handlers for date pickers
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  if (loading) {
    return <div>Loading notes...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="min-h-28 flex items-end space-x-4 p-4 pt-12 bg-gradient-to-b from-rose-300 to-rose-200">
        <div className="flex-col space-y-2 flex-grow">
          <div className="flex space-x-2">
            <Search className="h-4 w-4 text-gray-500" />
            <Label htmlFor="query">Search</Label>
          </div>
          <Input type="text" id="query" placeholder="Search" />
        </div>
        <Button>Search</Button>
      </div>
      <div className="m-4">
        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </Masonry>
      </div>
    </>
  );
}

export default Home;
