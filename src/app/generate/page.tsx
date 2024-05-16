"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { generate } from "@/actions/generate";
import { toast } from "sonner";
import SkeletonPreview from "@/components/common/skeleton-preview";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";

interface RowData {
  name: string;
  type: string;
  description: string;
}

const Page = () => {
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
    <main>
      <section className="flex flex-col w-full py-8 border-b border-muted bg-gray-100/50 dark:bg-black/20">
        <div className="w-full p-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col">
              <h2 className="scroll-m-20 border-b text-3xl tracking-tight transition-colors first:mt-0 font-semibold border-none p-0">
                Genera JSON con los valores <br />
                y estableciento esquema <br />
              </h2>
              {/* <p className="leading-7 [&:not(:first-child)]:mt-6 !mt-2 text-muted-foreground text-start">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, adipisci. Qui adipisci quidem veniam sequi eos eligendi, enim labore ducimus aspernatur expedita quam laudantium facere deserunt velit sed nisi dolor.
              </p> */}
            </div>
          </div>
        </div>
      </section>
      <section className="min-h-[60vh] py-[6rem] sm:pt-[6rem]">
        <div className="max-w-7xl mx-auto p-4">
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
                    <span className="text-xs mb-1 font-medium text-muted-foreground">Limit</span>
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
                  <span className="text-xs mb-1 font-medium text-muted-foreground">Name</span>
                </div>
                <div>
                  <span className="text-xs mb-1 font-medium text-muted-foreground">Type</span>
                </div>
                <div>
                  <span className="text-xs mb-1 font-medium text-muted-foreground">Descritpion</span>
                </div>
                <div>
                  <span className="text-xs mb-1 font-medium text-muted-foreground">Icon</span>
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
                  <p>Add field</p>
                </Button>
                <Button variant="default" onClick={submitGenerate}>
                  Get JSON Data
                </Button>
              </div>

            </div>

            <div className="flex flex-col w-full md:w-auto md:flex-1 overflow-hidden">
              <div className="relative scrollbar-hide overflow-auto max-h-[400px] shadow-sm min-h-[350px] border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 w-full rounded-lg p-1">
                <div className="absolute right-3 top-3 flex items-center justify-end gap-2 z-[2]">
                  <span className="bg-neutral-100 dark:bg-neutral-900 inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground h-8 rounded-md">
                    {data.split('}').length - 1} items
                  </span>
                  {/* <Button
                    onClick={onDownloadCSV}
                    variant="ghost"
                    className="bg-neutral-100 dark:bg-neutral-900 inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground h-8 rounded-md">
                    CSV
                  </Button> */}
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
      </section>
    </main >
  );
};

export default Page;