import '../globals.css'

export default function EmbedLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-[var(--bg)] text-[var(--fg)]">
        {children}
      </body>
    </html>
  )
}
