import React from 'react'
type Props = {
    header: string,
    existing: string[], 

}
export default function CreateCategory({header, existing}: Props) {
  return (
    <div>
        <h5>
            {header} 
        </h5>
  </div>
  )
}
