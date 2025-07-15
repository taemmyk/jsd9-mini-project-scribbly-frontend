import { useState, useEffect, useCallback, FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "@/components/contexts/user-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import api from "@/services/api";
import axios from "axios";

const User: FC = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [showPassword, setShowPassword] = useState(false);
  const [showLoginCard, setShowLoginCard] = useState(true);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const [registerError, setRegisterError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const switchCard = useCallback(() => {
    setShowLoginCard((prev) => !prev);
    setLoginError("");
    setRegisterError("");
  }, []);

  const handleLogin = async () => {
    try {
      const res = await api.post("/mongo/login", {
        email: loginEmail,
        password: loginPassword,
      });

      console.log("✅ Login success:", res.data);

      const userData = res.data.user;
      setUser(userData);

      navigate("/home");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("❌ Login error:", err.message);
        alert(err.message);
      }

      if (axios.isAxiosError(err)) {
        console.error("❌ Login error:", err.response?.data || err.message);
        alert(err.response?.data?.message || "Login failed");
      }
    }
  };

  useEffect(() => {
    setPasswordsMatch(signupPassword === confirmPassword);
  }, [signupPassword, confirmPassword]);

  const handleRegister = async () => {
    if (!passwordsMatch) return;

    setRegisterError("");
    setIsRegistering(true);

    try {
      const res = await api.post("/mongo/register", {
        name,
        email,
        password: signupPassword,
      });

      console.log("✅ Register success:", res.data);

      alert("Register successful! Please login.");
      setShowLoginCard(true);

      setName("");
      setEmail("");
      setSignupPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("❌ Register error:", err.response?.data || err.message);
        setRegisterError(err.response?.data?.message || "Register failed");
      } else if (err instanceof Error) {
        console.error("❌ Register error:", err.message);
        setRegisterError("Register failed: " + err.message);
      } else {
        console.error("❌ Unknown error:", err);
        setRegisterError("An unexpected error occurred");
      }
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      {showLoginCard ? (
        <Card className="w-1/2 bg-rose-50 border-2 border-rose-300">
          <CardHeader className="text-rose-800 text-2xl">
            <CardTitle>
              Landing to your{" "}
              <span
                style={{ fontFamily: '"Gluten", cursive' }}
                className="text-2xl"
              >
                Scribbly
              </span>
            </CardTitle>
            <CardDescription>
              Enter your email and password to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email" className="text-right text-rose-800">
                Email
              </Label>
              <Input
                id="email"
                type="text"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </div>
            <div className="space-y-1 relative">
              <Label
                htmlFor="login-password"
                className="text-right text-rose-800"
              >
                Password
              </Label>
              <Input
                id="login-password"
                type={showPassword ? "text" : "password"}
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <Button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-4 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                variant="ghost"
                size="icon"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </Button>
            </div>
            {loginError && <p className="text-red-600 text-sm">{loginError}</p>}
          </CardContent>
          <CardFooter>
            <div className="flex flex-col justify-start">
              <Button className="w-fit" onClick={handleLogin}>
                Login
              </Button>
              <Button variant="link" className="w-fit" onClick={switchCard}>
                Make Your Scribbly Account!
              </Button>
            </div>
          </CardFooter>
        </Card>
      ) : (
        <Card className="w-1/2 bg-rose-50 border-2 border-rose-300">
          <CardHeader className="text-rose-800 text-2xl">
            <CardTitle>
              Getting started with{" "}
              <span
                style={{ fontFamily: '"Gluten", cursive' }}
                className="text-2xl"
              >
                Scribbly
              </span>
            </CardTitle>
            <CardDescription>
              Create a new account to get started.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name" className="text-right text-rose-800">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email" className="text-right text-orange-800">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password" className="text-right text-orange-800">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label
                htmlFor="confirm-password"
                className="text-right text-orange-800"
              >
                Confirm Password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {!passwordsMatch && (
                <p className="text-rose-700 text-sm mt-1">
                  Passwords do not match.
                </p>
              )}
            </div>
            {registerError && (
              <p className="text-red-600 text-sm">{registerError}</p>
            )}
          </CardContent>
          <CardFooter>
            <div className="flex flex-col justify-start">
              <Button
                className="w-fit"
                disabled={!passwordsMatch || isRegistering}
                onClick={handleRegister}
              >
                {isRegistering ? "Registering..." : "Create My Account"}
              </Button>
              <Button variant="link" className="w-fit" onClick={switchCard}>
                Let me log in!
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default User;
