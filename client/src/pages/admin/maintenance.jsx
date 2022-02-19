import React, { useState, useEffect } from "react"
import StyledDataGrid from "../../assets/styles/datagrid"
import AdminLayout from "../../layouts/AdminLayout"
import $http from "../../plugins/axios"
// import CreateEmployeeForm from "../../components/forms/CreateEmployeeForm"

const AdminMaintenance = () => {
  const columns = [
    // { field: "id", headerName: "ID" },
    { field: "category", headerName: "Service Category", width: 200 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "date", headerName: "Service Date", width: 200 },
    { field: "user_id", headerName: "Assigned To userId", width: 200 },

    {
      field: "completed",
      headerName: "Completion Status",
      width: 200,
      sortable: true,
      editable: true,
      type: "boolean",
    },
  ]
  const [tableData, setTableData] = useState([])
  const [pageSize, setPageSize] = React.useState(25)

  const fetchUsers = async e => {
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
    fetchUsers()
  }, [])

  return (
    <AdminLayout>
      <div className="container pt-6">
        <p className="is-size-4 has-text-centered pb-3 pt-6">Maintenance </p>
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
    </AdminLayout>
  )
}

export default AdminMaintenance
