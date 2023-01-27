import Table from 'react-bootstrap/Table';
import {AsyncPost} from '../../routes/budgetQueries'
import { endpoints } from '../../routes/backendEndpoints';
export type categoryRow = {
  id: number, 
  category: string, 
}
function deleteCategory(id: number){
  AsyncPost({id: id}, endpoints.deleteCategory, ()=> {}) // TODO alert
}
function CategoryTable({categories}: {categories: categoryRow[]}) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Category</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
      {categories.map((row: categoryRow, idx: number) => (
        <tr key={idx}>
          <td>{row.category}</td>
          <td style={{cursor: 'pointer'}} onClick={() => deleteCategory(row.id)}>X</td>
        </tr>
      ))}
      </tbody>
    </Table>
  );
}

export default CategoryTable;