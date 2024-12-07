import { Button } from "@nextui-org/react"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

const BackButton = () => {
    const navigate = useNavigate()
    return <Button variant="light" startContent={<ArrowLeft />} onClick={() => navigate(-1)}>Back</Button>
}

export default BackButton   