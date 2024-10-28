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

import { Home, User, FileText, ShieldQuestion, Newspaper, Star, ChevronRight, MoreHorizontal, ChevronsUpDown, BadgeCheck, Bell, LogOut, SubscriptIcon, MemoryStick } from "lucide-react";

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
          title: "Information pages",
          url: "/services_info",
        },
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
    {
      title: "Subscription",
      url: "#",
      icon: MemoryStick,
      isActive: true,
      items: [
        // 'consultant', 'tours_travels', "job_post"
        {
          title: "Packages",
          url: "/packages",
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
                                    className={`${window.location.pathname == subItem.url && 'bg-gray-200'}`}
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
                      <BadgeCheck className="p-1" />
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
