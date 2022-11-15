import { GetServerSideProps, NextPage } from "next/types";
import { Task } from "interfaces/task";
import Error from "next/error";
import { Button, Grid, Confirm } from "semantic-ui-react";
import { useState } from "react";
import { useRouter } from 'next/router'

interface Props {
  task?: Task;
  error?: { statusCode: number; statusText: string };
}

const TaskDetail: NextPage<Props> = ({ task, error }) => {
  const [confirm, setConfirm] = useState<boolean>()
  const [isDeleting, setIsDeleting] = useState(false)

  const {query, push} = useRouter()

  const open = () => setConfirm(true)
  const close = () => setConfirm(false)

  const deleteTask = async () => {
    try {
      await fetch(`http://localhost:3000/api/tasks/${query.id}`, {
        method: 'DELETE'
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = () => {
    setIsDeleting(true)
    deleteTask()
    close()
    push('/')
  }

  if (error && error.statusCode) {
    return <Error statusCode={error?.statusCode} title={error?.statusText} />;
  }


  return (
    <Grid
      centered
      verticalAlign="middle"
      columns="1"
      style={{ height: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <h1>{task?.title}</h1>
          <p>{task?.description}</p>
          <div>
            <Button color="red" onClick={open} loading={isDeleting} disabled={isDeleting}>
              Delete
            </Button>
          </div>
        </Grid.Column>
      </Grid.Row>
      <Confirm header='Please confirm' content='Are you sure you want to delete this task?' open={confirm} onConfirm={handleDelete} onCancel={close}/>
    </Grid>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query: { id },
}) => {
  const res = await fetch(`http://localhost:3000/api/tasks/${id}`);

  if (res.status === 200) {
    const task = await res.json();
    return {
      props: {
        task,
      },
    };
  }

  return {
    props: {
      error: {
        statusCode: res.status,
        statusText: "Invalid Id",
      },
    },
  };
};

export default TaskDetail;
