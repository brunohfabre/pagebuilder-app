import { Text } from '@siakit/text'

import { NodeType } from '../../../Routes'

type TextComponentProps = {
  node: NodeType
}

export function TextComponent({ node }: TextComponentProps) {
  return <Text>{node.attributes.text}</Text>
}
