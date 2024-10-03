import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

export function H1({ children, className }: PropsWithChildren & { className: string }) {
  return (
    <h1 className={cn(className, "scroll-m-20 font-extrabold text-4xl tracking-tight lg:text-5xl")}>
      {children}
    </h1>
  )
}

export function H2({ children, className }: PropsWithChildren & { className: string }) {
  return (
    <h2 className={cn(className, "scroll-m-20 border-b pb-2 font-semibold text-3xl tracking-tight first:mt-0")}>
      {children}
    </h2>
  )
}

export function H3({ children, className }: PropsWithChildren & { className: string }) {
  return (
    <h3 className={cn(className, "scroll-m-20 font-semibold text-2xl tracking-tight")}>
      {children}
    </h3>
  )
}

export function H4({ children }: PropsWithChildren) {
  return (
    <h4 className="scroll-m-20 font-semibold text-xl tracking-tight">
      {children}
    </h4>
  )
}


export function Large({ children }: PropsWithChildren) {
  return <div className="font-semibold text-lg">{children}</div>
}

export function Small({ children }: PropsWithChildren) {
  return (
    <small className="font-medium text-sm leading-none">{children}</small>
  )
}
