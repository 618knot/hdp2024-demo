import { contents } from "@/components/contents"
import { ModeToggle } from "@/components/ModeToggle"
import { Button } from "@/components/ui/button"
import {
  Menubar,
  MenubarMenu,
} from "@/components/ui/menubar"
import { Separator } from "@/components/ui/separator"
import { Home } from "lucide-react"
import Link from "next/link"
 
export default function MenubarDemo() {
  return (
    <Menubar className="absolute m-3">
      <MenubarMenu>
        <Button variant="link" asChild>
          <Link href="/">HOME <Home className="ml-0.5 opacity-60" /></Link>
        </Button>
        {
          contents.map((content, index) => {
            return(
            <Button key={index} variant="link" asChild>
              <Link href={content.path}>
                {content.content}
              </Link>
            </Button>
            )
          })
        }
        <Separator className="h-2/3" orientation="vertical" />
        <ModeToggle />
      </MenubarMenu>
    </Menubar>
  )
}