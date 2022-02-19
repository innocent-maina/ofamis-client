import React, { useState, useEffect } from "react"
import { DataGrid } from "@mui/x-data-grid"
import AdminLayout from "../../layouts/AdminLayout"
import $http from "../../plugins/axios"
import CreateEmployeeForm from "../../components/forms/CreateEmployeeForm"
import StyledDataGrid from "../../assets/styles/datagrid"


const AdminSystemUsers = () => {
  const columns = [
    { field: "id", headerName: "ID" },
    { field: "firstName", headerName: "First Name", width: 200 },
    { field: "lastName", headerName: "Last Name", width: 200 },
    { field: "phoneNumber", headerName: "Phone Number", width: 200 },
    { field: "email", headerName: "Email Address", width: 200 },
    { field: "role", headerName: "Roles", width: 200 },
  ]
  const [tableData, setTableData] = useState([])
  const [pageSize, setPageSize] = React.useState(25)

  const fetchUsers = async e => {
    try {
      const response = await $http.Authentication({
        method: "GET",
        url: "/users",
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
    fetchUsers()
  }, [])

  return (
    <AdminLayout>
     <div className="pl-6 pr-6 pt-6">
        <div className="columns">
          <div className="column is-three-quarters">
            <p className="is-size-4 has-text-centered pb-3 pt-6">All System Users</p>
            <div style={{ height: 600, width: "200" }}>
              <StyledDataGrid
                rows={tableData}
                pageSize={pageSize}
                onPageSizeChange={newPage => setPageSize(newPage)}
                pagination
                columns={columns}
                // checkboxSelection
                sx={{
                  boxShadow: 2,
                  border: 2,
                  borderColor: '#9e9e9e',
                  '& .MuiDataGrid-cell:hover': {
                    color: 'primary.main',
                  },
                }}
              />
            </div>
          </div>
          <div className="column pt-6 mt-6">
            <p className="is-size-6 has-text-centered pb-2">Create a New User</p>
            <CreateEmployeeForm />
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminSystemUsers
