"use client";
import { FormEvent } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Anthropic, Google, OpenAI } from "./icons";
import { toast } from "sonner";

const FormSettings = () => {

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputs = (e.target as HTMLFormElement).querySelectorAll('input, select');

    const model = (inputs[0] as HTMLSelectElement).value;
    const creativity = (inputs[1] as HTMLSelectElement).value;
    const apiKey = (inputs[2] as HTMLInputElement).value;

    if (localStorage.getItem('model') !== model) {
      localStorage.setItem('model', model);
    }

    if (localStorage.getItem('creativity') !== creativity) {
      localStorage.setItem('creativity', creativity);
    }

    if (localStorage.getItem('apiKey') !== apiKey) {
      localStorage.setItem('apiKey', apiKey);
    }
    toast.success('Los cambios se han guardado correctamente');
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="group-fields">
        <Label>Selecciona el modelo</Label>
        <p>
          Elige el modelo que deseas utilizar para generar el JSON.
          Necesitas añadir la API KEY correspondiente al model seleccionado para poder utilizarlo.
        </p>
        <Select defaultValue={localStorage.getItem('model') || ''}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona el modelo" />
          </SelectTrigger>
          <SelectContent className="w-full">
            <SelectItem value="gpt-4o" className="w-full cursor-pointer">
              <div className="select-item-model">
                <OpenAI className="text-black dark:text-white" />
                <p>OpenAI - GPT-4o</p>
              </div>
            </SelectItem>
            <SelectItem value="gpt-3.5-turbo-0125" className="w-full cursor-pointer">
              <div className="select-item-model">
                <OpenAI className="text-black dark:text-white" />
                <p>OpenAI - GPT-3.5 Turbo</p>
              </div>
            </SelectItem>
            <SelectItem value="gemini-pro" className="w-full cursor-pointer">
              <div className="select-item-model">
                <Google />
                <p>Google - Gemini Pro 1.0</p>
              </div>
            </SelectItem>
            <SelectItem value="claude-3-opus" className="w-full cursor-pointer">
              <div className="select-item-model">
                <Anthropic />
                <p>Anthropic - Claude 3 Opus</p>
              </div>
            </SelectItem>
            <SelectItem value="claude-3-sonnet" className="w-full cursor-pointer">
              <div className="select-item-model">
                <Anthropic />
                <p>Anthropic - Claude 3 Sonnet</p>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="group-fields">
        <Label>Selecciona el nivel de creatividad</Label>
        <p>Elige el nivel de creatividad que deseas que tenga el modelo para generar el JSON.</p>
        <Select defaultValue={localStorage.getItem('creativity') || ''}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona el nivel de creatividad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">
              <div className="select-item-model">
                <p>Bajo</p>
              </div>
            </SelectItem>
            <SelectItem value="medium">
              <div className="select-item-model">
                <p>Medio</p>
              </div>
            </SelectItem>
            <SelectItem value="high">
              <div className="select-item-model">
                <p>Alto</p>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="group-fields">
        <Label>Ingresa tu API KEY</Label>
        <p>
          Ingresa la API KEY correspondiente al modelo seleccionado para poder utilizarlo y generar el JSON.
        </p>
        <Input
          name="api-key"
          type="text"
          placeholder="API KEY"
          defaultValue={localStorage.getItem('apiKey') || ''}
        />
      </div>

      <div className="group-fields">
        <Button>Guardar los cambios</Button>
      </div>
    </form>
  );
};

export default FormSettings;