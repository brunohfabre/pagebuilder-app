import { Route, Routes } from 'react-router-dom'

import { LayoutType } from '.'
import { Page } from '../components/Page'
import { NotFound } from '../pages/NotFound'

type AppRoutesProps = {
  layouts: LayoutType[]
}

export function AppRoutes({ layouts }: AppRoutesProps) {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />

      {layouts.map((layout) => (
        <Route
          key={layout.id}
          element={<Page label={layout.label} renderer={layout.renderer} />}
        >
          {layout.routes.map((route) => (
            <Route
              key={route.id}
              path={route.route}
              element={<Page label={route.label} renderer={route.renderer} />}
            />
          ))}
        </Route>
      ))}
    </Routes>
  )
}
