import React, { useState, useEffect, useRef } from "react";
import { NoteCard } from "@/components/note-card";
import Masonry from "react-masonry-css";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { CalendarIcon, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { getAllNotes } from "../services/api";

const noteData = [
  {
    title: "My First Note",
    tags: ["thoughts", "personal"],
    content:
      "This is the content of my very first note. It might be a bit short, but it holds some important ideas that I don't want to forget.",
  },
  {
    title: "Grocery List",
    tags: ["shopping", "chores"],
    content:
      "Milk, eggs, bread, cheese, and some fruits. Don't forget to buy some snacks too!",
  },
  {
    title: "Book Recommendation",
    tags: ["reading", "fiction", "scifi"],
    content:
      "Just finished reading 'Dune' and it was absolutely amazing! The world-building is incredible, and the story is so engaging. Highly recommend it to any sci-fi fans.",
  },
  {
    title: "Project Ideas",
    tags: ["development", "ideas", "webdev"],
    content:
      "Thinking about building a personal website or maybe a small note-taking app. Need to brainstorm some more features and decide on the tech stack.",
  },
  {
    title: "Travel Plans",
    tags: ["travel", "vacation", "planning"],
    content:
      "Dreaming of a trip to Japan next year. Need to start saving up and researching potential destinations and activities. So exciting!",
  },
];

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
      <div className="min-h-28 flex space-x-4 p-4 pt-12 bg-gradient-to-b from-rose-300 to-rose-200">
        <div className="flex-col space-y-2 flex-grow">
          <div className="flex space-x-2">
            <Search className="h-4 w-4 text-gray-500" />
            <Label htmlFor="query">Search</Label>
          </div>
          <Input type="text" id="query" placeholder="Search" />
        </div>
        <div className="flex-col space-y-2">
          <Label htmlFor="query" className="text-nowrap">
            Start date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {startDate ? (
                  format(startDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex-col space-y-2">
          <Label htmlFor="query" className="text-nowrap">
            End date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="m-4">
        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {noteData.map((note, index) => (
            <NoteCard key={index} note={note} />
          ))}
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </Masonry>
      </div>
    </>
  );
}

export default Home;
