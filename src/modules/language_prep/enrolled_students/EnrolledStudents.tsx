import { commonGetAPICalls, commonPostAPICall } from '@/utils/ApiCallUtils';
import { Avatar, getKeyValue, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const EnrolledStudents = () => {

  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)


  const [enrolledStudentsList, setEnrolledStudentsList] = useState([]);

  useEffect(() => {
    findEnrolledStudentsList();
  }, [id]);

  const findEnrolledStudentsList = async () => {
    setIsLoading(true)
    const { data, success } = await commonPostAPICall({ uuid: id }, `/language_prep/admin/enrolled_students`)
    if (success && success == true) {
      setEnrolledStudentsList(data)
    }
    setIsLoading(false)
  };
  return (
    <div>
      {/* {JSON.stringify(enrolledStudentsList)} */}
      <Table
        aria-label="Example table with client side pagination"
        topContent={
          <div className='flex flex-row justify-between items-center'>
            <h1>Enrolled Students</h1>
          </div>
        }
      >
        <TableHeader>
          <TableColumn key="access_profile">Profile</TableColumn>
          <TableColumn key="username">Name</TableColumn>
          <TableColumn key="phone">Phone</TableColumn>
          <TableColumn key="level">Level</TableColumn>
          <TableColumn key="completed_at">Completed At</TableColumn>
          <TableColumn key="quiz_score">Quiz Score</TableColumn>
          <TableColumn key="createdAt">Purchase On</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={"No rows to display."}
          loadingContent={<Spinner />}
          isLoading={isLoading}
          items={enrolledStudentsList?.map(item => { return { ...item, ...item?.student } })} >
          {(item: any) => (
            <TableRow key={item?.uuid}
              className='cursor-pointer'
              onClick={(e) => {
                e.stopPropagation()
                window.open(`/student/${getKeyValue(item, "uuid")}`, "_blank")
            }}
            >
              {(columnKey) => {
                if (columnKey == "createdAt") {
                  return <TableCell>{new Date(getKeyValue(item, "createdAt")).toLocaleString()}</TableCell>
                } else if (columnKey == "access_profile") {
                  return <TableCell>
                    <Avatar
                      size='sm'
                      src={getKeyValue(item, "access_profile")}
                      alt={getKeyValue(item, "username")}
                    />
                  </TableCell>
                } else if (columnKey == "completed_at") {
                  return <TableCell>{getKeyValue(item, "is_quiz_submited") == 1 ? new Date(getKeyValue(item, "createdAt")).toLocaleString() : "Not Completed Yet"}</TableCell>
                } else {
                  return <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                }
              }
              }
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default EnrolledStudents