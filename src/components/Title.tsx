import clsx from "clsx";
import { ComponentProps } from "react";

export default function Title({className, children, ...props}: ComponentProps<"h1">) {
  return <h1 className={clsx("text-xl font-bold my-8 flex items-center gap-1", className)}>{children}</h1>
}
