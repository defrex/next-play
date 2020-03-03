import { createHttpLink } from 'apollo-link-http'
import { NextPage, NextPageContext } from 'next'
import buildHasuraProvider from 'ra-data-hasura-graphql'
import { useEffect, useState } from 'react'
import { Admin, Resource } from 'react-admin'
import Router from 'next/router'
import { nhost } from '../lib/nhost'
import { TodoList, TodoEdit, TodoCreate, TodoIcon } from '../resources/todos'

interface AdminPageProps {}

const AdminPage: NextPage<AdminPageProps> = ({}: AdminPageProps) => {
  const [dataProvider, setDataProvider] = useState()

  useEffect(() => {
    ;(async () => {
      if (!dataProvider) {
        const jwt = nhost.auth().getJWTToken()
        if (!jwt) {
          Router.push(`/login?next=${Router.pathname}`)
          return
        }

        const hasuraProvider = await buildHasuraProvider({
          clientOptions: {
            link: createHttpLink({
              uri: 'https://hasura-rf2zfg3c.nhost.app/v1/graphql',
              headers: {
                authorization: jwt ? `Bearer ${jwt}` : '',
              },
            }),
          },
        })
        setDataProvider(() => hasuraProvider)
      }
    })()
  }, [setDataProvider, dataProvider])

  if (!dataProvider) {
    return <div>Loading...</div>
  }

  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name='todos'
        list={TodoList}
        edit={TodoEdit}
        create={TodoCreate}
        icon={TodoIcon}
      />
    </Admin>
  )
}

// AdminPage.getInitialProps = async (
//   context: NextPageContext,
// ): Promise<AdminPageProps> => {
//   console.log({ context })
//   return {}
//   // console.log(buildHasuraProvider)
//   // const hasuraProviderPromise = buildHasuraProvider({
//   //   clientOptions: { uri: 'https://hasura-rf2zfg3c.nhost.app/v1/graphql' },
//   // })
//   // const dataProvider = await hasuraProviderPromise
//   // return { dataProvider }
// }

export default AdminPage
