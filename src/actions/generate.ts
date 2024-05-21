"use server";
import { PromptTemplate } from 'langchain/prompts';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { ChatAnthropic } from "@langchain/anthropic";
import { ChatOpenAI } from "@langchain/openai";
import { Options } from '@/lib/types';

const setCreativity = (creativity: string) => creativity === 'low' ? 0.1 : creativity === 'high' ? 0.9 : 0.5;

const getAdaptedModel = (options: Options) => {
  if (options.model.includes('gpt')) {
    return new ChatOpenAI({
      temperature: setCreativity(options.creativity),
      apiKey: options.apiKey,
      model: options.model
    });
  }

  if (options.model.includes('claude')) {
    return new ChatAnthropic({
      temperature: setCreativity(options.creativity),
      model: options.model,
      apiKey: options.apiKey
    });
  }

  if (options.model.includes('gemini')) {
    return new ChatGoogleGenerativeAI({
      model: options.model,
      apiKey: options.apiKey,
      temperature: setCreativity(options.creativity)
    });
  }
};

const prompt = `Actua como un developer, experto en generar JSON. Tu objetivo es generar un JSON con los valores y la cantidad de elementos especificados por el usuario. 
El usuario proporcionará los nombres de los campos y la cantidad de elementos que desea en el JSON. 
Asegúrate de solicitar esta información de manera clara y precisa, verificando que los nombres de los campos sean únicos y que la cantidad de elementos sea un número válido. 
Después, construye el JSON de acuerdo con estas especificaciones, asegurándote de incluir la cantidad correcta de elementos con los valores proporcionados
Solo genera el JSON con sus elementos, no evita incluir información adicional. Los keys deben ser en inglés y en snake_case.
Estas son las instrucciones del usuaro: 
El JSON debe ser generado con base a {instruction}
Campos: {fields}
Cantidad de elementos: {count}
Debes retornar solamente el arreglos con los items. Debes evitar que el arreglo este dentro de un elemento. 
Debes retornarlo en markdown.`;

export const generate = async(instruction: string, fields: string, count: string, options: Options) => {
  try {
    const promptTemplate = new PromptTemplate({
      inputVariables: ['instruction', 'fields', 'count'],
      template: prompt
    });

    const model = getAdaptedModel(options);

    if (!model) {
      throw new Error('Model not found');
    }
    const chain = promptTemplate.pipe(model);

    const response = await chain.invoke({ instruction, fields, count });
    
    return response.content;
  } catch (error) {
    throw new Error('Error generating JSON. Please try again.');
  }
};