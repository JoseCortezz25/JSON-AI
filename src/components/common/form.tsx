"use client";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Hash, PlusIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const Form = () => {
  const [fields, setFields] = useState([
    { name: 'field1', id: 'field1' },
    { name: 'field2', id: 'field2' },
    { name: 'field3', id: 'field3' }
  ]);


  interface FieldsProps {
    name: string;
  }

  const Fields = ({ name }: FieldsProps) => {
    return (
      <div className="grid grid-cols-4 gap-3">
        <Input name={`${name}-name`} type="text" placeholder="Name" />
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="String" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="string">
              <div className="flex items-center gap-3 cursor-pointer">
                <p>String</p>
              </div>
            </SelectItem>
            <SelectItem value="number">
              <div className="flex items-center gap-3 cursor-pointer">
                <p>Number</p>
              </div>
            </SelectItem>
            <SelectItem value="boolean">
              <div className="flex items-center gap-3 cursor-pointer">

                <p>Boolean</p>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
        <Input name={`${name}-description`} type="text" placeholder="Description" />
        <Button variant="outline" onClick={removeField}>
          <Trash2Icon className="size-4" />
        </Button>
      </div>
    );
  };

  const removeField = () => {
    if (fields.length > 3) {
      const newFields = fields.filter((field, index) => index !== fields.length - 1);
      setFields(newFields);
    }
  };

  const addField = () => {
    setFields(prevState => [
      ...fields,
      {
        name: `field${prevState.length + 1}`,
        id: `field${prevState.length + 1}`
      }
    ]);

  };


  return (
    <section className="w-full flex justify-center">
      <div className="flex flex-col items-center pt-16 sm:pt-24 md:pt-36 pb-10 w-full max-w-4xl gap-8 px-4 sm:px-6 lg:px-0">
        <div className="flex flex-col w-full">
          <h2 className="scroll-m-20 text-4xl tracking-tight lg:text-5xl !text-3xl font-semibold !mb-0">
            Establece tu estructura<br />
            Comienza a crear mocks en JSON.
          </h2>
          <p className="[&:not(:first-child)]:mt-6 text-xl text-muted-foreground !mt-2 mb-4">
            Puedes definir los campos de tu objeto para devolver exactamente lo mismo desde la AI.
          </p>
        </div>
        {/* <span className="text-muted-foreground text-sm mt-2">You can select one of the examples formats below.</span> */}

        <div className="flex items-center w-full justify-center">
          <div className="w-full max-w-5xl mx-auto gap-2 md:gap-6 flex flex-col md:flex-row items-center md:items-start">
            <div className="flex-col md:flex-row w-full flex items-start gap-4">

              <div className="flex flex-col gap-2 w-full md:w-auto md:flex-1">

                <div className="flex gap-3 justify-between">
                  <div className="flex flex-col w-[80%]">
                    <Label htmlFor="prompt">
                      <span className="text-xs mb-1 font-medium text-muted-foreground">Prompt</span>
                    </Label>
                    <Input name="prompt" type="text" placeholder="Most listened musics in Hard Rock category" />
                  </div>
                  <div className="flex flex-col w-[17%]">
                    <Label htmlFor="limit">
                      <span className="text-xs mb-1 font-medium text-muted-foreground">Limit</span>
                    </Label>
                    <Input name="limit" type="number" placeholder="10" />
                  </div>
                </div>


                <div className="grid grid-cols-4 gap-3">
                  <div>
                    <span className="text-xs mb-1 font-medium text-muted-foreground">Name</span>
                  </div>
                  <div>
                    <span className="text-xs mb-1 font-medium text-muted-foreground">Type</span>
                  </div>
                  <div>
                    <span className="text-xs mb-1 font-medium text-muted-foreground">Descritpion</span>
                  </div>
                  <div>
                    <span className="text-xs mb-1 font-medium text-muted-foreground">icon</span>
                  </div>
                </div>

                {fields.map((field, index) => (
                  <Fields key={index} name={field.name} />
                ))}

                <div className="flex flex-col space-y-2">
                  <Button variant="outline" onClick={addField}>
                    <PlusIcon className="size-4 mr-1" />
                    <p>Add field</p>
                  </Button>
                  <Button variant="default">
                    Get JSON Data
                  </Button>
                </div>
                {/* <div className="flex gap-3">
                  <div className="flex flex-col">
                    <Label htmlFor="prompt">
                      <span className="text-xs mb-1 font-medium text-muted-foreground">Prompt</span>
                    </Label>
                    <Input name="prompt" type="text" placeholder="Most listened musics in Hard Rock category" />
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="prompt">
                      <span className="text-xs mb-1 font-medium text-muted-foreground">Prompt</span>
                    </Label>
                    <Input name="prompt" type="text" placeholder="Most listened musics in Hard Rock category" />
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="prompt">
                      <span className="text-xs mb-1 font-medium text-muted-foreground">Prompt</span>
                    </Label>
                    <Input name="prompt" type="text" placeholder="Most listened musics in Hard Rock category" />
                  </div>
                  <div className="flex flex-col-reverse">
                    <Button variant="outline">
                      <Trash2Icon className="size-4" />
                    </Button>
                  </div>
                </div> */}

              </div>

              <div className="flex flex-col w-full md:w-auto md:flex-1 overflow-hidden">
                <div className="relative scrollbar-hide overflow-auto max-h-[400px] shadow-sm min-h-[350px] border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 w-full rounded-lg p-1">
                  <div className="absolute right-3 top-3 flex items-center justify-end gap-2">
                    <span className="inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground h-8 rounded-md">0 items</span>
                    <Button variant="ghost" className="inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground h-8 rounded-md">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                    </Button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;