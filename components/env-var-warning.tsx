import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export function EnvVarWarning() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 w-full md:w-auto">
      <Badge 
        variant={"outline"} 
        className="font-normal text-xs md:text-sm w-full md:w-auto text-center md:text-left py-1.5"
      >
        Supabase environment variables required
      </Badge>
      <div className="flex gap-2 w-full md:w-auto justify-center md:justify-start">
        <Button
          asChild
          size="sm"
          variant={"outline"}
          disabled
          className="opacity-75 cursor-none pointer-events-none flex-1 md:flex-none min-w-[80px]"
        >
          <Link href="/sign-in">Sign in</Link>
        </Button>
        <Button
          asChild
          size="sm"
          variant={"default"}
          disabled
          className="opacity-75 cursor-none pointer-events-none flex-1 md:flex-none min-w-[80px]"
        >
          <Link href="/sign-up">Sign up</Link>
        </Button>
      </div>
    </div>
  );
}
