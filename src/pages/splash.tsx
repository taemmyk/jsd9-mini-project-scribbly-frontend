import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "@/components/contexts/user-context";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { WordRotate } from "@/components/magicui/word-rotate";
import { Button } from "@/components/ui/button";

function Splash() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log("🔍 UserContext from splash:", user);

    // Redirect only if user is truly logged in
    if (user && user.name && user.email) {
      navigate("/home");
    }
  }, [user, navigate]);

  const handleGetStartedClick = () => {
    navigate("/user");
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-y-3">
      <TypingAnimation
        style={{ fontFamily: '"Gluten", cursive' }}
        className="text-9xl text-rose-400"
      >
        Scribbly
      </TypingAnimation>
      <WordRotate
        className="text-6xl font-bold text-rose-800"
        words={["Think it.", "Note it.", "Find it."]}
      />
      <h2 className="text-3xl text-rose-800">
        Jot down notes, tasks, and ideas—all in one simple place.
      </h2>
      <Button onClick={handleGetStartedClick}>Get Started</Button>
    </div>
  );
}

export default Splash;