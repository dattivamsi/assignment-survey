import { Button, Modal, Space, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import NewTodo from "./NewTodo";
import Title from "antd/es/skeleton/Title";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
// import "./styles.css";

const Todos = () => {
  const [todoItems, setTodoItems] = useState({});
  const [isModalVisibl, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteRecord,setDeleteRecord] = useState(null)
  const [selectedTodo, setSelectedTodo] = useState(null);
  useEffect(() => {
    fetch(`https://dummyjson.com/todos`)
      .then((res) => res.json())
      .then((data) => setTodoItems(data));
  }, []); 

  const columns = [
    {
      title: "S No",
      dataIndex: "id",
      key: "id",
      width: 70,
    },
    {
      title: "Description",
      dataIndex: "todo",
      key: "todo",
      width: 350,
    },
    {
      title: "Status",
      dataIndex: "completed",
      key: "completed",
      render: (data) => (data ? <div className="status"><p className="complted">Completed</p></div> :<div className="In-status"> <p className="complted">Inprogress</p></div>),
      width: 150,
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      render: (_, record) => (
        <>
          <EditOutlined style={{marginRight:"2rem"}} onClick={() => handleInviteClick(record)}/>
           <DeleteOutlined onClick={() => handleDeleteModal(record)}/> 
        </>
      ),
    },
  ];

  const paginationChanges = (k, pageSize) => {
    fetch(`https://dummyjson.com/todos?limit=${pageSize}&skip=${pageSize * (k-1)}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Response ==> ", data) 
        setTodoItems(data)});
  };

  const handleInviteClick = (record) => {
    setSelectedTodo(record);
    setIsModalVisible(true);
  };

  const handleAddButton = () => {
    setIsModalVisible(true);
  };

  const handleDeleteModal = (record) =>{
    setIsDeleteModalVisible(true);
    setDeleteRecord(record)
  }

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsDeleteModalVisible(false)
    setSelectedTodo(null)
  };

  const handleDelete = (record) =>{
    fetch(`https://dummyjson.com/todos/${deleteRecord.id}`, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then((data)=>{
        if (data.isDeleted) {
          message.success("Deleted successfully");
          setTodoItems((prev) => ({
            ...prev,
            todos: prev.todos.filter((item) => item.id !== deleteRecord.id),
          }));
      }
    });

    setIsDeleteModalVisible(false)
    setDeleteRecord(null)
  }

  const handleSubmit = (data) => {
    if (data.id) {
      fetch(`https://dummyjson.com/todos/${data?.id}`, {
        method: "PUT" /* or PATCH */,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          completed: data?.completed,
        }),
      })
        .then((res) => res.json())
        .then((data)=>{
          if(data?.id){
            message.success("Updated successfully");
          }
        });
    } else {
      fetch("https://dummyjson.com/todos/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          todo: "Use DummyJSON in the project",
          completed: data?.completed,
          userId: 10,
        }),
      })
        .then((res) => res.json())
        .then((data)=>{
          if(data?.id){
            message.success("Created successfully");
          }
        });
    }
    setIsModalVisible(false);
    setSelectedTodo(null);
  };

  return (
    <>
      {isDeleteModalVisible && (
        <Modal
          title={
            <Title level={4}>
              {"new_report"} &nbsp;
              <span className="text-small">{"enter_and_save"}</span>
            </Title>
          }
          open={isDeleteModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="cancel" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleDelete}>
              Confirm
            </Button>,
          ]}
          className="right-alinged-modal"
        >
          Do You want confirmDelete
        </Modal>
      )}
      {isModalVisibl && (
        <Modal
          title={
            <Title level={4}>
              {"new_report"} &nbsp;
              <span className="text-small">{"enter_and_save"}</span>
            </Title>
          }
          open={isModalVisibl}
          onCancel={handleCancel}
          footer={null}
          className="right-alinged-modal"
        >
          <NewTodo
            onSubmit={handleSubmit}
            handleCancel={handleCancel}
            defaultValues={selectedTodo}
          />
        </Modal>
      )}
      <p className="head-content">To Do Application</p>
      <div style={{width:"5rem", margin:"auto"}}>
        <Button onClick={() => handleAddButton()}>Add Todo</Button>
      </div>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Table
          columns={columns}
          dataSource={todoItems?.todos}
          pagination={{
            total: todoItems?.total,
            defaultPageSize: todoItems?.limit,
            onChange: (pageNo, pageSize) => {
              paginationChanges(pageNo, pageSize);
            },
          }}
        />
      </div>
    </>
  );
};

export default Todos;
