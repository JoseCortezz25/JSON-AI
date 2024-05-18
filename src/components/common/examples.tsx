import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import { examples } from "@/lib/data";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { Button } from "../ui/button";
import { toast } from "sonner";

const ExampleCard = ({ label }: { label: string }) => {
  return (
    <div className="group min-w-[256px] w-[256px] border flex items-center justify-center border-primary/20 rounded p-4 cursor-pointer hover:border-muted-foreground hover:shadow-md transition-colors">
      <p className="[&:not(:first-child)]:mt-6 group-hover:text-primary text-primary/70 line-clamp-2 leading-tight">
        {label}
      </p>
    </div>
  );
};

const Examples = () => {
  const onCopy = (json: string) => {
    navigator.clipboard.writeText(json);
    toast.success("JSON copied to clipboard");
  };

  return (
    <section className="flex justify-center">
      <div className="flex flex-col pt-16 sm:pt-24 md:pt-36 pb-36 w-full max-w-4xl gap-8 px-4 sm:px-6 lg:px-0">
        <div>
          <h2 className="scroll-m-20 text-4xl tracking-tight lg:text-5xl !text-3xl font-semibold !mb-0">Algunos ejemplos</h2>
          <p className="[&:not(:first-child)]:mt-6 text-xl text-muted-foreground !mt-2 mb-8">
            Puedes ver más ejemplos. Selecciona uno de los siguientes items para ver más detalles.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          {examples.map(example => (
            <Dialog key={example.id} >
              <DialogTrigger>
                <ExampleCard label={example.label} />
              </DialogTrigger>
              <DialogContent className="rounded-lg flex flex-col w-[95%] min-w-[90%] h-[80dvh] md:h-[auto] md:min-w-[60%] md!w-[60%] max-w-max">
                <h3 className="leading-7 [&:not(:first-child)]:mt-6 text-black dark:text-white">{example.label}</h3>
                <div className="relative mt-5 scrollbar-hide overflow-auto md:max-h-[400px] shadow-sm min-h-[350px] border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 w-full rounded-lg p-1">
                  <div className="absolute right-3 top-3 flex items-center justify-end gap-2 z-[2]">
                    <span className="bg-neutral-100 dark:bg-neutral-900 inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground h-8 rounded-md">
                      {example.result.split('}').length - 1} items
                    </span>
                    <Button
                      onClick={() => onCopy(example.result)}
                      variant="ghost"
                      className=" bg-neutral-100 dark:bg-neutral-900 inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground h-8 rounded-md"
                    >
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                    </Button>
                  </div>
                  <SyntaxHighlighter language="ts">
                    {example.result}
                  </SyntaxHighlighter>
                </div>
              </DialogContent>
            </Dialog>

          ))}
        </div>
      </div>
    </section>
  );
};

export default Examples;