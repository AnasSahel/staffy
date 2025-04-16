import { PropsWithChildren } from "react";

export default function Layout({ children }: Readonly<PropsWithChildren<{}>>) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      {children}
    </div>
  );
}
