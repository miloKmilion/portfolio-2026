import { Outlet } from 'react-router-dom'
import { TopNav } from './TopNav'
import { Footer } from './Footer'

export function SiteLayout() {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col antialiased">
      <div className="noise-overlay" aria-hidden />
      <TopNav />
      <main className="flex-grow pt-[104px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
