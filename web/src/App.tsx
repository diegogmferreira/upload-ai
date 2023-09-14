import { Button } from "./components/ui/button";
import { Github, FileVideo, Upload, Wand2, Moon, Sun } from 'lucide-react';
import { Separator } from "./components/ui/separator";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Slider } from "./components/ui/slider";
import { Switch } from "./components/ui/switch";
import { ThemeProvider, useTheme } from "./components/ui/theme-provider";

export function App() {
  const { theme, setTheme } = useTheme();

  function handleThemeChanging(checked: boolean) {
    console.log(checked)
    console.log(theme)
    if (checked === true) {
      console.log('aqui dark');
      setTheme('dark');
    } else {
      console.log('aqui light');
      setTheme('light');
    }
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" key={'app'}>
      <div className="min-h-screen flex flex-col">
        <div className="px-6 py-3 flex items-center justify-between border-b">
          <h1 className="text-xl font-bold">upload.ai</h1>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4" />
              <Switch
                id="theme-mode"
                // checked={theme === 'dark' ? true : false}
                onCheckedChange={e => handleThemeChanging(e)}
              />
              <Moon className="w-4 h-4" />
            </div>

            <Separator orientation="vertical" className="h-6" />

            <span className="text-sm text-muted-foreground">Desenvolvido com 💜 no NLW da Rocketseat</span>

            <Separator orientation="vertical" className="h-6" />

            <Button variant={"outline"}>
              <Github className="w-4 h-4 mr-2" />
              Github
            </Button>
          </div>
        </div>

        <main className="flex-1 p-6 flex gap-6">
          <section className="flex flex-col flex-1 gap-4">
            <div className="grid grid-rows-2 gap-4 flex-1">
              <Textarea
                className="resize-none p-4 leading-relaxed"
                placeholder="Inclua o prompt para a IA..."
              />
              <Textarea
                className="resize-none p-4 leading-relaxed"
                placeholder="Resultado gerado pela IA."
                readOnly
              />
            </div>

            <p className="text-sm text-muted-foreground">
              Lembre-se: você pode utilizar a variável <code className="text-violet-400">{'{transcription}'}</code> no seu prompt para adicionar o conteúdo da transcrição do vídeo selecionado.
            </p>
          </section>

          <aside className="w-80 space-y-6">
            <form className="space-y-6">
              <label htmlFor="video" className="border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5">
                <FileVideo className="w-4 h-4" />
                Selecione um video
              </label>
              <input type="file" name="video" id="video" accept="video/mp4" className="sr-only" />

              <Separator />

              <div className="sapce-y-2">
                <Label htmlFor="transcription_prompt">Prompt de transcrição</Label>
                <Textarea id="transcription_prompt" className="min-h-[80px] leading-relaxed" placeholder="Inclua palavras chaves mencionadas no vídeo separadas por vírgula..." />
              </div>

              <Button type="submit" className="w-full">Carregar video <Upload className="w-4 h-4 ml-2" /></Button>
            </form>

            <Separator />

            <form className="space-y-6">
              <div className="space-y-2">
                <Label>Prompt</Label>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um prompt" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={'title'}>Título do Youtube</SelectItem>
                    <SelectItem value={'description'}>Descrição do Youtube</SelectItem>
                  </SelectContent>
                </Select>
                <span className="block text-xs text-muted-foreground italic">
                  Você poderá customizar esta opção em breve
                </span>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Modelo</Label>

                <Select defaultValue="gpt3.5" disabled>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={'gpt3.5'}>GPT 3.5-turbo 16k</SelectItem>
                  </SelectContent>
                </Select>
                <span className="block text-xs text-muted-foreground italic">
                  Você poderá customizar esta opção em brev
                </span>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Temperatura</Label>
                <Slider
                  min={0}
                  max={1}
                  step={0.1}
                />

                <span className="block text-xs text-muted-foreground italic leading-relaxed">Valores mais altos tendem a deixar o resultado mais criativo e com a margem de erro maior</span>
              </div>

              <Separator />

              <Button type="submit" className="w-full">
                Executar
                <Wand2 className="w-4 h-4 ml-2" />
              </Button>

            </form>

          </aside>
        </main>
      </div >
    </ThemeProvider>
  )
}