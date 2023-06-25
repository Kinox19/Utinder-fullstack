import './globals.css'

export const metadata = {
  title: 'Untinder',
  description: 'Найди свою уточку',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
