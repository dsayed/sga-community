"use client";

import { useState } from "react";
import { PostComposerPrompt } from "./post-composer-prompt";
import { PostComposer } from "./post-composer";
import type { ForumCategory } from "@/lib/types";

export function ForumsClientWrapper({
  categories,
}: {
  categories: ForumCategory[];
}) {
  const [composerOpen, setComposerOpen] = useState(false);

  return (
    <>
      <PostComposerPrompt onClick={() => setComposerOpen(true)} />
      <PostComposer
        categories={categories}
        isOpen={composerOpen}
        onClose={() => setComposerOpen(false)}
      />
    </>
  );
}
