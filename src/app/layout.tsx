import Header from '../components/Header'
import { AuthProvider } from '../context/authContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <Header />
          <div style={{ padding: "0 2rem" }}>{children}</div>
        </body>
      </html>
    </AuthProvider>
  )
}
