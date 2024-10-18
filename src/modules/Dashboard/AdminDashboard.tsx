import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, useDisclosure } from '@nextui-org/react';
import React, { useState } from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { AdminRoutes, PublicRoutes } from '../../routes/AuthRoutes';
import ThemeToggle from '../../components/ThemeToggle';
import Footer from '../../components/Footer';
import CommonConfirmation from '../../components/CommonConfirmation';
import { handleLogout } from '../../utils/LogoutUtils';
import {

  Home,

  LucideLanguages,

  LucideShieldQuestion,

  Menu,
  User,

} from "lucide-react"



import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { RiHealthBookLine, RiHome5Line } from 'react-icons/ri';
import { MdLanguage, MdOutlineDocumentScanner, MdOutlineReviews, MdOutlineSimCard } from 'react-icons/md';
import { BsQuestion } from 'react-icons/bs';
import { PiNewspaper } from 'react-icons/pi';

const AdminDashboard = () => {

  // for logout
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const navigate = useNavigate()
  const SideMenu = [
    {
      title: "Home",
      to: "/",
      icon: <RiHome5Line className="h-4 w-4"/>
    },
    {
      title: "Agents",
      to: "/agents",
      icon: <User className="h-4 w-4" />
    },
    {
      title: "Student",
      to: "/student",
      icon: <User className="h-4 w-4" />
    },
    {
      title: "Content Writing",
      to: "/content_writing",
      icon: <MdOutlineDocumentScanner className="h-4 w-4" />
    },
    {
      title: "Language Preparation",
      to: "/lang_prep",
      icon: <LucideLanguages className="h-4 w-4"/>

    },
    {
      title: "Sim Card",
      to: "/sim_card",
      icon: <MdOutlineSimCard className="h-4 w-4"/>

    },
    {
      title: "Health Insurance",
      to: "/health_in",
      icon: <RiHealthBookLine className="h-4 w-4"/>

    },

    {
      title: "Faqs",
      to: "/faqs",
      icon: <LucideShieldQuestion className="h-4 w-4"/>

    },
    {
      title: "Static Content",
      to: "/static_content",
      icon: <PiNewspaper className="h-4 w-4"/>

    },
    {
      title: "Testimonials",
      to: "/testimonails",
      icon: <MdOutlineReviews className="h-4 w-4"/>
    },

  ]

  const [openMenu,setMenuOpen]  = useState(false)
  
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <span className="">Abroly</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {SideMenu.map((menuItems: any) => (
                <Link
                  key={menuItems?.to}
                  to={menuItems?.to}
                  className={`flex items-center justify-start gap-3 px-3 py-2 ${window.location.pathname.substring(1) == menuItems.to.substring(1) && 'bg-gray-200 dark:bg-gray-700'} rounded-xl my-1 transition-all font-bold`}
                >
                  {menuItems?.icon}
                  {menuItems?.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet open={openMenu} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="flat"
                isIconOnly
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col w-30">
              <nav className="grid gap-2 text-lg font-medium">
              {SideMenu.map((menuItems: any) => (
                <Link
                  key={menuItems?.to}
                  to={menuItems?.to}
                  onClick={()=>{
                    setMenuOpen(false)
                  }}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all"
                >
                  {menuItems?.icon}
                  {menuItems?.title}
                </Link>
              ))}

              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            {/* <p>Header Content</p> */}
          </div>
          {/* <ThemeToggle /> */}
           <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform"
                color="secondary"
                size="sm"
                // src={profileimage}
                src={""}
                showFallback
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                {/* <p className="font-semibold">{user_name}</p> */}
                <p className="font-semibold">{"user_name"}</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={onOpen}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 ">
            <Routes>
              {
                AdminRoutes.map(
                  (item: any) => <Route key={item.path} path={item.path} element={<item.element />} />)
              }
            </Routes>
        </main>
      </div>

      <CommonConfirmation
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title={"Are you sure want to logout ?"}
        handleSubmit={() => {
          handleLogout(navigate)

        }}
        nagativeTitle={"No"}
        positiveTitle={"Yes"}
      />
    </div>

  )
}

export default AdminDashboard