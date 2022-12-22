import { Flex } from '@siakit/layout'
import { Text } from '@siakit/text'
import { useQuery } from '@tanstack/react-query'

import { api } from '../lib/api'
import { AppRoutes } from './AppRoutes'

export type NodeType = {
  id: string
  type: string
  attributes: { [key: string]: any }
  parentId: string | null
  children?: string[]
}

export type ItemsType = { [key: string]: NodeType }

export type RendererType = {
  id: string
  default: string
  items: ItemsType
}

export type RouteType = {
  id: string
  label: string
  route: string
  renderer: RendererType
}

export type LayoutType = {
  id: string
  label: string
  renderer: RendererType
  routes: RouteType[]
}

export function Routes() {
  const { data: layouts, isLoading: isLayoutsLoading } = useQuery(
    ['layouts'],
    async () => {
      const response = await api.get<LayoutType[]>('/layouts')

      return response.data
    },
  )

  if (!layouts && isLayoutsLoading) {
    return (
      <Flex flex align="center" justify="center">
        <Text>Loading application content</Text>
      </Flex>
    )
  }

  return <AppRoutes layouts={layouts ?? []} />
}
