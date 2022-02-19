import React from "react"
import EmployeeLayout from "../../layouts/EmployeeLayout"
import InventoryDatagrid from "../../components/shared/InventoryDatagrid"
import ProductForm from "../../components/forms/ProductForm"

const AdminInventory = () => {
  return (
    <EmployeeLayout>
      <div className="pl-6 pr-6 pt-6">
        <div className="columns">
          <div className="column is-three-quarters">
            <p className="is-size-4 has-text-centered pb-3 pt-6 title">
              All Products Are Listed Here
            </p>
            <InventoryDatagrid />
          </div>
          <div className="column pt-6 mt-6">
            <ProductForm />
          </div>
        </div>
      </div>
    </EmployeeLayout>
  )
}

export default AdminInventory
