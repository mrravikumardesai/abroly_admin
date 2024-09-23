import { Button } from '@nextui-org/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const LanguagePrep = () => {

  const navigate = useNavigate()

  return (
    <div>
      <Button
      onPress={()=>{
        navigate("/lang_prep/add")
      }}
      >Add Language</Button>
    </div>
  )
}

export default LanguagePrep