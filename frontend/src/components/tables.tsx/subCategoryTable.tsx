import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import {AsyncPost} from '../../routes/budgetQueries'
import { endpoints } from '../../routes/backendEndpoints';
import { SuccessAlert, ErrorAlert } from '../budgetAlerts';


export type subCategoryRow = {
  id: number, 
  subCategory: string,
  categoryId: number, 
  category: string, 
}
function genDelete(setShowSuccess: any, setShowError: any, setAlertMsg: any){
  function event(setShow: any, msg: string){
    setAlertMsg(msg)
    setShow(true)
    setTimeout(() => setShow(false), 5000);
  }
  function onError(error: string){
    console.log(error)
    event(setShowError, error)
  }
  function onSuccess(response: string){
    console.log(response)
    event(setShowSuccess, response)
  }
  function deleteSubCategory(id: number){
    AsyncPost({id: id}, endpoints.deleteSubCategory, onSuccess, onError) // TODO alert
  }
  return deleteSubCategory
}


function SubCategoryTable({subCategories}: {subCategories: subCategoryRow[]}) {
  const [alertMsg, setAlertMsg] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const deleteSubCategory = genDelete(setShowSuccess, setShowError, setAlertMsg)
  return (
    <>
    <SuccessAlert msg={alertMsg} show={showSuccess} onClose={() => setShowSuccess(false)}/>
    <ErrorAlert msg={alertMsg} show={showError} onClose={() => setShowError(false)}/>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Category</th>
          <th>Sub category</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
      {subCategories.map((row: subCategoryRow, idx: number) => (
        <tr key={idx}>
          <td>{row.category}</td>
          <td>{row.subCategory}</td>
          <td style={{cursor: 'pointer'}} onClick={() => deleteSubCategory(row.id)}>X</td>
        </tr>
      ))}
      </tbody>
    </Table>
    </>
  );
}

export default SubCategoryTable;