import Alert from 'react-bootstrap/Alert';

type Props = {
    msg: string, 
    show: boolean, 
    onClose: any
}

type AlertProps = {
    msg: string, 
    show: boolean, 
    onClose: any, 
    variant: string
}

export function SuccessAlert({msg, show, onClose}: Props) {
    return (
        <BudgetAlert msg={msg} show={show} onClose={onClose} variant={'primary'} / >

      
  );
}

export function ErrorAlert({msg, show, onClose}: Props) {
    return (
        
      <BudgetAlert msg={msg} show={show} onClose={onClose} variant={'warning'} / >
        
    );
}


function BudgetAlert({msg, show, onClose, variant}: AlertProps){
    return (
        
      <Alert dismissible={true} style={{position: 'absolute', top: '80px', width: '67.92%', zIndex: '9000'}} key={variant} variant={variant} show={show} onClose={onClose}>
          {msg}!
      </Alert>
        
    );
}