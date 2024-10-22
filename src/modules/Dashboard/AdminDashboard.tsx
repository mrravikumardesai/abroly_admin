// import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, useDisclosure } from '@nextui-org/react';
// import React, { useState } from 'react'
// import { Link, Route, Routes, useNavigate } from 'react-router-dom';
// import { AdminRoutes, PublicRoutes } from '../../routes/AuthRoutes';
// import ThemeToggle from '../../components/ThemeToggle';
// import Footer from '../../components/Footer';
// import CommonConfirmation from '../../components/CommonConfirmation';
// import { handleLogout } from '../../utils/LogoutUtils';
// import {
//   Home,
//   LucideLanguages,
//   LucideShieldQuestion,
//   Menu,
//   User,
// } from "lucide-react"

// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
// import { RiHealthBookLine, RiHome5Line } from 'react-icons/ri';
// import { MdLanguage, MdOutlineDocumentScanner, MdOutlineReviews, MdOutlineSimCard } from 'react-icons/md';
// import { BsQuestion } from 'react-icons/bs';
// import { PiNewspaper } from 'react-icons/pi';

import { Home, User, FileText, ShieldQuestion, Newspaper, Star, ChevronRight, MoreHorizontal, ChevronsUpDown, BadgeCheck, Bell, LogOut } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useState } from "react"
import { Avatar, useDisclosure } from "@nextui-org/react"
import { Link, Route, Routes, useNavigate } from "react-router-dom"
import CommonConfirmation from "@/components/CommonConfirmation"
import { handleLogout } from "@/utils/LogoutUtils"
import { useSelector } from "react-redux"
import { AdminRoutes } from "@/routes/AuthRoutes"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: Home,
      isActive: true,
      items: [
        {
          title: "Home",
          url: "/",
        },
      ],
    },
    {
      title: "Users",
      url: "#",
      icon: User,
      isActive: true,
      items: [
        {
          title: "Agents",
          url: "/agents",
        },
        {
          title: "Students",
          url: "/student",
        },
      ],
    },

    {
      title: "Services",
      url: "#",
      icon: FileText,
      isActive: true,
      items: [
        {
          title: "Content Writing",
          url: "/content_writing",
        },
        {
          title: "Language Prep",
          url: "/lang_prep",
        },
        {
          title: "Sim Cards",
          url: "/sim_card",
        },
        {
          title: "Health Insurance",
          url: "/health_in",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "FAQs",
      url: "/faqs",
      icon: ShieldQuestion,
    },
    {
      title: "Static Content",
      url: "/static_content",
      icon: Newspaper,
    },
    {
      title: "Testimonials",
      url: "/testimonails",
      icon: Star,
    },
  ],
  projects: [],
};
// const navigate = useNavigate()
// const SideMenu = [
//   {
//     title: "Home",
//     to: "/",
//     icon: <RiHome5Line className="h-4 w-4"/>
//   },
//   {
//     title: "Agents",
//     to: "/agents",
//     icon: <User className="h-4 w-4" />
//   },
//   {
//     title: "Student",
//     to: "/student",
//     icon: <User className="h-4 w-4" />
//   },
//   {
//     title: "Content Writing",
//     to: "/content_writing",
//     icon: <MdOutlineDocumentScanner className="h-4 w-4" />
//   },
//   {
//     title: "Language Preparation",
//     to: "/lang_prep",
//     icon: <LucideLanguages className="h-4 w-4"/>

//   },
//   {
//     title: "Sim Card",
//     to: "/sim_card",
//     icon: <MdOutlineSimCard className="h-4 w-4"/>

//   },
//   {
//     title: "Health Insurance",
//     to: "/health_in",
//     icon: <RiHealthBookLine className="h-4 w-4"/>

//   },

//   {
//     title: "Faqs",
//     to: "/faqs",
//     icon: <LucideShieldQuestion className="h-4 w-4"/>

//   },
//   {
//     title: "Static Content",
//     to: "/static_content",
//     icon: <PiNewspaper className="h-4 w-4"/>

//   },
//   {
//     title: "Testimonials",
//     to: "/testimonails",
//     icon: <MdOutlineReviews className="h-4 w-4"/>
//   },

// ]

// const AdminDashboard = () => {

//   // // for logout
//   // const { isOpen, onOpen, onOpenChange } = useDisclosure();

//   // const [openMenu,setMenuOpen]  = useState(false)

