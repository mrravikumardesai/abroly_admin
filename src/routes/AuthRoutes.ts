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
import ContentWritingPages from "@/modules/ContentWriting/ContentWritingPages"
import LanguagePrepEdit from "@/modules/language_prep/LanguagePrepEdit"
import LanguagePrepChapters from "@/modules/language_prep/chapters/LanguagePrepChapters"
import ChapterAdd from "@/modules/language_prep/chapters/ChapterAdd"
import ChapterEdit from "@/modules/language_prep/chapters/ChapterEdit"
import SubChaptersList from "@/modules/language_prep/sub_chapters/SubChaptersList"
import AddSubChapters from "@/modules/language_prep/sub_chapters/AddSubChapters"
import UpdateSubChapter from "@/modules/language_prep/sub_chapters/UpdateSubChapter"
import HealthIns from "@/modules/HealthInsurance/HealthIns"
import QuizList from "@/modules/language_prep/chapters/QuizList"
import Agents from "@/modules/Agents/Agents"
import AgentDetails from "@/modules/Agents/AgentDetails"
import Students from "@/modules/Students/Students"
import StudentDetails from "@/modules/Students/StudentDetails"
import PackageList from "@/modules/Package/PackageList"

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
        path: "/content_writing/page/:id",
        element: ContentWritingPages
    },
    {
        path: "/sim_card",
        element: SimCardListing
    },
    {
        path: "/health_in",
        element: HealthIns
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
    {
        path: "/lang_prep/edit/:id",
        element: LanguagePrepEdit
    },
    {
        path: "/lang_prep/chapters/:id",
        element: LanguagePrepChapters
    },
    {
        path: "/lang_prep/chapters/add/:leval/:course_uuid",
        element: ChapterAdd
    },
    {
        path: "/lang_prep/chapters/edit/:leval/:course_uuid/:id",
        element: ChapterEdit
    },

    // sub chapters
    {
        path: "/lang_prep/sub_chapters/:id",
        element: SubChaptersList
    },
    {
        path: "/lang_prep/add_sub_chapters/:id",
        element: AddSubChapters
    },
    {
        path: "/lang_prep/edit_sub_chapters/:id",
        element: UpdateSubChapter
    },

    // quiz
    {
        path: "/lang_prep/quiz/:leval/:course_uuid",
        element: QuizList
    },

    // agents 
    {
        path: "/agents",
        element: Agents
    },
    {
        path: "/agents/:id",
        element: AgentDetails
    },
    // student
    {
        path: "/student",
        element: Students
    },
    {
        path: "/student/:id",
        element: StudentDetails
    },
    
    // packages
    {
        path: "/packages",
        element: PackageList
    },

    // 404
    {
        path: "*",
        element: NotFound
    }
]