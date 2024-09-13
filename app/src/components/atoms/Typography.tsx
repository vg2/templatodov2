import type { PropsWithChildren } from "react";

export function H1({ children }: PropsWithChildren) {
  return (
    <h1 className="scroll-m-20 font-extrabold text-4xl tracking-tight lg:text-5xl">
      {children}
    </h1>
  )
}

export function H2({ children }: PropsWithChildren) {
  return (
    <h2 className="scroll-m-20 border-b pb-2 font-semibold text-3xl tracking-tight first:mt-0">
      {children}
    </h2>
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