//   // return (
//   // <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
//   //   <div className="hidden border-r bg-muted/40 md:block">
//   //     <div className="flex h-full max-h-screen flex-col gap-2">
//   //       <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
//   //         <Link to="/" className="flex items-center gap-2 font-semibold">
//   //           <span className="">Abroly</span>
//   //         </Link>
//   //       </div>
//   //       <div className="flex-1">
//   //         <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
//   //           {SideMenu.map((menuItems: any) => (
//   //             <Link
//   //               key={menuItems?.to}
//   //               to={menuItems?.to}
//   //               className={`flex items-center justify-start gap-3 px-3 py-2 ${window.location.pathname.substring(1) == menuItems.to.substring(1) && 'bg-gray-200 dark:bg-gray-700'} rounded-xl my-1 transition-all font-bold`}
//   //             >
//   //               {menuItems?.icon}
//   //               {menuItems?.title}
//   //             </Link>
//   //           ))}
//   //         </nav>
//   //       </div>
//   //     </div>
//   //   </div>
//   //   <div className="flex flex-col">
//   //     <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
//   //       <Sheet open={openMenu} onOpenChange={setMenuOpen}>
//   //         <SheetTrigger asChild>
//   //           <Button
//   //             variant="flat"
//   //             isIconOnly
//   //             className="shrink-0 md:hidden"
//   //           >
//   //             <Menu className="h-5 w-5" />
//   //             <span className="sr-only">Toggle navigation menu</span>
//   //           </Button>
//   //         </SheetTrigger>
//   //         <SheetContent side="left" className="flex flex-col w-30">
//   //           <nav className="grid gap-2 text-lg font-medium">
//   //           {SideMenu.map((menuItems: any) => (
//   //             <Link
//   //               key={menuItems?.to}
//   //               to={menuItems?.to}
//   //               onClick={()=>{
//   //                 setMenuOpen(false)
//   //               }}
//   //               className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all"
//   //             >
//   //               {menuItems?.icon}
//   //               {menuItems?.title}
//   //             </Link>
//   //           ))}

//   //           </nav>
//   //         </SheetContent>
//   //       </Sheet>
//   //       <div className="w-full flex-1">
//   //         {/* <p>Header Content</p> */}
//   //       </div>
//   //       {/* <ThemeToggle /> */}
//   //        <Dropdown placement="bottom-end">
//   //         <DropdownTrigger>
//   //           <Avatar
//   //             as="button"
//   //             className="transition-transform"
//   //             color="secondary"
//   //             size="sm"
//   //             // src={profileimage}
//   //             src={""}
//   //             showFallback
//   //           />
//   //         </DropdownTrigger>
//   //         <DropdownMenu aria-label="Profile Actions" variant="flat">
//   //           <DropdownItem key="profile" className="h-14 gap-2">
//   //             <p className="font-semibold">Signed in as</p>
//   //             {/* <p className="font-semibold">{user_name}</p> */}
//   //             <p className="font-semibold">{"user_name"}</p>
//   //           </DropdownItem>
//   //           <DropdownItem key="settings">My Settings</DropdownItem>
//   //           <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
//   //           <DropdownItem key="logout" color="danger" onClick={onOpen}>
//   //             Log Out
//   //           </DropdownItem>
//   //         </DropdownMenu>
//   //       </Dropdown>
//   //     </header>
//   //     <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 ">
//   //         <Routes>
//   //           {
//   //             AdminRoutes.map(
//   //               (item: any) => <Route key={item.path} path={item.path} element={<item.element />} />)
//   //           }
//   //         </Routes>
//   //     </main>
//   //   </div>

//   //   <CommonConfirmation
//   //     isOpen={isOpen}
//   //     onOpenChange={onOpenChange}
//   //     title={"Are you sure want to logout ?"}
//   //     handleSubmit={() => {
//   //       handleLogout(navigate)

//   //     }}
//   //     nagativeTitle={"No"}
//   //     positiveTitle={"Yes"}
//   //   />
//   // </div>

//   // )

//   return (
//     <SidebarProvider>
//       <Sidebar>
//         <SidebarHeader>
//           <SidebarMenu>
//             <SidebarMenuItem>
//               <SidebarMenuButton
//                 size="lg"
//                 className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
//               >
//                 {/* <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"> */}
//                 {/* <GalleryVerticalEnd className="size-4" /> */}
//                 {/* </div> */}
//                 <div className="flex flex-col gap-0.5 leading-none">
//                   <span className="font-semibold">Abroly</span>
//                   <span className="">Admin Login</span>
//                 </div>

//                 {/* <ChevronsUpDown className="ml-auto" /> */}
//               </SidebarMenuButton>

