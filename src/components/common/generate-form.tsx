"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { generate, generateUsingTypes } from "@/actions/generate";
import { toast } from "sonner";
import { Creativity, Models, Options } from "@/lib/types";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import SkeletonPreview from "@/components/common/skeleton-preview";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import FormSettings from "@/components/common/form-settings";
import { InputsIcon, JSONIcon } from "./icons";
import { useTranslations } from "next-intl";

interface RowData {
  name: string;
  type: string;
  description: string;
}

type GenerateMode = 'inputs' | 'json';

const GenerateForm = () => {
  const [prompt, setPrompt] = useState('');
  const [count, setCount] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');
  const [userInput, setUserInput] = useState<string>('');
  const [generateMode, setGenerateMode] = useState<GenerateMode>('inputs');
  const [rows, setRows] = useState<RowData[]>([
    { name: '', type: 'string', description: '' },
    { name: '', type: 'string', description: '' },
    { name: '', type: 'string', description: '' }
  ]);
  const t = useTranslations('Settings');
  const tForm = useTranslations('GenerateForm');
  const tAlerts = useTranslations('Alerts');

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

  const generateWithInputs = async () => {
    try {
      if (!validateRows()) {
        toast.error(tAlerts('emptyFields'));
        return;
      }

      if (prompt === '' || count === '') {
        toast.error(tAlerts('emptyPromptAndCount'));
        return;
      }
      setLoading(true);

      const formattedFields = formatInputs(rows);

      const options: Options = {
        model: (localStorage.getItem('model') as Models) || "",
        creativity: (localStorage.getItem('creativity') as Creativity) || "medium",
        apiKey: localStorage.getItem('apiKey') || ""
      };

      if (!options.model || !options.apiKey) {
        toast.error(tAlerts('emptyModel'));
        setLoading(false);
        return;
      }

      const response = await generate(prompt, formattedFields, count, options);
      const result = response.toString().replaceAll('```json', '').replaceAll('```', '');
      return result;
    } catch (error) {
      throw new Error(tAlerts('generateError'));
    }
  };

  const generateWithTypes = async () => {
    try {
      if (prompt === '' || count === '' || userInput === '') {
        toast.error(tAlerts('emptyFields'));
        return;
      }
      setLoading(true);

      const options: Options = {
        model: (localStorage.getItem('model') as Models) || "",
        creativity: (localStorage.getItem('creativity') as Creativity) || "medium",
        apiKey: localStorage.getItem('apiKey') || ""
      };

      if (!options.model || !options.apiKey) {
        toast.error(tAlerts('emptyModel'));
        setLoading(false);
        return;
      }

      const response = await generateUsingTypes(prompt, userInput, count, options);
      const result = response.toString().replaceAll('```json', '').replaceAll('```', '');
      return result;
    } catch (error) {
      throw new Error(tAlerts('generateError'));
    }
  };

  const submitGenerate = async () => {
    try {
      if (generateMode === 'inputs') {
        const result = await generateWithInputs();
        if (!result) return;
        setData(result);
      }

      if (generateMode === 'json') {
        const result = await generateWithTypes();
        if (!result) return;
        setData(result);
      }

      setLoading(false);
    } catch (error) {
      toast.error(tAlerts('generateError'));
      setLoading(false);
    }
  };

  const onCopy = () => {
    if (!navigator.clipboard) {
      toast.error(tAlerts('copiedResultError'));
      return;
    }

    if (!data) return;
    navigator.clipboard.writeText(data);
    toast.info(tAlerts('copiedResult'));
  };

  const onDownloadJSON = () => {
    if (!data) {
      toast.error(tAlerts('downloadError'));
      return;
    }

    const json = JSON.stringify(rows);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.json';
    link.click();
    URL.revokeObjectURL(url);

    toast.info(tAlerts('downloadSuccess'));
  };

  const onChangeGenerateMode = () => {
    if (generateMode === 'inputs') {
      setGenerateMode('json');
    } else {
      setGenerateMode('inputs');
    }
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
      toast.error(tAlerts('almostThreeFields'));
      return;
    };
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  return (
    <section>
      <div className="max-w-7xl mx-auto py-4">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col gap-2 w-full md:w-[50%] md:flex-1" id="form-json">

            <div className="flex gap-3 justify-between">
              <div className="flex flex-col w-[80%]">
                <Label htmlFor="prompt">
                  <span className="text-xs mb-1 font-medium text-muted-foreground">
                    {tForm('labels.prompt')}
                  </span>
                </Label>
                <Input
                  name="prompt"
                  type="text"
                  placeholder={tForm('placeholder.prompt')}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-[17%]">
                <Label htmlFor="limit">
                  <span className="text-xs mb-1 font-medium text-muted-foreground">
                    {tForm('labels.limit')}
                  </span>
                </Label>
                <Input
                  name="limit"
                  type="number"
                  placeholder={tForm('placeholder.limit')}
                  min={1}
                  max={15}
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                />
              </div>
            </div>

            {generateMode === 'inputs' && (
              <div className="grid grid-cols-[1fr_1fr_1fr_50px] gap-3">
                <div>
                  <span className="text-xs mb-1 font-medium text-muted-foreground">
                    {tForm('labels.name')}
                  </span>
                </div>
                <div>
                  <span className="text-xs mb-1 font-medium text-muted-foreground">
                    {tForm('labels.type')}
                  </span>
                </div>
                <div>
                  <span className="text-xs mb-1 font-medium text-muted-foreground">
                    {tForm('labels.description')}
                  </span>
                </div>
                <div>
                  <span className="text-xs mb-1 font-medium text-muted-foreground">
                    {tForm('labels.icon')}
                  </span>
                </div>
              </div>
            )}

            {generateMode !== 'json' && rows.map((row, index) => (
              <div key={index} className="grid grid-cols-[1fr_1fr_1fr_50px] gap-3">
                <Input
                  name={`${index}-name`}
                  type="text"
                  placeholder={tForm('placeholder.name')}
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
                  placeholder={tForm('placeholder.description')}
                  value={row.description}
                  onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                />
                <Button variant="outline" onClick={() => removeField(index)}>
                  <Trash2Icon className="size-4" />
                </Button>
              </div>
            ))}

            {generateMode === 'json' && (
              <div className="w-full flex">
                <Textarea
                  placeholder="Ingresa el type"
                  className="min-h-[200px] max-h-[350px]"
                  onChange={({ target }) => setUserInput(target.value)}
                  value={userInput}
                />
              </div>
            )}

            <div className="flex flex-col space-y-2">
              <div className="flex w-full gap-2">
                {generateMode === 'inputs' && (
                  <Button variant="outline" className="w-full" onClick={addRow}>
                    <PlusIcon className="size-4 mr-1" />
                    <p>{tForm('ctaAddField')}</p>
                  </Button>
                )}
              </div>

              <Button variant="default" onClick={submitGenerate}>
                {tForm('ctaSubmit')}
              </Button>
            </div>

            <div className="flex gap-3">
              <Sheet>
                <SheetTrigger className="flex justify-end">
                  <Button variant="ghost" className="button-setting">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                    </svg>
                    {tForm('ctaSettings')}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[540px]">
                  <SheetHeader>
                    <SheetTitle>{t('title')}</SheetTitle>
                    <FormSettings />
                  </SheetHeader>
                </SheetContent>
              </Sheet>
              <Button variant="ghost" onClick={onChangeGenerateMode} className="dark:text-white flex gap-3">
                {generateMode === 'json' ? (
                  <InputsIcon className="size-5 dark:text-white" />
                ) : (
                  <JSONIcon className="size-5 dark:text-white" />
                )}
                {tForm('ctaChangeMode')}
              </Button>
            </div>
          </div>

          <div className="flex flex-col w-full md:w-auto md:flex-1 overflow-hidden">
            <div className="relative scrollbar-hide overflow-auto max-h-[400px] shadow-sm min-h-[350px] border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 w-full rounded-lg p-1">
              <div className="absolute right-3 top-3 flex items-center justify-end gap-2 z-[2]">
                <span className="bg-neutral-100 dark:bg-neutral-900 inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground h-8 rounded-md">
                  {data.split('}').length - 1} {tForm('count')}
                </span>
                <Button
                  onClick={onDownloadJSON}
                  variant="ghost"
                  className="bg-neutral-100 dark:bg-neutral-900 inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground h-8 rounded-md">
                  JSON
                </Button>

                <Button
                  onClick={onCopy}
                  variant="ghost"
                  className="bg-neutral-100 dark:bg-neutral-900 inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground h-8 rounded-md"
                >
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
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
  );
};

export default GenerateForm;