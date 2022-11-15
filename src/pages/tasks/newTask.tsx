import { stringify } from 'querystring';
import { useEffect, useState } from 'react';
import { Button, Form, Grid } from 'semantic-ui-react';
import { useRouter } from 'next/router'

interface Task {
    title?: string
    description?: string
}

const newTask = () => {
  const [newTask, setnewTask] = useState<Task>();
  const [errors, setErrors] = useState<Task>()

  const {query, push} = useRouter()

  const validate = () => {
    const errors: {title?:string, description?:string} = {}

    if(!newTask?.title) errors.title = 'Title is required'
    if(!newTask?.description) errors.description = 'Description is required'

    return errors
  }

  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    const errors = validate()
    console.log(Object.keys(errors))
    if(Object.keys(errors).length) return setErrors(errors)



    if(query.id) updateTask()
      else await createTask()
    push('/')
  };

  const createTask = async () => {
      try {
        await fetch('http://Localhost:3000/api/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newTask)
        })
      } catch (error) {
        console.log(error)
      }
  }

  const updateTask = async () => {
    try {
      await fetch(`http://Localhost:3000/api/tasks/${query.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
      })
    } catch (error) {
      console.log(error)
    }
}

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setnewTask({...newTask, [e.target.id]: e.target.value} as Task);

  const getTask = async () => {
    const data = await fetch(`http://localhost:3000/api/tasks/${query.id}`).then(res => res.json())
    setnewTask({title: data.title, description: data.description})
  }

    useEffect(() => {
      console.log(query)
      if (query.id) getTask() 
    }, [])
    

  return (
    <Grid
      centered
      verticalAlign='middle'
      columns='3'
      style={{ height: '80vh' }}
    >
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <h1>{query.id ? 'Update Task' : 'Create Task'}</h1>
          <Form>
            <Form.Input
              label='Title'
              id='title'
              placeholder='Title'
              onChange={handleChange}
              error={errors?.title ? {content: 'Please enter a title', pointing: 'below'} : null}
              value={newTask?.title}
            />
            <Form.TextArea
              label='Description'
              id='description'
              placeholder='Description'
              onChange={handleChange}
              error={errors?.description ? {content: 'Please enter a description', pointing: 'below'}: null}
              value={newTask?.description}
            />
            <Button primary onClick={handleSubmit}>
              <p>{query.id ? 'Update' : 'Create'}</p>
            </Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default newTask;
