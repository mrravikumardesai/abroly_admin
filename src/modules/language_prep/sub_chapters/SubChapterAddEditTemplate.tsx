import { commonPostAPICall } from '@/utils/ApiCallUtils'
import { ErrorToast, SuccessToast } from '@/utils/Toaster'
import { getAuthToken } from '@/utils/localstorage'
import { Button, Card, CardBody, Input } from '@nextui-org/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import ReactQuill from 'react-quill'
import { useNavigate } from 'react-router-dom'

const SubChapterAddEditTemplate = ({ isNew, uuid, chapter_uuid }) => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [url, setUrl] = useState("")
    const [files, setFiles] = useState()
    const [existFile, setExistFile] = useState()

    const navigate = useNavigate()

    const [details, setDetails] = useState([])

    useEffect(() => {
        if (isNew == false) {
            initDetailsApiCall()
        }
    }, [])

    const initDetailsApiCall = async () => {
        const { data, success } = await commonPostAPICall({ uuid: uuid }, "/language_prep/sub_chapters/get")
        if (success && success == true) {
            // setDetails(data)
            setTitle(data?.title)
            setDescription(data?.short_description)
            setUrl(data?.video_url)
            setExistFile(data?.access_banner)
        }
    }

    const BaseUrl = import.meta.env.VITE_API_BASE_URL

    const addSubChapter = async () => {

        const formData = new FormData()
        formData.append("file", files)
        formData.append("title", title)
        formData.append("short_description", description)
        formData.append("video_url", url)
        formData.append("chapter_uuid", chapter_uuid)

        const response = await axios.post(`${BaseUrl}/v1/language_prep/sub_chapters/add`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${getAuthToken()}`
            },
        })
        if (response.status == 200 && response.data.success == true) {
            SuccessToast("Language Added")
            navigate(-1)
        } else {
            ErrorToast(response.data.message)
        }

    }
    const updateSubChapter = async () => {

        const formData = new FormData()
        if (files) {
            formData.append("file", files)
        }
        formData.append("title", title)
        formData.append("short_description", description)
        formData.append("video_url", url)
        formData.append("uuid", uuid)

        const response = await axios.post(`${BaseUrl}/v1/language_prep/sub_chapters/update`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${getAuthToken()}`
            },
        })
        // .then(() => {
        //     SuccessToast("Language Updated")
        //     // initDetailsApiCall()
        //     navigate(-1)
        // }).catch((e) => {
        //     ErrorToast(e.message)
        // })
        if (response.status == 200 && response.data.success == true) {
            SuccessToast("Language Updated")
            navigate(-1)
        } else {
            ErrorToast(response.data.message)
        }
    }
    return (
        <div className='container my-6 mx-auto space-y-4'>
            <p className='text-xl font-bold'>{isNew == true ? "Add Sub Chapter" : "Edit Sub Chapter"} </p>

            <p className='text-md font-bold'>Basic Information</p>
            <section className='space-y-3'>
                <Input
                    label="Title"
                    value={title}
                    variant='bordered'
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                />
                <Input
                    label="Video URL"
                    value={url}
                    variant='bordered'
                    onChange={(e) => {
                        setUrl(e.target.value)
                    }}
                />
                <ReactQuill theme="snow" value={description}
                    onChange={(value) => {
                        setDescription(value)
                    }}
                    className=' w-full'

                />


            </section>

            <p className='text-md font-bold'>Attechment</p>

            <input
                type='file'
                multiple={true}
                onChange={(e: any) => {
                    setFiles(e.target.files[0])
                }}
            />

            <section className='flex flex-row gap-2 flex-wrap'>
                {
                    files &&
                    <Card>
                        <CardBody className='flex flex-row items-center justify-center gap-2'>
                            <p>File Selected - {files?.["name"]}</p>
                            <Button
                                isIconOnly
                                variant='flat'
                                color='danger'
                                onPress={() => {
                                    setFiles(null)
                                }}
                            ><MdDelete /></Button>
                        </CardBody>
                    </Card>
                }
            </section>
            <section className='flex flex-row gap-2 flex-wrap'>
                {
                    existFile &&
                    <section className='relative'>
                        <img className='w-[33vw]' src={existFile} />
                    </section>
                }
            </section>

            <Button
                variant='shadow'
                color='primary'
                onPress={isNew ? addSubChapter : updateSubChapter}
            >{isNew == true ? "Add Sub Chapter" : "Update Sub Chapter"} </Button>

        </div>
    )
}

export default SubChapterAddEditTemplate