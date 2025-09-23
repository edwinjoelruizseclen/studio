
import * as React from 'react';

/**
 * Componente de ícono para la Chacana o Cruz Andina.
 * @param {React.SVGProps<SVGSVGElement>} props - Propiedades SVG estándar.
 */
export function AndeanCrossIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M14 0H10V4H4V10H0V14H4V20H10V24H14V20H20V14H24V10H20V4H14V0ZM14 10V14H10V10H14Z" />
    </svg>
  );
}
