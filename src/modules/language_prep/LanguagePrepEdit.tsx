import React from 'react'
import LanguagePrepCommon from './LanguagePrepCommon'
import { useParams } from 'react-router-dom'

const LanguagePrepEdit = () => {

    const {id} = useParams()
  return (
    <LanguagePrepCommon isNew={false} uuid={id}/>
  )
}

export default LanguagePrepEdit