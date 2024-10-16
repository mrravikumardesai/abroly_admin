import CommonConfirmation from '@/components/CommonConfirmation'
import { commonPostAPICall } from '@/utils/ApiCallUtils'
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue, useDisclosure } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'

const SubChaptersList = () => {

    // here we can get chapter id 
    const { id } = useParams()

    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    const [data, setData] = useState([])

    const [deleteUUID, setDeleteUUID] = useState("")

    const { isOpen: isDeleteCnfOpen, onOpenChange: onDeleteCnfOpenChange } = useDisclosure();
    const deleteFaqApiCall = async () => {
        const { success } = await commonPostAPICall({ uuid: deleteUUID }, "/language_prep/sub_chapters/delete", true)
        if (success && success == true) {
            initDetailsApiCall()
            onDeleteCnfOpenChange()
            setDeleteUUID("")
        }
    }

    useEffect(() => {
        initDetailsApiCall()
    }, [])

    const initDetailsApiCall = async () => {
        const { data, success } = await commonPostAPICall({ uuid: id }, "/language_prep/sub_chapters/list")
        if (success && success == true) {
            // setData(data)
            setData(data?.sort((a,b)=> a.order_number - b.order_number ))
        }
    }
    return (
        <div>

            <Table
                aria-label="Example table with client side pagination"
                topContent={
                    <div className='flex flex-row justify-between items-center'>
                        <h1>Sub Chapters</h1>

                        <Button
                            onPress={() => {
                                //   navigate(`/lang_prep/chapters/add/${leval}/${uuid}`)
                                navigate(`/lang_prep/add_sub_chapters/${id}`)
                            }}
                        >Add Sub Chapter</Button>
                    </div>
                }
            >
                <TableHeader>
                    <TableColumn key="order_number">Order</TableColumn>
                    <TableColumn key="title">Chapter Title</TableColumn>
                    <TableColumn key="createdAt">Create At</TableColumn>
                    <TableColumn key="action">Action</TableColumn>
                </TableHeader>
                <TableBody items={data} emptyContent={"No rows to display."}>
                    {(item: any) => (
                        <TableRow key={item?.uuid} onClick={(e) => {
                            e.stopPropagation()
                            // 
                            // navigate(`/lang_prep/edit/${getKeyValue(item, "uuid")}`)
                            navigate(`/lang_prep/edit_sub_chapters/${getKeyValue(item, "uuid")}`)
                        }}
                            className='cursor-pointer'
                        >
                            {(columnKey) => {

                                if (columnKey == "action") {
                                    return <TableCell>
                                        <div className='flex flex-row gap-2 items-center justify-start'>

                                            <Button
                                                isIconOnly
                                                variant='flat'
                                                color='danger'
                                                size='sm'
                                                onPress={() => {
                                                    setDeleteUUID(getKeyValue(item, "uuid"))
                                                    onDeleteCnfOpenChange()
                                                }}
                                            >
                                                <MdDelete className='w-4 h-4' />
                                            </Button>

                                        </div>
                                    </TableCell>
                                } else if (columnKey == "createdAt") {
                                    return <TableCell>{new Date(getKeyValue(item, "createdAt")).toLocaleString()}</TableCell>
                                } else {
                                    return <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                                }
                            }
                            }
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <CommonConfirmation
                isOpen={isDeleteCnfOpen}
                onOpenChange={onDeleteCnfOpenChange}
                title={"Are you sure want to delete ?"}
                handleSubmit={() => {
                    deleteFaqApiCall()
                }}
                nagativeTitle={"No"}
                positiveTitle={"Yes"}
            />

        </div>
    )
}

export default SubChaptersList