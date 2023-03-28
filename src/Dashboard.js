import { Card, Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

const Dashboard = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [home_address, setHomeAddress] = useState("");
  const [date_of_birth, setDateOfBirth] = useState("");
  const [date_of_employment, setDateOfEmployment] = useState("");
  const [rows, setRows] = useState([]);

  useEffect(() => {
    listAllEmployees();
  }, []);

  const addEmployee = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `https://web-production-08c7.up.railway.app/employee`,
      {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          home_address,
          date_of_birth,
          date_of_employment,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
  };

  const listAllEmployees = async () => {
    const response = await fetch(
      `https://web-production-08c7.up.railway.app/employee`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    const data = await response.json();

    console.log(data);
    setRows(data.message);
  };

  const editEmployee = async (event) => {
    const id = event.public_id;
    const first_name = event.first_name;
    const last_name = event.last_name;
    const email = event.email;
    const home_address = event.home_address;

    const response = await fetch(
      `https://web-production-08c7.up.railway.app/employee/${id}`,
      {
        method: "PATCH",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          home_address,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
  };

  const updateRows = (newRow) => {
    editEmployee(newRow);
    return newRow;
  };

  const deleteEmployee = async (event, Row) => {
    event.preventDefault();

    const id = Row.public_id;

    const response = await fetch(
      `https://web-production-08c7.up.railway.app/employee/${id}`,
      {
        method: "DELETE",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          home_address,
        }),
      }
    );
    await response.json();
  };

  const columns = [
    {
      field: "first_name",
      headerName: "First Name",
      width: 120,
      editable: true,
    },
    { field: "last_name", headerName: "Last Name", width: 120, editable: true },
    { field: "email", headerName: "Email", width: 120, editable: true },
    {
      field: "home_address",
      headerName: "Home Address",
      width: 120,
      editable: true,
    },
    {
      field: "date_of_birth",
      headerName: "Date of Birth",
      width: 120,
      editable: true,
    },
    {
      field: "date_of_employment",
      headerName: "Date of Employment",
      width: 120,
      editable: true,
    },
    {
      field: "deleteButton",
      headerName: "Actions",
      width: 80,
      renderCell: (params) => {
        return (
          <IconButton
            type="submit"
            aria-label="delete"
            onClick={(e) => deleteEmployee(e, params.row)}
          >
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];
  return (
    <Card style={{ background: "#819189" }}>
      <Card.Body>
        <Row>
          <h2 className="text-center mb-4"> Employee Management</h2>
          <Col>
            <Form onSubmit={addEmployee}>
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Home Address</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setHomeAddress(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  placeholder="yyyy-dd-MM"
                  type="text"
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Date of Employment</Form.Label>
                <Form.Control
                  placeholder="yyyy-dd-MM"
                  type="text"
                  onChange={(e) => setDateOfEmployment(e.target.value)}
                />
              </Form.Group>
              <Form.Group class="col-sm-10 offset-sm-1 text-center">
                <IconButton type="submit">
                  <PersonAddAlt1Icon fontSize="large" />
                </IconButton>
              </Form.Group>
            </Form>
          </Col>
          <Col>
            <DataGrid
              style={{
                background: "#9fa8a3",
                width: "100%",
                height: "500px",
              }}
              getRowId={(rows) => rows.public_id}
              rows={rows}
              columns={columns}
              processRowUpdate={updateRows}
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Dashboard;
