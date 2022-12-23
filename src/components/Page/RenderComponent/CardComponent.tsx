import { ReactNode } from 'react'

import { Card } from '@siakit/card'

import { NodeType } from '../../../Routes'

type CardComponentProps = {
  node: NodeType
  children: ReactNode
}

export function CardComponent({ node, children }: CardComponentProps) {
  return <Card {...node.attributes}>{children}</Card>
}
