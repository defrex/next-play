import BookIcon from '@material-ui/icons/Book'
import React from 'react'
import {
  BooleanInput,
  Create,
  Datagrid,
  DateField,
  Edit,
  EditButton,
  List,
  SimpleForm,
  TextField,
  TextInput,
} from 'react-admin'

export const TodoIcon = BookIcon

export const TodoList = (props: any) => (
  <List {...props}>
    <Datagrid>
      <TextField source='id' />
      <DateField source='created_at' />
      <TextField source='updated_at' />
      <TextField source='name' />
      <TextField source='done' />
      <EditButton basePath='/todos' />
    </Datagrid>
  </List>
)

export const TodoEdit = (props: any) => (
  <Edit title='Edit Togo' {...props}>
    <SimpleForm>
      <TextInput disabled source='id' />
      <TextInput source='name' />
      <BooleanInput source='done' />
    </SimpleForm>
  </Edit>
)

export const TodoCreate = (props: any) => (
  <Create title='Create a Todo' {...props}>
    <SimpleForm>
      <TextInput source='name' />
    </SimpleForm>
  </Create>
)
