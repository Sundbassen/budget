import Table from 'react-bootstrap/Table';

type tableRow = {
  id: number, 
  date: string, 
  account: string, 
  description: string, 
  category: string, 
  subCategory: string, 
  value: number
}

function TransactionTable({data}: {data: tableRow[]}) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Date</th>
          <th>Account</th>
          <th>Description</th>
          <th>Category</th>
          <th>Sub category</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
      {data.map((row: tableRow, idx: number) => (
        <tr key={idx}>
          <td>{row.date}</td>
          <td>{row.account}</td>
          <td>{row.description}</td>
          <td>{row.category}</td>
          <td>{row.subCategory}</td>
          <td>{row.value}</td>
        </tr>
      ))}
      </tbody>
    </Table>
  );
}

export default TransactionTable;