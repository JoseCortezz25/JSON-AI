"use client";
import Linear from "@/components/common/linear";
import Banner from "@/components/common/banner";
import JSONGenerateSection from "@/components/common/json-generate-section";
import Examples from "@/components/common/examples";
import { jsonExample, typeJSONExample } from "@/lib/data";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Label } from "@/components/ui/label";

export default function Home() {
  return (
    <main>
      <Banner />
      <Linear />
      <JSONGenerateSection />
      <section className="w-full flex justify-center">
        <div className="flex flex-col items-center pt-16 sm:pt-24 md:pt-36 pb-10 w-full max-w-4xl gap-8 px-4 sm:px-6 lg:px-0">
          <div className="flex flex-col w-full">
            <h2 className="scroll-m-20 text-4xl tracking-tight lg:text-5xl !text-3xl font-semibold !mb-0">
              Convierte types a mocks en JSON<br />
              Para realizar pruebas de tus aplicaciones.
            </h2>
            <p className="[&:not(:first-child)]:mt-6 text-xl text-muted-foreground !mt-2 mb-4">
              Puedes pasar el código de tus types y obtener un mocks como lo deseas con AI.
            </p>
          </div>
          <div className="flex w-full gap-8 flex-col md:flex-row">
            <div className="preview-box">
              <Label className="absolute top-4 right-4 text-neutral-700">Input</Label>
              <SyntaxHighlighter language="ts">
                {typeJSONExample}
              </SyntaxHighlighter>
            </div>
            <div className="preview-box">
              <Label className="absolute top-4 right-4 text-neutral-700">Output</Label>
              <SyntaxHighlighter language="json">
                {jsonExample}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      </section>
      <Linear />
      <Examples />
    </main>
  );
}
