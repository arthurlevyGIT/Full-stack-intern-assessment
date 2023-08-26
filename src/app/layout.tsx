import Header from '../components/Header'
import { AuthProvider } from '../context/authContext'
import '../styles/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className='bg-gray-900 text-gray-200'>
          <Header />
          <div style={{ padding: "0 2rem" }}>{children}</div>
        </body>
      </html>
    </AuthProvider>
  )
}
