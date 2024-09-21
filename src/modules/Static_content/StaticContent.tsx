import CommonConfirmation from '@/components/CommonConfirmation'
import { commonGetAPICalls, commonPostAPICall } from '@/utils/ApiCallUtils'
import { Button, getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'


const StaticContent = () => {

  const navigate = useNavigate()

  const [initStaticPages, setInitStaticPages] = useState([])

  useEffect(() => {
    initStaicPageListing()
  }, [])



  const initStaicPageListing = async () => {
    const { data, success } = await commonGetAPICalls("/static/list")
    if (success && success == true) {
      setInitStaticPages(data)
    }
  }

  // delete blog
  const { isOpen: isDeleteStaticContentOpen, onOpenChange: onDeleteStaticContentOpenChange } = useDisclosure();
  const [deleteStaticContent, setDeleteStaticContentUUID] = useState<string>("");
  const deleteBlogAPIcall = async () => {
    const { success } = await commonPostAPICall({ uuid: deleteStaticContent, }, "/static/delete", true)
    if (success && success == true) {
      initStaicPageListing()
      onDeleteStaticContentOpenChange()
      setDeleteStaticContentUUID("")
    }
  }


  return (
    <div>
      <div className='flex flex-row justify-end w-full items-center my-2'>
        <Button
          onPress={() => {
            navigate(`/static/add`)
          }}
          color='primary'
        >
          Add Static Page
        </Button>
      </div>

      <Table
        aria-label="Example table with client side pagination"
      >
        <TableHeader>
          <TableColumn key="title">Title</TableColumn>
          <TableColumn key="url">Url</TableColumn>
          <TableColumn key="createdAt">Create At</TableColumn>
          <TableColumn key="action">Action</TableColumn>
        </TableHeader>
        <TableBody items={initStaticPages} emptyContent={"No rows to display."}>
          {(item: any) => (
            <TableRow key={item?.uuid} onClick={(e) => {
              e.stopPropagation()
              // navigate(`/gst_registration_details/${getKeyValue(item, "uuid")}`)
              // window.open(`/blogs/details/${getKeyValue(item, "uuid")}`, "_blank")
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
                        color='primary'
                        size='sm'
                        onPress={() => {
                          // setUpdateVisaType({
                          //     uuid:getKeyValue(item, "uuid"),
                          //     title:getKeyValue(item, "title")
                          // })
                          // onUpdateVisaTypeOpenChange()

                          navigate(`/static/edit/${getKeyValue(item, "url")}`)
                        }}
                      >
                        <MdEdit className='w-4 h-4' />
                      </Button>

                      <Button
                        isIconOnly
                        variant='flat'
                        color='danger'
                        size='sm'
                        onPress={() => {
                          setDeleteStaticContentUUID(getKeyValue(item, "uuid"))
                          onDeleteStaticContentOpenChange()
                        }}
                      >
                        <MdDelete className='w-4 h-4' />
                      </Button>
                    </div>
                  </TableCell>
                }
                else if (columnKey == "createdAt") {
                  return <TableCell>{new Date(getKeyValue(item, "createdAt")).toLocaleString()}</TableCell>
                } else {
                  return <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                }
                // }
              }

              }

            </TableRow>
          )}
        </TableBody>
      </Table>


      {/* delete static content */}
      <CommonConfirmation
        isOpen={isDeleteStaticContentOpen}
        onOpenChange={onDeleteStaticContentOpenChange}
        title={"Are you sure want to delete ?"}
        handleSubmit={() => {
          deleteBlogAPIcall()
        }}
        nagativeTitle={"No"}
        positiveTitle={"Yes"}
      />


    </div>
  )
}

export default StaticContent