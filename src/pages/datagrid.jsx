import React, { useState, useEffect } from "react"
import StyledDataGrid from "../assets/styles/datagrid"
import EmployeeLayout from "../layouts/EmployeeLayout"
import $http from "../plugins/axios"
import MaintenanceScheduleForm from "./MaintainenceScheduleForm"
import Button from "@mui/material/Button"
import Avatar from "@mui/material/Avatar"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { FormControlLabel, IconButton } from "@material-ui/core"
import { blue, red } from "@material-ui/core/colors"
import Alert from "@mui/material/Alert"


const EditRecord = ({ index }) => {
  const [category, updateCategory] = useState("")
  const [description, updateDescription] = useState("")
  const [date, updateDate] = useState("")

  const handleEditClick = async e => {
    console.log("this one will be edited")
    try {
      e.preventDefault()
      await $http
        .Api({
          method: "PUT",
          url: "/service-request/" + index,
          data: {
            date: '20-02-22',
            category: 'Software Update',
            description: 'wahomewahome',
            completed: true
          },
        })
        .then(console.log("it has been edited"))
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div>
      <FormControlLabel
        control={
          <IconButton
            color="secondary"
            aria-label="add an alarm"
            onClick={handleEditClick}
          >
            <EditIcon style={{ color: blue[500] }} />
          </IconButton>
        }
      />
    </div>
  )
}
const DeleteRecord = ({ index }) => {
  const handleDeleteClick = async e => {
    console.log("this one will be deleted")
    try {
      e.preventDefault()
      await $http
        .Api({
          method: "DELETE",
          url: "/service-request/" + index,
          data: {},
        })
        .then(console.log("it has been deleted"))
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div>
      <FormControlLabel
        control={
          <IconButton
            color="secondary"
            aria-label="add an alarm"
            onClick={handleDeleteClick}
          >
            <DeleteIcon style={{ color: red[500] }} />
          </IconButton>
        }
      />
    </div>
  )
}
const EmployeePerformance = () => {
  const CompletedButton = ({ index }) => {
    const handleApprovedClick = async e => {}
    return (
      <div className="d-flex  align-items-center" style={{ cursor: "pointer" }}>
        <Button size="small" variant="outlined" color="success">
          COMPLETED
        </Button>
      </div>
    )
  }
  const NotCompletedButton = ({ index }) => {
    const handleNotApprovedClick = async e => {}
    return (
      <div className="d-flex  align-items-center" style={{ cursor: "pointer" }}>
        <Button size="small" variant="outlined" color="error">
          NOT COMPLETED
        </Button>
      </div>
    )
  }
  const columns = [
    // { field: "id", headerName: "ID" },
    {
      field: "category",
      headerName: "Service Category",
      width: 200,
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      width: 300,
      editable: true,
    },
    { field: "date", headerName: "Service Date", width: 200, editable: true },
    {
      field: "user_id",
      headerName: "Assigned To userId",
      width: 200,
      editable: true,
    },
    {
      field: "completed",
      headerName: "Completion Status",
      width: 140,
      sortable: true,
      editable: true,
      type: "boolean",
      disableClickEventBubbling: true,
      renderCell: params => {
        let decidedIcon
        if (params.row.completed === 1) {
          decidedIcon = (
            <div
              className="d-flex  align-items-center"
              style={{ cursor: "pointer" }}
            >
              <CompletedButton index={params.row.id} />
            </div>
          )
        } else if (params.row.completed === 0) {
          decidedIcon = (
            <div
              className="d-flex  align-items-center"
              style={{ cursor: "pointer" }}
            >
              <NotCompletedButton index={params.row.id} />
            </div>
          )
        }
        return <div>{decidedIcon}</div>
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 140,
      disableClickEventBubbling: true,
      renderCell: params => {
        return (
          <div className="columns">
            <div className="column">
              <div
                className="d-flex  align-items-center"
                style={{ cursor: "pointer" }}
              >
                <EditRecord index={params.row.id} />
              </div>
            </div>
            <div className="column">
              <div
                className="d-flex  align-items-center"
                style={{ cursor: "pointer" }}
              >
                <DeleteRecord index={params.row.id} />
              </div>
            </div>
          </div>
        )
      },
    },
  ]
  const [tableData, setTableData] = useState([])
  const [pageSize, setPageSize] = React.useState(25)
  const [editRowsModel, setEditRowsModel] = React.useState({})

  const handleEditRowsModelChange = React.useCallback(model => {
    setEditRowsModel(model)
  }, [])
  const fetchDatagrid = async e => {
    try {
      const response = await $http.Api({
        method: "GET",
        url: "/service-request",
      })
      if (response.data?.data) {
        console.log(tableData)
        setTableData(response.data.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchDatagrid()
  }, [])

  return (
    <EmployeeLayout>
      <div className="container pt-6">
        <div className="columns">
          <div className="column is-three-quarters">
            <p className="is-size-4 has-text-centered pb-3 pt-6 title">
              Datagrid Wahome
            </p>
            <div style={{ height: 600, width: "100%" }}>
              <StyledDataGrid
                rows={tableData}
                pageSize={pageSize}
                onPageSizeChange={newPage => setPageSize(newPage)}
                pagination
                columns={columns}
                onRowEditCommit={EditRecord}
                onEditRowsModelChange={handleEditRowsModelChange}
                editMode="row"
                editRowsModel={editRowsModel}
                sx={{
                  boxShadow: 2,
                  border: 2,
                  borderColor: "#9e9e9e",
                  "& .MuiDataGrid-cell:hover": {
                    color: "primary.main",
                  },
                }}
              />
              <Alert severity="info" style={{ marginTop: 8 }}>
                <code>editRowsModel: {JSON.stringify(editRowsModel)}</code>
              </Alert>
            </div>
          </div>
          <div className="column pt-6 mt-6">
            <MaintenanceScheduleForm />
          </div>
        </div>
      </div>
    </EmployeeLayout>
  )
}

export default EmployeePerformance