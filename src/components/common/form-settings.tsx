"use client";
import { FormEvent } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Anthropic, Google, OpenAI } from "./icons";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

const FormSettings = () => {
  const t = useTranslations('Settings');
  const tAlerts = useTranslations('Alerts');

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
    toast.success(tAlerts('savedChanges'));
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="group-fields">
        <Label>{t('labelModel')}</Label>
        <p>
          {t('instructionModel')}
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
                <span className="flex gap-2 items-center">
                  <p>OpenAI - GPT-4o-mini</p>
                  <span className="bg-emerald-300 rounded-full px-2.5 py-0.5 text-[12px]">New</span>
                </span>
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
        <Label>{t('labelCreativity')}</Label>
        <p>{t('instructionCreativity')}
        </p>
        <Select defaultValue={localStorage.getItem('creativity') || ''}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t('labelCreativity')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">
              <div className="select-item-model">
                <p>{t('values.option1')}</p>
              </div>
            </SelectItem>
            <SelectItem value="medium">
              <div className="select-item-model">
                <p>{t('values.option2')}</p>
              </div>
            </SelectItem>
            <SelectItem value="high">
              <div className="select-item-model">
                <p>{t('values.option3')}</p>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="group-fields">
        <Label>{t('labelApikey')}</Label>
        <p>
          {t('instructionApikey')}
        </p>
        <Input
          name="api-key"
          type="text"
          placeholder="API KEY"
          defaultValue={localStorage.getItem('apiKey') || ''}
        />
      </div>

      <div className="group-fields">
        <Button>{t('cta')}</Button>
      </div>
    </form>
  );
};

export default FormSettings;