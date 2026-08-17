import React from "react";
import TermsPage, { metadata as termsMetadata } from "../terms/page";

export const metadata = {
  ...termsMetadata,
  title: "Terms of Use — AiX Media",
  alternates: { canonical: "/terms" },
};

export default function TermsOfUsePage() {
  return <TermsPage />;
}
