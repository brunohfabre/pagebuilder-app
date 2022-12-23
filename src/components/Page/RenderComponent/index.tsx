import { Outlet } from 'react-router-dom'

import { Flex } from '@siakit/layout'
import { Text } from '@siakit/text'

import { ItemsType } from '../../../Routes'
import { ButtonComponent } from './ButtonComponent'
import { CardComponent } from './CardComponent'
import { FlexComponent } from './FlexComponent'
import { FooterComponent } from './FooterComponent'
import { FormComponent } from './FormComponent'
import { HeadingComponent } from './HeadingComponent'
import { SearchComponent } from './SearchComponent'
import { TableComponent } from './TableComponent'
import { TextComponent } from './TextComponent'
import { TextInputComponent } from './TextInputComponent'

type RenderComponentProps = {
  nodeId: string
  items: ItemsType
}

export function RenderComponent({ nodeId, items }: RenderComponentProps) {
  const node = items[nodeId]

  if (node.type === 'flex') {
    return (
      <FlexComponent node={node}>
        {node.children?.map((item) => (
          <RenderComponent key={item} nodeId={item} items={items} />
        ))}
      </FlexComponent>
    )
  }

  if (node.type === 'card') {
    return (
      <CardComponent node={node}>
        {node.children?.map((item) => (
          <RenderComponent key={item} nodeId={item} items={items} />
        ))}
      </CardComponent>
    )
  }

  if (node.type === 'footer') {
    return (
      <FooterComponent node={node}>
        {node.children?.map((item) => (
          <RenderComponent key={item} nodeId={item} items={items} />
        ))}
      </FooterComponent>
    )
  }

  if (node.type === 'heading') {
    return <HeadingComponent node={node} />
  }

  if (node.type === 'text') {
    return <TextComponent node={node} />
  }

  if (node.type === 'button') {
    return <ButtonComponent node={node} />
  }

  if (node.type === 'table') {
    return <TableComponent node={node} />
  }

  if (node.type === 'search') {
    return <SearchComponent node={node} />
  }

  if (node.type === 'form') {
    return (
      <FormComponent node={node}>
        {node.children?.map((item) => (
          <RenderComponent key={item} nodeId={item} items={items} />
        ))}
      </FormComponent>
    )
  }

  if (node.type === 'text-input') {
    return <TextInputComponent node={node} />
  }

  if (node.type === 'outlet') {
    return <Outlet />
  }

  return (
    <Flex>
      <Text>component not defined</Text>
    </Flex>
  )
}
