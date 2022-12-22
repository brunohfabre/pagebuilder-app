import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '@siakit/button'

import { NodeType } from '../../../Routes'

type ButtonComponentProps = {
  node: NodeType
}

export function ButtonComponent({ node }: ButtonComponentProps) {
  const params = useParams()
  const navigate = useNavigate()

  function handleClick() {
    if (node.attributes?.action === 'navigate') {
      if (node.attributes.to.external) {
        window.open(node.attributes.to.route)
      } else {
        navigate(node.attributes.to.route)
      }
    }
  }

  function renderLabel() {
    if (node.attributes.type === 'submit') {
      if (Object.keys(params).length) {
        return node.attributes?.alternativeLabel
      }

      return node.attributes?.label
    }

    return node.attributes?.label
  }

  return (
    <Button type={node.attributes?.type} onClick={handleClick}>
      {renderLabel()}
    </Button>
  )
}
