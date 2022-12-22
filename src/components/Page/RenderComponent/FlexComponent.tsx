import { ReactNode } from 'react'

import { Flex } from '@siakit/layout'

import { NodeType } from '../../../Routes'

type FlexComponentProps = {
  node: NodeType
  children: ReactNode
}

export function FlexComponent({ node, children }: FlexComponentProps) {
  return <Flex {...node.attributes}>{children}</Flex>
}
