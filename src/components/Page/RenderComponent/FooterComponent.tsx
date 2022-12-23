import { ReactNode } from 'react'

import { Footer } from '@siakit/footer'

import { NodeType } from '../../../Routes'

type FooterComponentProps = {
  node: NodeType
  children: ReactNode
}

export function FooterComponent({ node, children }: FooterComponentProps) {
  return <Footer {...node.attributes}>{children}</Footer>
}
