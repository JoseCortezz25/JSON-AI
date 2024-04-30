import Linear from "@/components/common/linear";
import Banner from "@/components/common/banner";
import Form from "@/components/common/form";
import Examples from "@/components/common/examples";

export default function Home() {
  return (
    <main>
      <Banner />
      <Linear />
      <Form />
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
        </div>
      </section>
      <Linear />
      <Examples />
    </main>
  );
}
