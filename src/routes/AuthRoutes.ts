import HomePage from "@/modules/Home/HomePage"
import ContactUs from "../components/ContactUs"
import FAQs from "../modules/FAQ/FAQs"
import NotFound from "../modules/NotFound/NotFound"
import IntroPage from "../modules/public/IntroPage"
import Login from "../modules/public/Login"
import Testimonials from "../modules/Testimonials/Testimonials"
import ContentWritingList from "@/modules/ContentWriting/ContentWritingList"
import SimCardListing from "@/modules/SimCard/SimCardListing"
import StaticContent from "@/modules/Static_content/StaticContent"
import StaticContentEdit from "@/modules/Static_content/StaticContentEdit"
import StaticContentAdd from "@/modules/Static_content/StaticContentAdd"
import ContentWritingDetails from "@/modules/ContentWriting/ContentWritingDetails"
import LanguagePrep from "@/modules/language_prep/LanguagePrep"
import LanguagePrepAdd from "@/modules/language_prep/LanguagePrepAdd"

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
    {
        path: "/static_content",
        element: StaticContent
    },
    {
        path: "/static/edit/:id",
        element: StaticContentEdit
    },
    {
        path: "/content_writing_details/:id",
        element: ContentWritingDetails
    },
    {
        path: "/static/add",
        element: StaticContentAdd
    },
    {
        path: "/lang_prep",
        element: LanguagePrep
    },
    {
        path: "/lang_prep/add",
        element: LanguagePrepAdd
    },
    // {
    //     path: "/lang_prep/edit/:id",
    //     element: LanguagePrepAdd
    // },

    // 404
    {
        path: "*",
        element: NotFound
    }
]