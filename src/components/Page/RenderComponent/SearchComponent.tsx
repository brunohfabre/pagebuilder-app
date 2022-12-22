import { useRef } from 'react'

import { Button } from '@siakit/button'
import { Form, FormHandles, TextInput } from '@siakit/form-unform'
import { Flex } from '@siakit/layout'

import { NodeType } from '../../../Routes/AppRoutes'

type SearchComponentProps = {
  node: NodeType
}

type HandleSubmitData = {
  search: string
}

export function SearchComponent({ node }: SearchComponentProps) {
  const formRef = useRef<FormHandles>(null)

  function handleSubmit(data: HandleSubmitData) {
    console.log(data)
  }

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Flex gap={8}>
        <TextInput name="search" placeholder="Text search here.." />

        <Button type="button" onClick={() => formRef.current?.submitForm()}>
          Search
        </Button>
      </Flex>
    </Form>
  )
}
