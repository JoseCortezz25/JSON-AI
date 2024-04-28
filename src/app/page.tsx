import Banner from "@/components/common/banner";
import Form from "@/components/common/form";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Banner />
      <div className="flex flex-row my-16 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent"></div>
      <Form />
    </main>
  );
}
