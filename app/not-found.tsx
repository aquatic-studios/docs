import Link from 'next/link'

export const metadata = {
  title: '404'
}

export default function NotFound() {
  return (
    <div className="aq-404">
      <span className="aq-404__code">404</span>
      <h1>Esta página se fue al fondo del mar</h1>
      <p>
        El enlace que seguiste no existe o cambió de lugar. Probá con el buscador o volvé al inicio.
      </p>
      <Link href="/" className="aq-btn aq-btn--primary">
        Volver al inicio
      </Link>
    </div>
  )
}
