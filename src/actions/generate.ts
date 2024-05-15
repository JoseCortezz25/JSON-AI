"use server";
import { PromptTemplate } from 'langchain/prompts';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

const model = new ChatGoogleGenerativeAI({
  model: 'gemini-pro',
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
  temperature: 0.1
});

const prompt = `Actua como un developer, experto en generar JSON. Tu objetivo es generar un JSON con los valores y la cantidad de elementos especificados por el usuario. 
El usuario proporcionará los nombres de los campos y la cantidad de elementos que desea en el JSON. 
Asegúrate de solicitar esta información de manera clara y precisa, verificando que los nombres de los campos sean únicos y que la cantidad de elementos sea un número válido. 
Después, construye el JSON de acuerdo con estas especificaciones, asegurándote de incluir la cantidad correcta de elementos con los valores proporcionados
Solo genera el JSON con sus elementos, no evita incluir información adicional. Los keys deben ser en inglés y en snake_case.
Estas son las instrucciones del usuaro: 
El JSON debe ser generado con base a {instruction}
Campos: {fields}
Cantidad de elementos: {count}
Debes retornarlo en markdown.`;

export const generate = async(instruction: string, fields: string, count: string) => {
  try {
    const promptTemplate = new PromptTemplate({
      inputVariables: ['instruction', 'fields', 'count'],
      template: prompt
    });

    const chain = promptTemplate.pipe(model);

    const response = await chain.invoke({ instruction, fields, count });
    
    return response.content;
  } catch (error) {
    throw new Error('Error generating JSON. Please try again.');
  }
};