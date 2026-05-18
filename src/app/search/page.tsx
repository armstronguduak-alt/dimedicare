import { Suspense } from "react";
import SearchClient from "./SearchClient";

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    }>
      <SearchClient />
    </Suspense>
  );
}
