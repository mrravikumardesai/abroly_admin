import CommonConfirmation from '@/components/CommonConfirmation'
import { commonPostAPICall } from '@/utils/ApiCallUtils'
import { Button, getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const LanguagePrepChapterTemplate = ({ leval, uuid }) => {
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const [data, setData] = useState([])

  useEffect(() => {
    initDetailsApiCall()
  }, [])

  const initDetailsApiCall = async () => {
    const { data, success } = await commonPostAPICall({ level: leval, course_uuid: uuid }, "/language_prep/chapters/list")
    if (success && success == true) {
      setData(data)
    }
  }

  const [deleteUUID, setDeleteUUID] = useState("")

  const { isOpen: isDeleteCnfOpen, onOpenChange: onDeleteCnfOpenChange } = useDisclosure();
  const deleteFaqApiCall = async () => {
    const { success } = await commonPostAPICall({ uuid: deleteUUID }, "/language_prep/chapters/delete", true)
    if (success && success == true) {
      initDetailsApiCall()
      onDeleteCnfOpenChange()
      setDeleteUUID("")
    }
  }
  return (
    <div>


      <Table
        aria-label="Example table with client side pagination"
        topContent={
          <div className='flex flex-row justify-between items-center'>
            <h1>Chapters</h1>

            <Button
              onPress={() => {
                navigate(`/lang_prep/chapters/add/${leval}/${uuid}`)
              }}
            >Add Chapter</Button>
          </div>
        }
      >
        <TableHeader>
          <TableColumn key="chapter_name">Chapter Title</TableColumn>
          <TableColumn key="createdAt">Create At</TableColumn>
          <TableColumn key="action">Action</TableColumn>
        </TableHeader>
        <TableBody items={data} emptyContent={"No rows to display."}>
          {(item: any) => (
            <TableRow key={item?.uuid} onClick={(e) => {
              e.stopPropagation()
              // 
              // navigate(`/lang_prep/edit/${getKeyValue(item, "uuid")}`)
              navigate(`/lang_prep/sub_chapters/${getKeyValue(item, "uuid")}`)
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
                          // navigate(`/services_details/${getKeyValue(item, "service_key")}`)
                          setDeleteUUID(getKeyValue(item, "uuid"))
                          onDeleteCnfOpenChange()
                        }}
                      >
                        <MdDelete className='w-4 h-4' />
                      </Button>
                      <Button
                        variant='flat'
                        color='primary'
                        size='sm'
                        onPress={() => {
                          // navigate(`/lang_prep/chapters/${getKeyValue(item, "uuid")}`)
                          navigate(`/lang_prep/chapters/edit/${leval}/${getKeyValue(item, "course_uuid")}/${getKeyValue(item, "uuid")}`)
                        }}
                      >
                        Edit
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

export default LanguagePrepChapterTemplate