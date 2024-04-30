import { examples } from "@/lib/data";

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
  return (
    <section className="flex justify-center">
      <div className="flex flex-col pt-16 sm:pt-24 md:pt-36 pb-16 w-full max-w-4xl gap-8 px-4 sm:px-6 lg:px-0">
        <div>
          <h2 className="scroll-m-20 text-4xl tracking-tight lg:text-5xl !text-3xl font-semibold !mb-0">Algunos ejemplos</h2>
          <p className="[&:not(:first-child)]:mt-6 text-xl text-muted-foreground !mt-2 mb-8">
            Puedes ver más ejemplos. Selecciona uno de los siguientes items para ver más detalles.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          {examples.map(example => (
            <ExampleCard key={example.id} label={example.label} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Examples;