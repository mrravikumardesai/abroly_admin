import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Pagination, Switch, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Textarea, getKeyValue, useDisclosure } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { FaUserCheck } from 'react-icons/fa';
import { PiUserListFill } from 'react-icons/pi';
import { MdDeleteOutline, MdDescription, MdOutlineEditNote } from 'react-icons/md';
import { commonGetAPICalls, commonPostAPICall } from '../../utils/ApiCallUtils';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CommonConfirmation from '../../components/CommonConfirmation';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { getAuthToken } from '@/utils/localstorage';
import { ErrorToast } from '@/utils/Toaster';

// validations 
const adminAddTestimonialValidation = Yup.object().shape({
  user_name: Yup.string().required("Please Enter User Name").min(4, "minimum length should be 4"),
  description: Yup.string().required("Please Enter Testimonial description").min(4, "minimum length should be 4"),
})

const BaseUrl = import.meta.env.VITE_API_BASE_URL

const Testimonials = () => {

  const [isLoading, setIsLoading] = useState(false)

  const [isLoadData, setIsLoadData] = useState(false)

  // to add
  const { isOpen, onOpenChange } = useDisclosure();
  const [testimonialAddFile, setTestimonialAddFile] = useState(null)
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");

  // to get 
  useEffect(() => {
    initAPI()
  }, [])

  const [testimonailData, settestimonailData] = useState([])


  const initAPI = async () => {
    setIsLoadData(true)

    const { data, success } = await commonGetAPICalls("/testimonials/list")
    if (success && success == true) {
      settestimonailData(data)
    }
    setIsLoadData(false)

  }



  // delete loading 
  const [isLoadingDelete, setIsLoadingDelete] = useState({
    uuid: "",
    isLoading: false
  })

  // delete 
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onOpenChange: onDeleteOpenChange } = useDisclosure();

  // delete api call
  const deleteApiCall = async (uuid: string) => {
    setIsLoadingDelete({
      isLoading: true,
      uuid: uuid
    })
    const { data, success } = await commonPostAPICall({ uuid }, "/testimonials/delete", true)
    if (success && success == true) {
      initAPI()
    }
    setIsLoadingDelete({
      isLoading: false,
      uuid: uuid
    })
    onDeleteOpenChange()
  }

  // toggle api 
  const [isLoadingToggle, setIsLoadingToggle] = useState({
    uuid: "",
    isLoading: false
  })

  const toggleApiCall = async (uuid: string, is_visible: any) => {
    setIsLoadingToggle({
      isLoading: true,
      uuid: uuid
    })
    const { data, success } = await commonPostAPICall({ uuid, is_visible }, "/testimonials/toggle", true)
    if (success && success == true) {
      initAPI()
    }
    setIsLoadingToggle({
      isLoading: false,
      uuid: uuid
    })
  }

  // update params 
  const { isOpen: isUpdateOpen, onOpenChange: onUpdateOpenChange } = useDisclosure();

  const [updateTestimonial, setUpdateTestimonial] = useState({
    uuid: "",
    name: "",
    description: "",
  })

  const [isUpdateLoading, setIsUpdateLoading] = useState(false)
  const updateAPICall = async ({ user_name,
    user_position,
    description }: any) => {
    setIsUpdateLoading(true)
    const { data, success } = await commonPostAPICall({
      name: user_name,
      description,
      uuid: updateTestimonial.uuid
    }, "/testimonials/update", true)
    if (success && success == true) {
      initAPI()
      setUpdateTestimonial({
        uuid: "",
        name: "",
        description: "",
      })
      onUpdateOpenChange()
    }
    setIsUpdateLoading(false)
  }

  return (
    <div className='w-full h-full flex flex-col gap-2'>

      <Table
        aria-label="Example table with client side pagination"
        topContent={
          <div className='flex sm:flex-row items-center justify-between flex-col flex-wrap gap-2'>
            <h1 className=''>You can manage customer reviews and feedback to showcase positive experiences and build credibility.</h1>
            <Button color='primary' className='self-end' onPress={onOpenChange}>
              Add Testimonials
            </Button>
          </div>
        }
      >
        <TableHeader>
          <TableColumn key="name">Name</TableColumn>
          <TableColumn key="description">Description</TableColumn>
          <TableColumn key="createdAt">Create At</TableColumn>
          <TableColumn key="action">Action</TableColumn>
        </TableHeader>
        <TableBody items={testimonailData} >
          {(item: any) => (
            <TableRow key={item?.key}>

              {(columnKey) => {
                console.log(columnKey);

                if (columnKey == "action") {
                  return <TableCell>
                    <div className='flex flex-row gap-2 items-center justify-start'>

                      <Button
                        isIconOnly
                        variant='flat'
                        color='secondary'
                        size='sm'
                        onPress={() => {
                          setUpdateTestimonial({
                            description: getKeyValue(item, "description"),
                            name: getKeyValue(item, "name"),
                            uuid: getKeyValue(item, "uuid")
                          })
                          onUpdateOpenChange()
                        }}

                      >
                        <MdOutlineEditNote className='w-4 h-4' />
                      </Button>
                      <Button
                        isIconOnly
                        variant='flat'
                        color='danger'
                        size='sm'
                        onPress={() => {
                          // toggleApiCall(getKeyValue(item, "uuid"))
                          setIsLoadingDelete({
                            isLoading: false,
                            uuid: getKeyValue(item, "uuid")
                          })
                          onDeleteOpenChange()
                        }}
                      >
                        <MdDeleteOutline className='w-4 h-4' />
                      </Button>
                    </div>
                  </TableCell>
                } else if (columnKey == "createdAt") {
                  return <TableCell>{new Date(getKeyValue(item, columnKey)).toLocaleString()}</TableCell>
                }
                else {
                  return <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                }
              }

              }

            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* add testimonials */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        backdrop='blur'
        size='3xl'
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Testimonials
              </ModalHeader>
              <ModalBody>

                <Formik
                  initialValues={{
                    user_name: "",
                    description: "",
                  }}
                  onSubmit={async (values, { setSubmitting }) => {

                    const formData = new FormData()

                    if (testimonialAddFile) {
                      formData.append("file", testimonialAddFile)
                    }

                    formData.append("name", values.user_name)
                    formData.append("description", values.description)

                    await axios.post(`${BaseUrl}/v1/testimonials/add`, formData, {
                      headers: {
                        Authorization: `Bearer ${getAuthToken()}`,
                        'Content-Type': 'multipart/form-data',
                      }
                    })
                      .then((response: AxiosResponse) => {
                        if (response?.status == 200 && response?.data?.success == false) {
                          ErrorToast(response?.data?.message)
                        }

                        if (response?.status === 200 && response?.data?.success == true) {
                          setIsLoading(false)
                          onOpenChange()
                          initAPI()
                          setTestimonialAddFile(null)
                        }

                      }).catch((e: AxiosError) => {
                        ErrorToast(e.message)
                        console.log(e.message);
                      })
                  }}
                  validationSchema={adminAddTestimonialValidation}
                >
                  {({
                    values,
                    errors,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    touched
                    // isSubmitting,
                    /* and other goodies */
                  }) => (
                    <form
                      className='space-y-2 flex flex-col items-start justify-center'
                      onSubmit={(e) => {
                        e.preventDefault()
                        handleSubmit()
                      }} >
                      <Input

                        endContent={
                          <FaUserCheck className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }

                        name="user_name"
                        value={values.user_name}
                        onBlur={handleBlur}
                        onChange={handleChange("user_name")}
                        label="User Name"
                        placeholder="Enter User Name"
                        variant="flat"
                        isInvalid={(errors?.user_name && touched?.user_name ? true : false)}
                        errorMessage={errors.user_name}
                      />
                      <Textarea
                        endContent={
                          <MdDescription className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        name="description"
                        value={values.description}
                        onBlur={handleBlur}
                        onChange={handleChange("description")}
                        label="Testimonial Description"
                        placeholder="Enter description for testimonail"
                        variant="flat"
                        minRows={5}
                        isInvalid={(errors?.description && touched?.description ? true : false)}
                        errorMessage={errors.description}
                      />
                      <input
                        type='file'
                        onChange={(e) => {
                          setTestimonialAddFile(e.target.files[0])
                        }}
                      />
                      {
                        testimonialAddFile &&
                        <video
                          src={URL.createObjectURL(testimonialAddFile)}
                          className='aspect-video'
                          controls
                        />
                      }

                      <Button
                        isLoading={isLoading}
                        type="submit"
                        className='self-center'
                        color="primary" onPress={() => {
                          // sending otp method
                        }}>
                        Submit
                      </Button>

                    </form>)}
                </Formik>


              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* update testimonials */}

      <Modal
        isOpen={isUpdateOpen}
        onOpenChange={onUpdateOpenChange}
        scrollBehavior="inside"
        backdrop='blur'
        size='3xl'
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Update Testimonials
              </ModalHeader>
              <ModalBody>

                <Formik
                  initialValues={{
                    user_name: updateTestimonial.name,
                    description: updateTestimonial.description,
                  }}
                  onSubmit={async (values, { setSubmitting }) => {
                    updateAPICall({
                      user_name: values.user_name,
                      description: values.description
                    })
                  }}
                  validationSchema={adminAddTestimonialValidation}
                >
                  {({
                    values,
                    errors,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    touched
                    // isSubmitting,
                    /* and other goodies */
                  }) => (
                    <form
                      className='space-y-2 flex flex-col items-start justify-center'
                      onSubmit={(e) => {
                        e.preventDefault()
                        handleSubmit()
                      }} >
                      <Input

                        endContent={
                          <FaUserCheck className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }

                        name="user_name"
                        value={values.user_name}
                        onBlur={handleBlur}
                        onChange={handleChange("user_name")}
                        label="User Name"
                        placeholder="Enter User Name"
                        variant="flat"
                        isInvalid={(errors?.user_name && touched?.user_name ? true : false)}
                        errorMessage={errors.user_name}
                      />
                      <Textarea
                        endContent={
                          <MdDescription className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        name="description"
                        value={values.description}
                        onBlur={handleBlur}
                        onChange={handleChange("description")}
                        label="Testimonial Description"
                        placeholder="Enter description for testimonail"
                        variant="flat"
                        minRows={5}
                        isInvalid={(errors?.description && touched?.description ? true : false)}
                        errorMessage={errors.description}
                      />

                      <Button
                        isLoading={isUpdateLoading}
                        type="submit"
                        className='self-center'
                        color="primary" onPress={() => {
                          // sending otp method
                        }}>
                        Submit
                      </Button>

                    </form>)}
                </Formik>


              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* delete  */}

      <CommonConfirmation
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteOpenChange}
        title={"Are you sure want to delete ?"}
        handleSubmit={() => {
          deleteApiCall(isLoadingDelete.uuid)

        }}
        nagativeTitle={"No"}
        positiveTitle={"Yes"}
      />

    </div>
  )
}

export default Testimonials