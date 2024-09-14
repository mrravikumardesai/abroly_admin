

import { useSelector } from 'react-redux';
import { BsExclamationOctagon } from "react-icons/bs";
import { Button, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import React from 'react';


const CommonConfirmation = ({ isOpen, onOpenChange, title, handleSubmit, nagativeTitle, positiveTitle }: any) => {
  return (
    <React.Fragment>
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      size="md" className=' flex flex-col items-center justify-center' backdrop='blur'>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              <div className={`text-center`}>
                {/* <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" /> */}
                <BsExclamationOctagon className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                <h3 className={`pb-6 text-lg font-normal `}>
                  {title}
                </h3>
                <div className={`flex justify-center gap-4`}>
                <Button variant='shadow' color='secondary' onClick={onOpenChange}>
                    {/* No, cancel */}
                    {nagativeTitle}
                  </Button>
                  <Button variant='shadow' color='primary' onClick={handleSubmit}>
                    {positiveTitle}
                  </Button>
                
                </div>
              </div>
            </ModalBody>
          </>)}
      </ModalContent>
    </Modal>
    </React.Fragment>

  )
}

export default CommonConfirmation