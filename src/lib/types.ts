export type Creativity = 'low' | 'medium' | 'high';

export type Models = 'gpt-4o' | 'gpt-3.5-turbo-0125' | 'gemini-pro' | 'claude-3-opus' | 'claude-3-sonnet';

export interface Options {
  apiKey: string;
  model: Models
  creativity: Creativity
}
