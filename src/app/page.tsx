"use client";

import { Editor } from "@/components/Editor/Editor";
import NonSSRWrapper from "@/components/NonSSRWrapper/NonSSRWrapper";
import { isSSR } from "@/components/NonSSRWrapper/NonSSRWrapper";

export default function Home() {
  return (
    <div className="flex flex-col h-full w-full items-center justify-center">
      <NonSSRWrapper>
        {!isSSR() && <Editor />}
      </NonSSRWrapper>
    </div>
  );
}
