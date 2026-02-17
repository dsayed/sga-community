"use client";

interface PostComposerPromptProps {
  onClick?: () => void;
}

export function PostComposerPrompt({ onClick }: PostComposerPromptProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
      className="bg-white mx-4 mb-3 rounded-md p-3 flex items-center gap-2.5 shadow-sm cursor-pointer border border-dashed border-sga-border"
    >
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-sga-orange-light flex items-center justify-center text-sm">
        &#x1F43E;
      </div>

      {/* Prompt text */}
      <span className="text-[13px] text-sga-text-secondary flex-1">
        What&apos;s happening with your foster?
      </span>

      {/* Icons */}
      <div className="ml-auto flex gap-2 text-base opacity-40">
        <span>&#x1F4F7;</span>
        <span>&#x1F3A5;</span>
      </div>
    </div>
  );
}
