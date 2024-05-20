"use client";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import SkeletonPreview from "./skeleton-preview";
import { generate } from "@/actions/generate";
import { toast } from "sonner";
import { examples } from "@/lib/data";
import { Badge } from "../ui/badge";
import { Options } from "@/lib/types";

interface RowData {
  name: string;
  type: string;
  description: string;
}

const JSONGenerateSection = () => {
  const [prompt, setPrompt] = useState('');
  const [count, setCount] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');
  const [rows, setRows] = useState<RowData[]>([
    { name: '', type: 'string', description: '' },
    { name: '', type: 'string', description: '' },
    { name: '', type: 'string', description: '' }
  ]);


  const formatInputs = (fields: RowData[]) => {
    let formattedFields = '';

    fields.forEach((field) => {
      formattedFields += `${field.name}(${field.type}) - Description: ${field.description} \n`;
    });

    return formattedFields;
  };

  const validateRows = () => {
    for (const row of rows) {
      if (row.name === '' || row.type === '' || row.description === '') {
        return false;
      }
    }
    return true;
  };

  const submitGenerate = async () => {
    try {
      setLoading(true);
      if (!validateRows()) {
        toast.error("Please fill in all fields.");
        return;
      }

      if (prompt === '' || count === '') {
        toast.error("Please fill in the prompt and count fields.");
        return;
      }

      const formattedFields = formatInputs(rows);

      const options: Options = {
        model
      };

      const response = await generate(prompt, formattedFields, count);
      const result = response.toString().replaceAll('```json', '').replaceAll('```', '');
      setData(result);
      setLoading(false);
    } catch (error) {
      toast.error("Error generating JSON. Please try again.");
      setLoading(false);
    }
  };

  const onCopy = () => {
    if (!navigator.clipboard) {
      toast.error("Clipboard is not supported in your browser.");
      return;
    }

    if (!data) return;
    navigator.clipboard.writeText(data);
    toast.info("JSON data copied to clipboard.");
  };

  const handleInputChange = (index: number, key: keyof RowData, value: string) => {
    const newRows = [...rows];
    newRows[index][key] = value;
    setRows(newRows);
  };

  const addRow = () => {
    setRows([...rows, { name: '', type: 'string', description: '' }]);
  };

  const removeField = (index: number) => {
    if (rows.length === 3) {
      toast.error("You need to have at least 3 fields.");
      return;
    };
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  return (
    <section className="w-full flex justify-center">
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

        <div className="w-full min-h-[60vh] sm:pb-[6rem] border border-red-500">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col gap-2 w-full md:w-[50%] md:flex-1" id="form-json">

                <div className="flex gap-3 justify-between">
                  <div className="flex flex-col w-[80%]">
                    <Label htmlFor="prompt">
                      <span className="text-xs mb-1 font-medium text-muted-foreground">Prompt</span>
                    </Label>
                    <Input
                      name="prompt"
                      type="text"
                      placeholder="Most listened musics in Hard Rock category"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col w-[17%]">
                    <Label htmlFor="limit">
                      <span className="text-xs mb-1 font-medium text-muted-foreground">Límite</span>
                    </Label>
                    <Input
                      name="limit"
                      type="number"
                      placeholder="10"
                      min={1}
                      max={15}
                      value={count}
                      onChange={(e) => setCount(e.target.value)}
                    />
                  </div>
                </div>


                <div className="grid grid-cols-[1fr_1fr_1fr_50px] gap-3">
                  <div>
                    <span className="text-xs mb-1 font-medium text-muted-foreground">Nombre</span>
                  </div>
                  <div>
                    <span className="text-xs mb-1 font-medium text-muted-foreground">Tipo</span>
                  </div>
                  <div>
                    <span className="text-xs mb-1 font-medium text-muted-foreground">Descritción</span>
                  </div>
                  <div>
                    <span className="text-xs mb-1 font-medium text-muted-foreground">Icono</span>
                  </div>
                </div>

                {rows.map((row, index) => (
                  <div key={index} className="grid grid-cols-[1fr_1fr_1fr_50px] gap-3">
                    <Input
                      name={`${index}-name`}
                      type="text"
                      placeholder="Name"
                      value={row.name}
                      onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                    />
                    <Select
                      name={`${index}-type`}
                      defaultValue={row.type}
                      onValueChange={(value) => handleInputChange(index, 'type', value)}
                    >
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
                    <Input
                      name={`${index}-description`}
                      type="text"
                      placeholder="Description"
                      value={row.description}
                      onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                    />
                    <Button variant="outline" onClick={() => removeField(index)}>
                      <Trash2Icon className="size-4" />
                    </Button>
                  </div>
                ))}


                <div className="flex flex-col space-y-2">
                  <Button variant="outline" onClick={addRow}>
                    <PlusIcon className="size-4 mr-1" />
                    <p>Añadir campo </p>
                  </Button>
                  <Button variant="default" onClick={submitGenerate}>
                    Generar JSON
                  </Button>
                </div>

              </div>

              <div className="flex flex-col w-full md:w-auto md:flex-1 overflow-hidden">
                <div className="relative scrollbar-hide overflow-auto max-h-[400px] shadow-sm min-h-[350px] border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 w-full rounded-lg p-1">
                  <div className="absolute right-3 top-3 flex items-center justify-end gap-2 z-[2]">
                    <span className="bg-neutral-100 dark:bg-neutral-900 inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground h-8 rounded-md">
                      {data.split('}').length - 1} items
                    </span>
                    <Button
                      onClick={onCopy}
                      variant="ghost"
                      className="bg-neutral-100 dark:bg-neutral-900 inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground h-8 rounded-md"
                    >
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                    </Button>
                  </div>
                  {!loading ? (
                    <SyntaxHighlighter>
                      {data}
                    </SyntaxHighlighter>
                  ) : (
                    <SkeletonPreview />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JSONGenerateSection;