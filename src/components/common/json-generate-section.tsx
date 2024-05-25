"use client";
import GenerateForm from "./generate-form";
import { useTranslations } from "next-intl";

const JSONGenerateSection = () => {
  const t = useTranslations('HomePage');

  return (
    <section className="w-full flex justify-center" id="form-section">
      <div className="flex flex-col items-center pt-16 sm:pt-24 md:pt-36 pb-10 w-full max-w-4xl gap-8 px-4 sm:px-6 lg:px-0">
        <div className="flex flex-col w-full">
          <h2 className="scroll-m-20 text-4xl tracking-tight lg:text-5xl !text-3xl font-semibold !mb-0 md:w-[65%] text-balance">
            {t('form.title')}
          </h2>
          <p className="[&:not(:first-child)]:mt-6 text-xl text-muted-foreground !mt-2 mb-2">
            {t('form.title')}
          </p>
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