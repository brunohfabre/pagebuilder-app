import { RendererType } from '../../Routes'
import { RenderComponent } from './RenderComponent'

type PageProps = {
  label: string
  renderer: RendererType
}

export function Page({ label, renderer }: PageProps) {
  document.title = `Page render - ${label}`

  return <RenderComponent nodeId={renderer.default} items={renderer.items} />
}
