import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ResultProps } from "../_types/ResultProps";
import { ScrollArea } from "@/components/ui/scroll-area";

type ResultCardProps = {
  result: ResultProps | undefined;
}

export default function ResultCard({result}: ResultCardProps) {
  if(result === undefined) return <></>

  return(
    <Card className="w-3/4">
      <CardHeader className="font-bold">Request result</CardHeader>
      <CardContent>
        HTTP status: <span className="underline">{`${result.status} ${result.statusText}`}</span>
        <br />
        Content-Type: <span className="underline">{result.contentType}</span>
      </CardContent>
      <CardContent className="h-full">
        <ScrollArea className="w-full h-48">
          <pre className="rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(result.data, null, 2)}</code>
          </pre>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
