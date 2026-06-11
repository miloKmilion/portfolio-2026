import { Route, Routes } from 'react-router-dom'
import { SiteLayout } from '@/components/SiteLayout'
import { HomePage } from '@/pages/HomePage'
import { AboutPage } from '@/pages/AboutPage'
import { ProjectsPage } from '@/pages/ProjectsPage'
import { ExperiencePage } from '@/pages/ExperiencePage'

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="experience" element={<ExperiencePage />} />
      </Route>
    </Routes>
  )
}
