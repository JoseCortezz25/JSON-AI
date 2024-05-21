"use client";
import { examples } from "@/lib/data";
import { Badge } from "../ui/badge";
import GenerateForm from "./generate-form";


const JSONGenerateSection = () => {
  return (
    <section className="w-full flex justify-center" id="form-section">
      <div className="flex flex-col items-center pt-16 sm:pt-24 md:pt-36 pb-10 w-full max-w-4xl gap-8 px-4 sm:px-6 lg:px-0">
        <div className="flex flex-col w-full">
          <h2 className="scroll-m-20 text-4xl tracking-tight lg:text-5xl !text-3xl font-semibold !mb-0">
            Establece tu estructura<br />
            Comienza a crear mocks en JSON.
          </h2>
          <p className="[&:not(:first-child)]:mt-6 text-xl text-muted-foreground !mt-2 mb-2">
            Puedes definir los campos de tu objeto para devolver exactamente lo mismo desde la AI.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm text-muted-foreground">Puedes seleccionar uno de los formatos de ejemplo a continuación.</h3>
          <div className="flex flex-wrap gap-2">
            {examples.slice(0, 6).map((example) => (
              <Badge variant="outline" key={example.id}>{example.label}</Badge>
            ))}
          </div>
        </div>

        <div className="w-full sm:mb-[9rem]">
          <div className="max-w-4xl mx-auto">
            <GenerateForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default JSONGenerateSection;