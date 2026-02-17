"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useEffect, useCallback } from "react";

interface SearchBarProps {
  defaultValue?: string;
}

export function SearchBar({ defaultValue = "" }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Initialize input value from defaultValue
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = defaultValue;
    }
  }, [defaultValue]);

  const navigate = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value.trim()) {
        params.set("q", value.trim());
      } else {
        params.delete("q");
      }
      const qs = params.toString();
      router.push(qs ? `/library?${qs}` : "/library");
    },
    [router, searchParams]
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => navigate(value), 300);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      navigate(e.currentTarget.value);
    }
  }

  return (
    <div className="mx-4 mt-4 relative">
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base opacity-40">
        🔍
      </span>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search articles, videos, resources..."
        defaultValue={defaultValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="w-full py-3 px-4 pl-10 border border-sga-border rounded-md text-sm bg-white"
      />
    </div>
  );
}
