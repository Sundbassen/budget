import React from 'react'
import TransactionTable from '../../components/tables.tsx/transactionTable'
import {Post} from '../../routes/budgetQueries'
import { endpoints } from '../../routes/backendEndpoints'
//import CreateCategory from '../../components/createCategory'
import CategoryContainer from './categoryContainer'
export default function Categories() {
  const tableData = Post({}, endpoints.transactions, true)
  const categories = Post({}, endpoints.categories, true)
  const subCategories = Post({}, endpoints.subCategories, true)
  return (
    <>
      {(tableData.status === 'loading' || categories.status === 'loading' || subCategories.status === 'loading') && <></>}
      {(tableData.status === 'error' || categories.status === 'error' || subCategories.status === 'error') && <div> An unknown error occured ... </div>}
      {(tableData.status === 'success' && categories.status === 'success' && subCategories.status === 'success') &&
        <>
          <br/>
          <CategoryContainer categories={categories.data} subCategories={subCategories.data} />
          <br/>

          <TransactionTable data={tableData.data}/>
        </>
      }
      
    </>
  )
}
