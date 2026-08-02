"use client";

import { ArrowRight } from "lucide-react";
import { type FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p
        role="status"
        className="border border-border bg-background px-4 py-3 text-center text-sm text-muted-foreground"
      >
        Subscription received. Email delivery connects in a later phase.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 sm:flex-row"
      aria-label="Newsletter subscription"
    >
      <Input
        type="email"
        name="email"
        required
        placeholder="Email address"
        aria-label="Email address"
        autoComplete="email"
        className="h-11 flex-1 border-border bg-background px-4"
      />
      <Button type="submit" className="h-11 px-5">
        Subscribe
        <ArrowRight data-icon="inline-end" />
      </Button>
    </form>
  );
}
