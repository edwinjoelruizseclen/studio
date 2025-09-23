
"use client"

import { cn } from "@/lib/utils"

/**
 * Componente que muestra un esqueleto de carga (placeholder).
 * Útil para indicar que el contenido se está cargando.
 * @param {React.HTMLAttributes<HTMLDivElement>} props - Propiedades HTML estándar para un div.
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
