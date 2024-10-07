import { commonGetAPICalls, commonPostAPICall } from '@/utils/ApiCallUtils'
import { Button, Input } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { MdAdd, MdDelete } from 'react-icons/md'
import ReactQuill from 'react-quill'
import { useNavigate, useParams } from 'react-router-dom'

const ContentWritingPages = () => {

    const [loading, setIsLoading] = useState(false)

    const { id } = useParams()
    const [description, setDescription] = useState([{ title: "", description: "", order_of: "0" }])
    useEffect(() => {
        initDetailsApiCall()
    }, [])

    const initDetailsApiCall = async () => {
        const { data, success } = await commonPostAPICall({ uuid: id }, "/content_writing/list_points")
        if (success && success == true) {

            setDescription(data?.sort((a: any, b: any) => a.point_order - b.point_order).map((item: any) => {
                return {
                    title: item.title,
                    description: item.description,
                    point_order: item.point_order
                }
            }))
        }
    }


    const navigate = useNavigate()

    const updateApiCall = async () => {
        const { data, success } = await commonPostAPICall({ content_writing_uuid: id, points: description }, "/content_writing/add_points",true)
        if (success && success == true) {
            initDetailsApiCall()
        }
    }


    return (
        <div>
            <section className='space-y-4'>
                <section className='flex flex-col gap-4'>
                    {description && description.length !== 0 &&
                        description.map((item: any, index: number) => (
                            <section className='flex flex-row gap-2 items-start'>
                                <section className='w-full space-y-2'>
                                    <Input
                                        label="Title"
                                        value={item.title}
                                        variant='bordered'
                                        onChange={(e) => {
                                            const old = [...description]
                                            old[index].title = e.target.value
                                            setDescription(old)
                                        }}
                                    />
                                    <ReactQuill theme="snow" value={item.description}
                                        onChange={(value) => {
                                            const old = [...description]
                                            old[index].description = value
                                            setDescription(old)
                                        }}

                                    />
                                </section>
                                <Button
                                    onPress={() => {
                                        const old = description.filter((_: any, idx: number) => index !== idx)
                                        setDescription(old)
                                    }}
                                    className='w-fit'
                                    isIconOnly
                                    variant='flat'
                                    color='danger'
                                >
                                    <MdDelete />
                                </Button>

                            </section>
                        ))
                    }
                    <Button
                        onPress={() => {
                            const old = [...description]
                            old.push({
                                title: "",
                                description: "",
                                order_of: description.length + ""
                            })
                            setDescription(old)
                        }}
                        className='w-fit'
                        isIconOnly
                        variant='flat'
                        color='primary'
                    >
                        <MdAdd />
                    </Button>
                </section>

                <Button
                    variant='shadow'
                    color='primary'
                    onPress={updateApiCall}
                    isLoading={loading}
                >Update</Button>
            </section>
        </div>
    )
}

export default ContentWritingPages