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

    if (node.attributes?.action === 'go-back') {
      navigate(-1)
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
    <Button
      type={node.attributes?.type}
      variant={node.attributes?.variant}
      colorScheme={node.attributes?.colorScheme}
      onClick={handleClick}
    >
      {renderLabel()}
    </Button>
  )
}
