import {useState} from 'react'
import Accordion from 'react-bootstrap/Accordion';
import CategoryTable, { categoryRow } from '../../components/tables.tsx/categoryTable';
import SubCategoryTable, {subCategoryRow} from '../../components/tables.tsx/subCategoryTable';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import {AsyncPost} from '../../routes/budgetQueries'
import { endpoints } from '../../routes/backendEndpoints';
import {ErrorAlert, SuccessAlert} from '../../components/budgetAlerts';
import BudgetDropdown from '../../components/budgetDropdown';
import Colors from '../../styles/colors';

function genCategoryOnSubmit(setShowSuccess: any, setShowError: any, setAlertMsg: any){
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
  function categoryOnSubmit(val: string){
    console.log('Submitting: ', {category: val})
    AsyncPost({category: val}, endpoints.addCategory, onSuccess, onError)
  }
  return categoryOnSubmit

}

type subCategory = {
  categoryId: number, 
  subCategory: string
}

function genSubCategoryOnSubmit(setShowSuccess: any, setShowError: any, setAlertMsg: any){
  
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
  function subCategoryOnSubmit(val: string, catId: number, setTransactions: boolean){
    AsyncPost({subCategory: val, categoryId: catId, setTransactions: setTransactions}, endpoints.addSubCategory, onSuccess, onError)
  }
  return subCategoryOnSubmit
}

function genSubCategoryOnAdd(setShow: any){
  
  function subCategoryOnSubmit(val: string){
    setShow(true)
  }
  return subCategoryOnSubmit
}

function AddCategory({placeholder, onSubmit, val, setVal}: {placeholder: string, onSubmit: any, val: string, setVal: any}){
  const _handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      onSubmit(val)
    }
  }
  return (
  <InputGroup className="mb-3">
      <Form.Control
        placeholder={placeholder}
        aria-label={placeholder}
        onKeyDown={_handleKeyDown}
        aria-describedby="basic-addon2"
        onChange={(event) => setVal(event.target.value)}
      />
      <Button onClick={() => {onSubmit(val)}} variant="outline-secondary" id="button-addon2">
        Submit
      </Button>
    </InputGroup>
  )
}

function SubCatModal({val, categories, show, onClose, subCatOnSubmit}: {val: string, categories: categoryRow[], show: boolean, onClose: any, subCatOnSubmit: any}){
  function closeModal(){
    setCategory(null)
    setChecked(true)
    onClose()
  }
  function submit(){
    subCatOnSubmit(val, category?.id, checked)
    closeModal()
  }
  const [category, setCategory] = useState<categoryRow | null> (null)
  const [checked, setChecked] = useState<boolean> (true)
  return (
    <>
      <Modal show={show} onHide={closeModal} >
        <Modal.Header closeButton style={{background: Colors.lightPink(0.2)}}>
          <Modal.Title>Add sub category {val}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{background: Colors.lightPink(0.2)}}>  
            <BudgetDropdown struct={categories} val={category} setVal={setCategory} structKey={'category'}/> 
            <br/>
              <div key={'default-checkbox'} className="mb-3">
                <Form.Check 
                  checked={checked}
                  onClick={()=> setChecked(!checked)}
                  type={'checkbox'}
                  label={`Set transactions containing "${val}"`}
                />
              </div>
        </Modal.Body>
        <Modal.Footer style={{background: Colors.lightPink(0.2)}}>
          <Button style={{background: Colors.violet(), border: '0px'}} variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" style={{background: Colors.lavender(), border: '0px'}} onClick={submit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}




export default function CategoryContainer({categories, subCategories}: {categories : categoryRow[], subCategories: subCategoryRow[]}) {
  
  const [showSubCatModal, setShowSubCatModal] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [catVal, setCatVal] = useState('')
  const [subCatVal, setSubCatVal] = useState('')
  const [alertMsg, setAlertMsg] = useState('')

  return (
    <>
      <SuccessAlert msg={alertMsg} show={showSuccess} onClose={() => setShowSuccess(false)}/>
      <ErrorAlert msg={alertMsg} show={showError} onClose={() => setShowError(false)}/>
      <SubCatModal 
        val={subCatVal} 
        categories={categories} 
        show={showSubCatModal} 
        onClose={() => setShowSubCatModal(false)} 
        subCatOnSubmit={genSubCategoryOnSubmit(setShowSuccess, setShowError, setAlertMsg)}
        />
      <Accordion alwaysOpen={true}>
          <Accordion.Item eventKey="1">
              <Accordion.Header>{'Categories'}</Accordion.Header>
              <Accordion.Body>
              <Container>
                  <Row>
                      <Col>
                        <AddCategory placeholder='Add category' val={catVal} setVal={setCatVal} onSubmit={genCategoryOnSubmit(setShowSuccess, setShowError, setAlertMsg)}/>
                        <CategoryTable categories={categories} />
                        
                      </Col>
                      <Col>
                        <AddCategory placeholder='Add sub category' val={subCatVal} setVal={setSubCatVal} onSubmit={genSubCategoryOnAdd(setShowSubCatModal)}/>
                        <SubCategoryTable subCategories={subCategories} />
                      </Col>
                  </Row>
              </Container>
              </Accordion.Body>
          </Accordion.Item>
      </Accordion>
    </>
  )
}
