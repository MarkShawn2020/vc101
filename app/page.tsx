import Hero from "@/components/hero";
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";

export default async function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <img src="/cs-magic_logo_1280.svg" alt="CS Magic Logo" className="w-32 h-32 mb-8" />
        <h1 className="text-4xl font-bold mb-4">Welcome to CS Magic</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Where Code Meets Magic | CS 魔法社
        </p>
      </div>
      <main className="flex-1 flex flex-col gap-4 md:gap-6 w-full">
        <h2 className="font-medium text-lg md:text-xl mb-2 md:mb-4">Get Started</h2>
        {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
      </main>
    </>
  );
}
