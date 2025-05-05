import React from "react";
import { NoteCard } from "@/components/note-card";
import Masonry from "react-masonry-css";

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
  return (
    <div className="m-4">
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {noteData.map((note, index) => (
          <NoteCard key={index} note={note} />
        ))}
      </Masonry>
    </div>
  );
}

export default Home;
