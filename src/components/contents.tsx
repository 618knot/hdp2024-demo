import { Bluetooth, Braces, SmartphoneNfc } from "lucide-react";
import { ReactNode } from "react";

type ContentProps = {
  content: ReactNode;
  path: `/${string}`;
};

export const contents: ContentProps[] = [
  {
    content: <>Bluetooth<Bluetooth className="ml-0.5 opacity-60" /></>,
    path: "/bluetooth",
  },
  {
    content: <>Web API<Braces className="ml-0.5 opacity-60" /></>,
    path: "/webapi",
  },
  {
    content: <>NFC<SmartphoneNfc className="ml-0.5 opacity-60" /></>,
    path: "/nfc",
  },
]