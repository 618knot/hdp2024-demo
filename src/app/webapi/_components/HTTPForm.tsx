import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Check, ChevronsUpDown, Flame, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Dispatch, SetStateAction } from "react"
import { ResultProps } from "../_types/ResultProps"
import { Toaster } from "@/components/ui/sonner"

export const dynamic = 'force-dynamic';

const httpMethods = [
  { label: "GET", value: "GET" },
  { label: "POST", value: "POST" },
  { label: "PUT", value: "PUT" },
  { label: "PATCH", value: "PATCH" },
  { label: "DELETE", value: "DELETE" },
  { label: "HEAD", value: "HEAD" },
  { label: "CONNECT", value: "CONNECT" },
  { label: "OPTIONS", value: "OPTIONS" },
  { label: "TRACE", value: "TRACE" },
] as const

const FormSchema = z.object({
  url: z.string().url({
    message: "有効なURLを入力してください",
  }),
  httpMethods: z.string({
    required_error: "HTTPメソッドを選択してください",
  })
});

type HTTPFormProps = {
  setResult: Dispatch<SetStateAction<ResultProps | undefined>>;
  setIsPending: Dispatch<SetStateAction<boolean>>;
  isPending: boolean;
}

export default function HTTPForm({setResult, setIsPending, isPending}: HTTPFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {

    setIsPending(true);
    const fetchData = async () => {
      try {
        const response = await fetch(data.url, {
          method: data.httpMethods,
        });
    
        const json = await response.json();
        const contentType = response.headers.get("Content-Type") || "";
    
        const resultData: ResultProps = {
          data: json,
          status: response.status,
          statusText: response.statusText,
          contentType: contentType,
        };
    
        setResult(resultData);
      } catch (error: any) {
        toast(error.message, {
          icon: <Flame />,
          style: { background: "#dc2626", color: "#fff" },
        });
      } finally {
        setIsPending(false);
      }
    };
    
    fetchData();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-5/6 space-y-6">
      <FormField
          control={form.control}
          name="httpMethods"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>HTTP methods</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? httpMethods.find(
                            (method) => method.value === field.value
                          )?.label
                        : "Select HTTP method"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search method..." />
                    <CommandList>
                      <CommandEmpty>No method found.</CommandEmpty>
                      <CommandGroup>
                        {httpMethods.map((method) => (
                          <CommandItem
                            value={method.label}
                            key={method.value}
                            onSelect={() => {
                              form.setValue("httpMethods", method.value)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                method.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {method.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                リクエストに使用するHTTPメソッド
              </FormDescription>
              <FormMessage />
            </FormItem>
            // TODO: リクエストボディ
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormDescription>
                リクエスト先のURL
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {
            isPending ? <Loader2 className="animate-spin" /> : "Submit"
          }
        </Button>
      </form>
    </Form>
  )
}
