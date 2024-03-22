import React, { useState } from "react";
import { Box, Heading, Text, VStack, HStack, Button, Input, Textarea, Select, Checkbox, Table, Thead, Tbody, Tr, Th, Td, Divider, Spacer, Image } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

const Index = () => {
  const [matters, setMatters] = useState([
    { id: 1, client: "Acme Inc", description: "Patent filing", status: "In Progress", priority: "High" },
    { id: 2, client: "Beta LLC", description: "Trademark registration", status: "New", priority: "Medium" },
  ]);
  const [tasks, setTasks] = useState([
    { id: 1, matter: 1, description: "Draft patent application", dueDate: "2023-06-30", assignee: "John" },
    { id: 2, matter: 1, description: "File patent with USPTO", dueDate: "2023-07-15", assignee: "Mary" },
    { id: 3, matter: 2, description: "Conduct trademark search", dueDate: "2023-06-15", assignee: "John" },
  ]);

  const [showAddMatter, setShowAddMatter] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newMatter, setNewMatter] = useState({ client: "", description: "", priority: "Medium" });
  const [newTask, setNewTask] = useState({ matter: matters[0]?.id, description: "", dueDate: "", assignee: "" });

  const addMatter = () => {
    setMatters([...matters, { ...newMatter, id: Math.max(...matters.map((m) => m.id)) + 1, status: "New" }]);
    setShowAddMatter(false);
    setNewMatter({ client: "", description: "", priority: "Medium" });
  };

  const addTask = () => {
    setTasks([...tasks, { ...newTask, id: Math.max(...tasks.map((t) => t.id)) + 1 }]);
    setShowAddTask(false);
    setNewTask({ matter: matters[0]?.id, description: "", dueDate: "", assignee: "" });
  };

  return (
    <Box maxWidth="1200px" mx="auto" p={8}>
      <Heading mb={8}>Legal Workflow Management</Heading>

      <HStack mb={8} spacing={4} alignItems="flex-start">
        <VStack alignItems="stretch" minWidth="50%">
          <HStack mb={4}>
            <Heading size="md">Matters</Heading>
            <Spacer />
            <Button leftIcon={<FaPlus />} onClick={() => setShowAddMatter(true)}>
              Add Matter
            </Button>
          </HStack>

          <Box display={showAddMatter ? "block" : "none"} mb={4} p={4} bg="gray.100">
            <VStack spacing={2} alignItems="stretch">
              <Input placeholder="Client" value={newMatter.client} onChange={(e) => setNewMatter({ ...newMatter, client: e.target.value })} />
              <Textarea placeholder="Description" value={newMatter.description} onChange={(e) => setNewMatter({ ...newMatter, description: e.target.value })} />
              <Select value={newMatter.priority} onChange={(e) => setNewMatter({ ...newMatter, priority: e.target.value })}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </Select>
              <HStack justify="flex-end">
                <Button onClick={() => setShowAddMatter(false)}>Cancel</Button>
                <Button colorScheme="blue" onClick={addMatter}>
                  Add
                </Button>
              </HStack>
            </VStack>
          </Box>

          <Table>
            <Thead>
              <Tr>
                <Th>Client</Th>
                <Th>Description</Th>
                <Th>Status</Th>
                <Th>Priority</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {matters.map((matter) => (
                <Tr key={matter.id}>
                  <Td>{matter.client}</Td>
                  <Td>{matter.description}</Td>
                  <Td>{matter.status}</Td>
                  <Td>{matter.priority}</Td>
                  <Td>
                    <HStack spacing={2}>
                      <Button size="sm" leftIcon={<FaEdit />}>
                        Edit
                      </Button>
                      <Button size="sm" leftIcon={<FaTrash />} variant="ghost" colorScheme="red">
                        Delete
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </VStack>

        <Divider orientation="vertical" />

        <VStack alignItems="stretch" minWidth="50%">
          <HStack mb={4}>
            <Heading size="md">Tasks</Heading>
            <Spacer />
            <Button leftIcon={<FaPlus />} onClick={() => setShowAddTask(true)}>
              Add Task
            </Button>
          </HStack>

          <Box display={showAddTask ? "block" : "none"} mb={4} p={4} bg="gray.100">
            <VStack spacing={2} alignItems="stretch">
              <Select placeholder="Select Matter" value={newTask.matter} onChange={(e) => setNewTask({ ...newTask, matter: e.target.value })}>
                {matters.map((matter) => (
                  <option key={matter.id} value={matter.id}>
                    {matter.client} - {matter.description}
                  </option>
                ))}
              </Select>
              <Textarea placeholder="Description" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
              <Input placeholder="Due Date" type="date" value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} />
              <Input placeholder="Assignee" value={newTask.assignee} onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })} />
              <HStack justify="flex-end">
                <Button onClick={() => setShowAddTask(false)}>Cancel</Button>
                <Button colorScheme="blue" onClick={addTask}>
                  Add
                </Button>
              </HStack>
            </VStack>
          </Box>

          <Table>
            <Thead>
              <Tr>
                <Th>Matter</Th>
                <Th>Description</Th>
                <Th>Due Date</Th>
                <Th>Assignee</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {tasks.map((task) => (
                <Tr key={task.id}>
                  <Td>{matters.find((m) => m.id === task.matter)?.client}</Td>
                  <Td>{task.description}</Td>
                  <Td>{task.dueDate}</Td>
                  <Td>{task.assignee}</Td>
                  <Td>
                    <HStack spacing={2}>
                      <Button size="sm" leftIcon={<FaEdit />}>
                        Edit
                      </Button>
                      <Button size="sm" leftIcon={<FaTrash />} variant="ghost" colorScheme="red">
                        Delete
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </VStack>
      </HStack>

      <Box textAlign="center">
        <Image src="https://images.unsplash.com/photo-1559523182-a284c3fb7cff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxsYXclMjBmaXJtJTIwb2ZmaWNlfGVufDB8fHx8MTcxMTEyMTYyMHww&ixlib=rb-4.0.3&q=80&w=1080" maxHeight="300px" mx="auto" />
        <Text fontSize="sm" color="gray.500">
          Streamline your legal practice with our workflow management solution
        </Text>
      </Box>
    </Box>
  );
};

export default Index;
