import { Button } from "@/components/ui/button";
import Link from "next/link";

import { contents } from "@/components/contents";

export default function ModeSelectContainer() {
  return(
    <div className="flex gap-3">
      {
        contents.map((content, index) => {
          return(
          <Button key={index} asChild>
            <Link href={content.path}>
              {content.content}
            </Link>
          </Button>
          )
        })
      }
    </div>
  );
}
