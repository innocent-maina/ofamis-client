import React, { useState, useEffect } from "react"
import { DataGrid } from "@mui/x-data-grid"
import $http from "../../plugins/axios"
import StyledDataGrid from "../../assets/styles/datagrid"
import Rating from "@mui/material/Rating"


{/* <Rating name="read-only" value={value} readOnly /> */}


const PerformanceDatagrid = () => {
  const columns = [
    { field: "product_name", headerName: "Product Name", width: 200 },
    { field: "product_id", headerName: "Product ID", width: 150 },
    { field: "description", headerName: "Review Description", width: 200 },
    { field: "user_id", headerName: "User ID", width: 150 },
    {
      field: "rate",
      headerName: "Rate",
      width: 150,
      sortable: true,
      editable: true,
      type: "boolean",
      disableClickEventBubbling: true,
      renderCell: params => {
        let decidedIcon
        if (params.row.rate === 1) {
          decidedIcon = (
            <div>
              <Rating name="read-only" value={1} readOnly />
            </div>
          )
        } else if (params.row.rate === 2) {
          decidedIcon = (
            <div>
              <Rating name="read-only" value={2} readOnly />
            </div>
          )
        }  else if (params.row.rate === 3) {
          decidedIcon = (
            <div>
              <Rating name="read-only" value={3} readOnly />
            </div>
          )
        }  else if (params.row.rate === 4) {
          decidedIcon = (
            <div>
              <Rating name="read-only" value={4} readOnly />
            </div>
          )
        }  else if (params.row.rate === 5) {
          decidedIcon = (
            <div>
              <Rating name="read-only" value={5} readOnly />
            </div>
          )
        } else {
          decidedIcon = (
            <Rating name="no-value" value={null} />
          )
        }
        return <div>{decidedIcon}</div>
      },
    },
    { field: "updated_at", headerName: "Review Date", width: 220 },
  ]
  const [tableData, setTableData] = useState([])
  const [pageSize, setPageSize] = React.useState(25)

  const fetchUsers = async e => {
    try {
      const response = await $http.Api({
        method: "GET",
        url: "/feedback",
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
    <div className="pl-5 pr-5 pt-4">
      <p className="is-size-4 has-text-centered pb-3 mt-6 pt-6 title">
        Performance of Delivered Products (Users' Feedback)
      </p>
      <div style={{ height: 600, width: "80%" }}>
        <StyledDataGrid
          rows={tableData}
          pageSize={pageSize}
          onPageSizeChange={newPage => setPageSize(newPage)}
          pagination
          columns={columns}
          sx={{
            boxShadow: 2,
            border: 2,
            borderColor: "#9e9e9e",
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
          }}
        />
      </div>
    </div>
  )
}

export default PerformanceDatagrid
