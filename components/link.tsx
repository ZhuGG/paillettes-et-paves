import type { ComponentProps } from "react";
import { BASE_PATH } from "@/lib/site";
// Real document links keep static hosting independent of an RSC server.
export default function Link({ href, ...props }: ComponentProps<"a"> & { href: string }) {
  const local = href.startsWith("/") && !href.startsWith("//");
  const target = local ? BASE_PATH + (href.endsWith("/") ? href : href + "/") : href;
  return <a href={target} {...props} />;
}