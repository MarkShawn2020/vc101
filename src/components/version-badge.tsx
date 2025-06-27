"use client";

import { Badge } from "@/components/ui/badge";
import { getVersion } from "@/lib/version";

export default function VersionBadge() {
  const version = getVersion();
  
  return (
    <Badge variant="outline" className="text-xs font-mono">
      v{version}
    </Badge>
  );
}