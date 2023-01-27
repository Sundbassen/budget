import Dropdown from 'react-bootstrap/Dropdown';
import Colors from '../styles/colors'
type Props = {
    struct: any[], 
    structKey: string, 
    val: any, 
    setVal: any
} 

export default function BudgetDropdown({struct, structKey, val, setVal}: Props) {

  return (
    <Dropdown >
        <Dropdown.Toggle style={{background: Colors.lavender(), border: '0px'}} variant="secondary">
            {val=== null ? 
            "Choose category": 
            val[structKey]}
        </Dropdown.Toggle>

        <Dropdown.Menu variant="light">
            {struct.map((row: any) => (
            <Dropdown.Item key={row.id} onClick={() => setVal(row)}>
                {row[structKey]}
            </Dropdown.Item>
            
            ))}
        </Dropdown.Menu> 
    </Dropdown> )
}
