import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@siakit/button'
import { useDialog } from '@siakit/dialog'
import { Form, FormHandles, TextInput } from '@siakit/form-unform'
import { Flex } from '@siakit/layout'
import { useLoading } from '@siakit/loading'
import { Table } from '@siakit/table'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { api } from '../../../lib/api'
import { NodeType } from '../../../Routes'
import { insertVariablesInString } from '../../../utils/insertVariableInString'

type TableComponentProps = {
  node: NodeType
}

type HandleSearchData = {
  search: string
}

export function TableComponent({ node }: TableComponentProps) {
  const navigate = useNavigate()

  const formRef = useRef<FormHandles>(null)
  const { addDialog } = useDialog()
  const { setLoading } = useLoading()

  const [search, setSearch] = useState('')

  const queryClient = useQueryClient()

  const key = [
    node.id,
    {
      search,
    },
  ]

  const { data } = useQuery(
    key,
    async () => {
      setLoading(true)

      const response = await api.get(node.attributes.route, {
        params: {
          search,
        },
      })

      return response.data
    },
    {
      onSettled: () => {
        setLoading(false)
      },
    },
  )

  function handleSearch(data: HandleSearchData) {
    setSearch(data.search)
  }

  function handleActionClick(item: any, action: any) {
    if (action.action === 'navigate') {
      navigate(insertVariablesInString(action.route, item))
    }

    if (action.action === 'delete') {
      const { title, description } = action

      addDialog({
        type: 'danger',
        title,
        description,
        onAction: async () => {
          await api({
            method: 'delete',
            url: insertVariablesInString(action.route, item),
          })

          queryClient.setQueryData(key, (prevState: any) =>
            prevState.filter((data: any) => data.id !== item.id),
          )
        },
        actionText: 'Yes, delete',
      })
    }
  }

  return (
    <Flex direction="column" gap>
      <Flex justify="between" flexWrap="wrap">
        <Flex gap={8}>
          {node.attributes?.buttons?.length &&
            node.attributes?.buttons.map((button: any) => (
              <Button
                key={button.label}
                type="button"
                variant={button.variant}
                onClick={() => navigate(button.route)}
              >
                {button.label}
              </Button>
            ))}
        </Flex>

        {node.attributes?.search && (
          <Form ref={formRef} onSubmit={handleSearch}>
            <Flex gap={8}>
              <Flex width={360}>
                <TextInput name="search" placeholder="Search" />
              </Flex>

              <Button
                type="button"
                onClick={() => formRef.current?.submitForm()}
              >
                Search
              </Button>
            </Flex>
          </Form>
        )}
      </Flex>

      <Table
        headers={node.attributes?.headers ?? []}
        data={data ?? []}
        actions={node.attributes?.actions?.map((action: any) => ({
          type: action.action === 'delete' ? 'danger' : 'default',
          label: action.label,
          onClick: (item: any) => handleActionClick(item, action),
        }))}
      />
    </Flex>
  )
}
