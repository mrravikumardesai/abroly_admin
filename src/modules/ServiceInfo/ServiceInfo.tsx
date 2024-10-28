import { Button, Card, CardBody } from '@nextui-org/react'
import { Edit } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ServiceInfo = () => {

  const infoItems = [
    { title: "SOP", key: "sop", },
    { title: "Motivation Letter", key: "motivation", },
    { title: "Cover Letter", key: "cover", },
    { title: "Language Preparation", key: "language", },
    { title: "Internation Sim card", key: "sim_card", },
    { title: "Health Insurance", key: "health_ins" },
  ]

  const navigate = useNavigate()

  return (
    <div>
      <section className='container mx-auto mt-5 flex flex-col gap-3 items-start justify-center'>
        {infoItems?.map((item: { title: string, key: string }) => <Card>
          <CardBody className='flex flex-row items-center justify-center gap-2'>
            <p>{item.title}</p>
            <Button
              size='sm'
              variant='solid'
              color='primary'
              // isIconOnly
              onPress={() => {
                navigate(`/services_info/${item.key}`)
              }}
            >Edit Page Information</Button>
          </CardBody>
        </Card>)}
      </section>

    </div>
  )
}

export default ServiceInfo