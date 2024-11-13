

import CommonConfirmation from '@/components/CommonConfirmation'
import { commonPostAPICall } from '@/utils/ApiCallUtils'
import { Button, getKeyValue, Spinner, Switch, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const LanguagePrep = () => {

  const navigate = useNavigate()

  const [data, setData] = useState([])

  useEffect(() => {
    initDetailsApiCall()
  }, [])

  const [isLoading, setIsLoading] = useState(true)

  const initDetailsApiCall = async () => {
    setIsLoading(true)
    const { data, success } = await commonPostAPICall({ uuid: "" }, "/language_prep/list")
    if (success && success == true) {
      setData(data)
    }
    setIsLoading(false)
  }
  const toggleVisiblilityApiCall = async (uuid, status) => {
    const { success } = await commonPostAPICall({ uuid, status }, "/language_prep/toggle")
    if (success && success == true) {
      initDetailsApiCall()
    }
  }

  // delete
  const { isOpen: isDeleteCnfOpen, onOpenChange: onDeleteCnfOpenChange } = useDisclosure();

  const [deleteUUID, setDeleteUUID] = useState("")
  const deleteLanguageApiCall = async () => {
    const { success } = await commonPostAPICall({ uuid: deleteUUID }, "health_in/delete", true)
    if (success && success == true) {
      initDetailsApiCall()
      onDeleteCnfOpenChange()
      setDeleteUUID("")
    }
  }

  return (
    <div className='space-y-2'>


      <Table
        aria-label="Example table with client side pagination"
        topContent={
          <div className='flex flex-row justify-between items-center'>
            <h1>Languages</h1>
            <Button
              onPress={() => {
                navigate("/lang_prep/add")
              }}
            >Add Language</Button>
          </div>
        }
      >
        <TableHeader>
          <TableColumn key="title">Language Title</TableColumn>
          <TableColumn key="createdAt">Create At</TableColumn>
          <TableColumn key="action">Action</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={"No rows to display."}
          loadingContent={<Spinner />}
          isLoading={isLoading}
          items={data} >
          {(item: any) => (
            <TableRow key={item?.uuid} onClick={(e) => {
              e.stopPropagation()
              navigate(`/lang_prep/edit/${getKeyValue(item, "uuid")}`)
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
                      <Button
                        variant='flat'
                        color='primary'
                        size='sm'
                        onPress={() => {
                          navigate(`/lang_prep/chapters/${getKeyValue(item, "uuid")}`)
                        }}
                      >
                        Chapters
                      </Button>


                      <Switch isSelected={getKeyValue(item, "is_public") == 1} onValueChange={(e) => {
                        // console.log(e);
                        toggleVisiblilityApiCall(getKeyValue(item, "uuid"), e == true ? "active" : "inactive")

                      }}>
                        {getKeyValue(item, "is_public") == 1 ? "Public" : "Private"}
                      </Switch>

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
          deleteLanguageApiCall()
        }}
        nagativeTitle={"No"}
        positiveTitle={"Yes"}
      />
    </div>

  )
}

export default LanguagePrep