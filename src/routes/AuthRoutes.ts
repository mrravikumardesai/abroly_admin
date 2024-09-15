import HomePage from "@/modules/Home/HomePage"
import ContactUs from "../components/ContactUs"
import FAQs from "../modules/FAQ/FAQs"
import NotFound from "../modules/NotFound/NotFound"
import IntroPage from "../modules/public/IntroPage"
import Login from "../modules/public/Login"
import Testimonials from "../modules/Testimonials/Testimonials"
import ContentWritingList from "@/modules/ContentWriting/ContentWritingList"
import SimCardListing from "@/modules/SimCard/SimCardListing"

export const PublicRoutes = [
    {
        path: "/",
        element: Login
    },
    {
        path: "/login",
        element: Login
    },
    {
        path: "*",
        element: NotFound
    }

]


export const AdminRoutes = [


    {
        path: "/",
        element: HomePage
    },
    {
        path: "/faqs",
        element: FAQs
    },
    {
        path: "/testimonails",
        element: Testimonials
    },
    {
        path: "/content_writing",
        element: ContentWritingList
    },
    {
        path: "/sim_card",
        element: SimCardListing
    },

    // 404
    {
        path: "*",
        element: NotFound
    }
]