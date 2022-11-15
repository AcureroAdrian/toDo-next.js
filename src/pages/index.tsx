import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router";
import { Button, Card, Container, Grid } from "semantic-ui-react";

interface Task {
  _id: number
  title: string
  description: string
}

interface Props {
  tasks: Task[]
}

const HomePage: NextPage<Props> = ({tasks}) => {

  const router = useRouter()


  if (!tasks.length)
    return (
      <Grid centered verticalAlign="middle" columns='1' style={{height: '80vh'}}>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h1>There are no tasks yet</h1>
            <img src="https://img.freepik.com/vector-gratis/ningun-concepto-ilustracion-datos_108061-573.jpg?size=338&ext=png" alt="No tasks yet" />
            <div>
              <Button primary onClick={() => router.push('/tasks/newTask')}>
                <p>Create a Task</p>
              </Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    ) 

  return (
    <Container style={{padding: '20px'}}>
      <Card.Group itemsPerRow={4}>
        {tasks.map(task => (
            <Card key={task._id}>
              <Card.Content>
                <Card.Header>{task.title}</Card.Header>
                <Card.Description>{task.description}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button primary onClick={() => router.push(`/tasks/${task._id}`)}><p>View</p></Button>
                <Button primary onClick={() => router.push(`/tasks/${task._id}/edit`)}><p>Edit</p></Button>
              </Card.Content>
            </Card>
          ))
        }
      </Card.Group>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const tasks = await fetch('mongodb+srv://AdrianAcurero:monoloko@atlascluster.k8joijz.mongodb.net/?retryWrites=true&w=majority/api/tasks').then(res => res.json())
  

  return {
    props: {
      tasks
    }
  }
}

export default HomePage