import { QuillFormats, QuillModules } from '@/components/ReactQuillNavOptions'
import { commonPostAPICall } from '@/utils/ApiCallUtils'
import { SuccessToast } from '@/utils/Toaster'
import { Button, Input } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import { useNavigate } from 'react-router-dom'

const ChapterAddEditTemplate = ({ isNew, uuid = "", level = "1", course_uuid = "" }) => {


  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [order_number, setOrderNumber] = useState("0")
  const navigate = useNavigate()

  useEffect(() => {

    if (isNew == false) {
      initDetailsApiCall()
    }

  }, [])

  const initDetailsApiCall = async () => {
    const { data, success } = await commonPostAPICall({ uuid: uuid }, "/language_prep/chapters/get")
    if (success && success == true) {
      setTitle(data?.chapter_name)
      setDescription(data?.description)
      setOrderNumber(data?.order_number)
    }
  }
  const addLanguage = async () => {
    const { data, success } = await commonPostAPICall({
      chapter_name: title,
      description: description,
      course_uuid,
      level
    }, "/language_prep/chapters/add", true)
    if (success && success == true) {
      SuccessToast("Added")
      navigate(-1)
    }
  }
  const updateLanguage = async () => {
    const { data, success } = await commonPostAPICall({
      chapter_name: title,
      description: description,
      uuid,
      order_number
    }, "/language_prep/chapters/update", true)
    if (success && success == true) {
      SuccessToast("Updated")
      navigate(-1)
    }
  }
  return (
    <div>

      {/* {leval} */}
      {/* {uuid} */}
      {/* {course_uuid} */}
      <div className='container my-6 mx-auto space-y-4'>
        <p className='text-xl font-bold'>{isNew == true ? "Add New Chapter" : "Edit Chapter"} </p>



        <p className='text-md font-bold'>Basic Information</p>
        <section className='space-y-3'>

          {isNew == false && <Input
            label="Order"
            inputMode='numeric'
            value={order_number}
            variant='bordered'
            onChange={(e) => {
              setOrderNumber(e.target.value)
            }}
          />}
          <Input
            label="Title"
            value={title}
            variant='bordered'
            onChange={(e) => {
              setTitle(e.target.value)
            }}
          />
          <ReactQuill
            modules={QuillModules}
            formats={QuillFormats}
            theme="snow" value={description}
            onChange={(value) => {
              setDescription(value)
            }}
            className=' w-full'

          />


        </section>

        <Button
          variant='shadow'
          color='primary'
          onPress={isNew ? addLanguage : updateLanguage}
        >{isNew == true ? "Add Chapter" : "Update Chapter"} </Button>

      </div>



    </div>
  )
}

export default ChapterAddEditTemplate