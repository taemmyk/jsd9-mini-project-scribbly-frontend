import { useState, useEffect, useCallback, ChangeEvent, FC } from "react";
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

const User: FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showLoginCard, setShowLoginCard] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const switchCard = useCallback(() => {
    setShowLoginCard((prev) => !prev);
  }, []);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  useEffect(() => {
    setPasswordsMatch(password === confirmPassword);
  }, [password, confirmPassword]);

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
              Enter your username and password to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="username" className="text-right text-rose-800">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="your@email.com"
                className="col-span-3"
              />
            </div>
            <div className="space-y-1 relative">
              <Label htmlFor="login-password" className="text-right text-rose-800">
                Password
              </Label>
              <Input
                id="login-password"
                type={showPassword ? "text" : "password"}
                className="col-span-3"
              />
              <Button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-4 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                variant="ghost"
                size="icon"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex flex-col justify-start">
              <Button className="w-fit">Login</Button>
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
                placeholder="John Doe"
                className="col-span-3"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email" className="text-right text-orange-800">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="col-span-3"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password" className="text-right text-orange-800">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                className="col-span-3"
                onChange={handlePasswordChange}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="confirm-password" className="text-right text-orange-800">
                Confirm Password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                className="col-span-3"
                onChange={handleConfirmPasswordChange}
              />
              {!passwordsMatch && (
                <p className="text-rose-700 text-sm mt-1">
                  Passwords do not match.
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex flex-col justify-start">
              <Button className="w-fit" disabled={!passwordsMatch}>
                Create My Account
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