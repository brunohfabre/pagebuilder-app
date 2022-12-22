import { Heading } from '@siakit/heading'

import { NodeType } from '../../../Routes'

type HeadingComponentProps = {
  node: NodeType
}

export function HeadingComponent({ node }: HeadingComponentProps) {
  return <Heading>{node.attributes.text}</Heading>
}