//             </SidebarMenuItem>
//           </SidebarMenu>
//           <form>
//             <SidebarGroup className="py-0">
//               <SidebarGroupContent className="relative">
//                 {/* <Label htmlFor="search" className="sr-only">
//                   Search
//                 </Label> */}
//                 <SidebarInput
//                   id="search"
//                   placeholder="Search the docs..."
//                   className="pl-8"
//                 />
//                 <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
//               </SidebarGroupContent>
//             </SidebarGroup>
//           </form>
//         </SidebarHeader>
//         <SidebarContent>
//           {/* We create a SidebarGroup for each parent. */}
//           {data.navMain.map((item) => (
//             <SidebarGroup key={item.title}>
//               <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
//               <SidebarGroupContent>
//                 <SidebarMenu>
//                   {item.items.map((item) => (
//                     <SidebarMenuItem key={item.title}>
//                       <SidebarMenuButton asChild isActive={item.isActive}>
//                         <Link to={item.url}>{item.title}</Link>
//                       </SidebarMenuButton>
//                     </SidebarMenuItem>
//                   ))}
//                 </SidebarMenu>
//               </SidebarGroupContent>
//             </SidebarGroup>
//           ))}
//         </SidebarContent>
//         <SidebarRail />
//       </Sidebar>
//       <SidebarInset>
//         <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
//           <SidebarTrigger className="-ml-1" />
//           <Separator orientation="vertical" className="mr-2 h-4" />
//           {/* <Breadcrumb>
//             <BreadcrumbList>
//               <BreadcrumbItem className="hidden md:block">
//                 <BreadcrumbLink href="#">
//                   Building Your Application
//                 </BreadcrumbLink>
//               </BreadcrumbItem>
//               <BreadcrumbSeparator className="hidden md:block" />
//               <BreadcrumbItem>
//                 <BreadcrumbPage>Data Fetching</BreadcrumbPage>
//               </BreadcrumbItem>
//             </BreadcrumbList>
//           </Breadcrumb> */}
//         </header>
//         <div className="flex flex-1 flex-col gap-4 p-4">
//           <div className="grid auto-rows-min gap-4 md:grid-cols-3">
//             <div className="aspect-video rounded-xl bg-muted/50" />
//             <div className="aspect-video rounded-xl bg-muted/50" />
//             <div className="aspect-video rounded-xl bg-muted/50" />
//           </div>
//           <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
//         </div>
//       </SidebarInset>
//     </SidebarProvider>
//   )
// }


const AdminDashboard = () => {
  const { phone, email, profileimage, user_name } = useSelector((state: any) => state.login);

  // for logout
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const navigate = useNavigate()

  return (
    <SidebarProvider>
      <Sidebar variant="inset">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link to="/">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    {/* <Command className="size-4" /> */}
                    <p>A</p>
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Abroly</span>
                    <span className="truncate text-xs">Admin Login</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <Link
                        to={item.url}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.items?.length ? (
                      <>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuAction className="data-[state=open]:rotate-90">
                            <ChevronRight />
                            <span className="sr-only">Toggle</span>
                          </SidebarMenuAction>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                  {/* <a href={subItem.url}>
                                <span>{subItem.title}</span>
                              </a> */}
                                  <Link
                                    to={subItem.url}
                                  >
                                    <span>{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </>
                    ) : null}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarMenu>
              {data.projects.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.url}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction showOnHover>
                        <MoreHorizontal />
                        <span className="sr-only">More</span>
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-48"
                      side="bottom"
                      align="end"
                    >
                      <DropdownMenuItem>
                        {/* <Folder className="text-muted-foreground" /> */}
                        <span>View Project</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        {/* <Share className="text-muted-foreground" /> */}
                        <span>Share Project</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        {/* <Trash2 className="text-muted-foreground" /> */}
                        <span>Delete Project</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <MoreHorizontal />
                  <span>More</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
              <SidebarMenu>
                {data.navSecondary.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild size="sm">
                      <Link
                        to={item.url}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <section className="h-8 w-8 rounded-lg">
                      <Avatar
                        size="sm"
                        src={profileimage}
                        alt={user_name}
                        showFallback
                      />
                    </section>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user_name}
                      </span>
                      <span className="truncate text-xs">
                        {phone}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-white" // Added background color
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <section className="h-8 w-8 rounded-lg">
                        <Avatar
                          size="sm"
                          showFallback
                          src={profileimage}
                          alt={user_name}
                        />
                      </section>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {user_name}
                        </span>
                        <span className="truncate text-xs">
                          {phone}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <BadgeCheck className="p-1"/>
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Bell className="p-1" />
                      Notifications
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onOpen}>
                    <LogOut className="p-1" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />

          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Routes>
            {
              AdminRoutes.map(
                (item: any) => <Route key={item.path} path={item.path} element={<item.element />} />)
            }
          </Routes>

        </div>
      </SidebarInset>

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
    </SidebarProvider>

  )
}

export default AdminDashboard
