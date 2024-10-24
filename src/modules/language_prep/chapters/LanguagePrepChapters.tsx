import { Card, CardBody, Tab, Tabs } from '@nextui-org/react'
import React from 'react'
import { useParams } from 'react-router-dom'
import LanguagePrepChapterTemplate from './LanguagePrepChapterTemplate'

const LanguagePrepChapters = () => {
    const { id } = useParams()
    return (

        <div>
            <Tabs variant="underlined" aria-label="Tabs variants">
                <Tab key="Leval1" title="Level A" >
                    <Card>
                        <CardBody>
                            <LanguagePrepChapterTemplate leval={"1"} uuid={id} />
                        </CardBody>
                    </Card>

                </Tab>
                <Tab key="Leval2" title="Level B" >
                    <Card>
                        <CardBody>
                            <LanguagePrepChapterTemplate leval={"2"} uuid={id} />
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="Leval3" title="Level C" >
                    <Card>
                        <CardBody>
                            <LanguagePrepChapterTemplate leval={"3"} uuid={id} />
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </div>


        // 
    )
}

export default LanguagePrepChapters