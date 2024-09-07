import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ModeSelectContainer() {
  return(
    <div className="flex gap-3">
      <Button asChild>
        <Link href="/bluetooth">
          Bluetooth
        </Link>
      </Button>

      <Button>
        <Link href="/nfc">
          NFC
        </Link>
      </Button>
    </div>
  );
}
