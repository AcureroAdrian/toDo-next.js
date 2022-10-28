import { GetServerSideProps, NextPage } from "next"
import { Button, Card, Container, Grid } from "semantic-ui-react";

interface Task {
  id: Number
  title: string
  description: string
}

interface Props {
  tasks: Task[]
}

const HomePage: NextPage<Props> = ({tasks}) => {
  return (
    <div></div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const tasks = await fetch('http://localhost:3000/api/tasks').then(res => res.json())

  return {
    props: {
      tasks
    }
  }
}

export default HomePage