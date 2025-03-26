import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
// import { Button } from "./ui/button";
export const Auth = () => {
  return (
    <div>
      <SignedOut>
        <SignInButton>
          {/* <Button>Sign in</Button> */}
          <div className="text-black">Sign in</div>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton></UserButton>
      </SignedIn>
    </div>
  );
};