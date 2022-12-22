import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@siakit/button'
import { Form, FormHandles, TextInput } from '@siakit/form-unform'
import { Flex } from '@siakit/layout'
import { Table } from '@siakit/table'
import { useQuery } from '@tanstack/react-query'

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

  const [search, setSearch] = useState('')

  const { data, isLoading } = useQuery(
    [
      node.id,
      {
        search,
      },
    ],
    async () => {
      const response = await api.get(node.attributes.route, {
        params: {
          search,
        },
      })

      return response.data
    },
  )

  function handleSearch(data: HandleSearchData) {
    setSearch(data.search)
  }

  function handleActionClick(item: any, action: any) {
    if (action.action === 'navigate') {
      navigate(insertVariablesInString(action.route, item))
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
          label: action.label,
          onClick: (item: any) => handleActionClick(item, action),
        }))}
      />
    </Flex>
  )
}
