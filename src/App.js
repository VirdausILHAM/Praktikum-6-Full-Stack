import React, { useState } from 'react';
import { Container, Button, Card, Form, InputGroup } from 'react-bootstrap';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const [newTaskName, setNewTaskName] = useState('');

  const handleShowForm = () => setShowForm(true);
  const handleCloseForm = () => {
    setShowForm(false);
    setTaskToEdit(null);
  };
  
  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };
  
  const editTask = (updatedTask) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
  };
  
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  
  const showEditForm = (task) => {
    setTaskToEdit(task);
    handleShowForm();
  };

  const handleAddTaskSubmit = (e) => {
    e.preventDefault(); 
    if (newTaskName.trim() === '') return; 

    const newTask = {
      name: newTaskName,
      priority: 'Medium', 
      status: 'To Do'     
    };
    
    addTask(newTask); 
    setNewTaskName(''); 
  };

  return (
    <Container className="my-5">
      <Card className="shadow-sm border-0 p-4 mb-4">
        <h3 className="text-center mb-4 text-primary">📝 List Tugas</h3>
        <Form onSubmit={handleAddTaskSubmit}>
          <InputGroup>
            <Form.Control
              placeholder="Masukkan tugas baru..."
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              className="py-2"
            />
            <Button variant="primary" type="submit" className="px-4">
              Tambah
            </Button>
          </InputGroup>
        </Form>
      </Card>

      <TaskList
        tasks={tasks}
        deleteTask={deleteTask}
        showEditForm={showEditForm}
      />

      <TaskForm
        show={showForm}
        handleClose={handleCloseForm}
        addTask={addTask}
        editTask={editTask}
        taskToEdit={taskToEdit}
      />
    </Container>
  );
}

export default App;
