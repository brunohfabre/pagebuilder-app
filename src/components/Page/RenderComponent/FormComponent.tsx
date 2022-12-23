import { ReactNode, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import axios from 'axios'

import { FormHandles, Form } from '@siakit/form-unform'
import { useLoading } from '@siakit/loading'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { NodeType } from '../../../Routes'
import { hasVariables } from '../../../utils/hasVariables'
import { insertVariablesInString } from '../../../utils/insertVariableInString'

type FormComponentProps = {
  node: NodeType
  children: ReactNode
}

export function FormComponent({ node, children }: FormComponentProps) {
  const params = useParams<{ [key: string]: any }>()
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const formRef = useRef<FormHandles>(null)

  const { setLoading } = useLoading()

  useQuery(
    [node.attributes.getRoute],
    async () => {
      setLoading(true)

      const response = await axios.get(
        insertVariablesInString(node.attributes.getRoute, params),
      )

      return response.data
    },
    {
      enabled:
        !!node.attributes.getRoute &&
        hasVariables(node.attributes.getRoute, params),
      retry: false,
      onSuccess: (data) => {
        formRef.current?.setData(data)
      },
      onSettled: () => setLoading(false),
    },
  )

  async function handleSubmit(data: any) {
    try {
      setLoading(true)

      if (hasVariables(node.attributes.updateRoute, params)) {
        const response = await axios.put(
          insertVariablesInString(node.attributes.updateRoute, params),
          data,
        )

        if (node.attributes.referenceId) {
          queryClient.setQueryData(
            [node.attributes.referenceId],
            (prevState: any) => {
              if (Array.isArray(prevState)) {
                return prevState.map((item: { [key: string]: any }) =>
                  item.id === response.data.id ? response.data : item,
                )
              }
            },
          )
        }
      } else {
        const response = await axios.post(node.attributes.createRoute, data)

        if (node.attributes.referenceId) {
          queryClient.setQueryData(
            [node.attributes.referenceId],
            (prevState: any) => {
              if (Array.isArray(prevState)) {
                return [...prevState, response.data]
              }
            },
          )
        }
      }

      navigate(-1)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form ref={formRef} onSubmit={handleSubmit} flex={node.attributes?.flex}>
      {children}
    </Form>
  )
}
