import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";

type Prompt = {
  id: string;
  title: string;
  template: string;
}

interface IProps {
  onPromptSelect: (template: string) => void;
}

export function PromptSelect({ onPromptSelect }: IProps) {
  const [prompts, setPrompts] = useState<Prompt[] | null>(null);

  useEffect(() => {
    api.get('/prompts').then(res => setPrompts(res.data))
  }, []);

  function handlePromptSelect(promptId: string) {
    const selectedPrompt = prompts?.find(prompt => prompt.id === promptId);

    if (!selectedPrompt) return;

    onPromptSelect(selectedPrompt.template)
  }

  return (
    <Select onValueChange={handlePromptSelect}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione um prompt" />
      </SelectTrigger>
      <SelectContent>
        {prompts?.map(prompt => (
          <SelectItem key={prompt.id} value={prompt.id}>{prompt.title}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}