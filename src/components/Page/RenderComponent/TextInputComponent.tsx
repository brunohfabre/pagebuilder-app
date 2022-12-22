import { TextInput } from '@siakit/form-unform'

import { NodeType } from '../../../Routes'

type TextInputComponentProps = {
  node: NodeType
}

export function TextInputComponent({ node }: TextInputComponentProps) {
  return (
    <TextInput
      name={node.attributes.name}
      label={node.attributes.label}
      placeholder={node.attributes.placeholder}
    />
  )
}
