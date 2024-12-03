import { Button, Card, CardBody } from '@nextui-org/react'
import { Edit, Info, FileText, Heart, Globe, Briefcase, Shield, Phone, User, MapPin, LetterText } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ServiceInfo = () => {

  const infoItems = [
    { title: "SOP", key: "sop", icon: <FileText className='text-primary' /> },
    { title: "Motivation Letter", key: "motivation", icon: <LetterText className='text-primary' /> },
    { title: "Cover Letter", key: "cover", icon: <FileText className='text-primary' /> },
    { title: "Health Insurance", key: "health_ins", icon: <Shield className='text-primary' /> },
    { title: "International Sim card", key: "sim_card", icon: <Phone className='text-primary' /> },
    { title: "Language Preparation", key: "language", icon: <Globe className='text-primary' /> },
    { title: "Jobs (Career section)", key: "career", icon: <Briefcase className='text-primary' /> },
    { title: "Visa and Consultation", key: "visa_consultation", icon: <User className='text-primary' /> },
    { title: "Tourist Visa", key: "tourist_visa", icon: <MapPin className='text-primary' /> },
  ]

  const navigate = useNavigate()

  return (
    <div>
      <section className='container mx-auto mt-5 flex flex-col gap-3 items-start justify-center'>
        {infoItems?.map((item: { title: string, key: string, icon: JSX.Element }) => (
          <Card key={item.key} className='shadow-lg hover:shadow-xl transition-shadow duration-300'>
            <CardBody className='flex flex-row items-center justify-between gap-4 p-4'>
              <div className='flex items-center gap-2'>
                {item.icon}
                <p className='font-semibold'>{item.title}</p>
              </div>
              <Button
                size='sm'
                variant='solid'
                color='primary'
                onPress={() => {
                  navigate(`/services_info/${item.key}`)
                }}
                startContent={<Edit className='p-1 -mx-2' />}
              >
                {/* <Edit className='mr-2' /> */}
                Edit Page Information
              </Button>
            </CardBody>
          </Card>
        ))}
      </section>

    </div>
  )
}

export default ServiceInfo