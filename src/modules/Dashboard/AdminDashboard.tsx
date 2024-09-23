import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, useDisclosure } from '@nextui-org/react';
import React from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { AdminRoutes, PublicRoutes } from '../../routes/AuthRoutes';
import ThemeToggle from '../../components/ThemeToggle';
import Footer from '../../components/Footer';
import CommonConfirmation from '../../components/CommonConfirmation';
import { handleLogout } from '../../utils/LogoutUtils';
import {

  Home,

  Menu,

} from "lucide-react"



import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const AdminDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // for logout
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const navigate = useNavigate()
  const SideMenu = [
    {
      title: "Home",
      to: "/",
    },
    {
      title: "Content Writing",
      to: "/content_writing",
    },
    {
      title: "Language Preparation",
      to: "/lang_prep",
    },
    {
      title: "Sim Card",
      to: "/sim_card",
    },

    {
      title: "Faqs",
      to: "/faqs",
    },
    {
      title: "Static Content",
      to: "/static_content",
    },
    {
      title: "Testimonials",
      to: "/testimonails",
    },

  ]

  console.log(window.location.pathname != "/");
  
  return (
    // <div>
    //   <Navbar
    //     onMenuOpenChange={setIsMenuOpen}
    //     isMenuOpen={isMenuOpen}
    //   >
    //     <NavbarContent>
    //       <NavbarMenuToggle
    //         className="sm:hidden"
    //       />
    //       <NavbarBrand>
    //         {/* <AcmeLogo /> */}
    //         <section
    //           onClick={() => navigate("/")}
    //         >
    //           <p>Abroly</p>
    //         </section>
    //       </NavbarBrand>
    //     </NavbarContent>

    //     <NavbarContent className="hidden sm:flex gap-4" justify="end">
    //       {SideMenu.map((item, index) => (
    //         <NavbarMenuItem key={`${item}-${index}`}>
    //           <Link
    //             className='cursor-pointer text-primary'
    //             onClick={() => {
    //               navigate(item.to)
    //               setIsMenuOpen(false)
    //             }}
    //           >
    //             {item.title}
    //           </Link>
    //         </NavbarMenuItem>
    //       ))}
    //     </NavbarContent>
    //     <NavbarContent as="div" justify="end">
    //       <ThemeToggle />
    //       <Dropdown placement="bottom-end">
    //         <DropdownTrigger>
    //           <Avatar
    //             as="button"
    //             className="transition-transform"
    //             color="secondary"
    //             size="sm"
    //             // src={profileimage}
    //             src={""}
    //             showFallback
    //           />
    //         </DropdownTrigger>
    //         <DropdownMenu aria-label="Profile Actions" variant="flat">
    //           <DropdownItem key="profile" className="h-14 gap-2">
    //             <p className="font-semibold">Signed in as</p>
    //             {/* <p className="font-semibold">{user_name}</p> */}
    //             <p className="font-semibold">{"user_name"}</p>
    //           </DropdownItem>
    //           <DropdownItem key="settings">My Settings</DropdownItem>
    //           <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
    //           <DropdownItem key="logout" color="danger" onClick={onOpen}>
    //             Log Out
    //           </DropdownItem>
    //         </DropdownMenu>
    //       </Dropdown>
    //       <NavbarMenuToggle
    //         aria-label={isMenuOpen ? "Close menu" : "Open menu"}
    //         className="sm:hidden"
    //       />

    //     </NavbarContent>
    //     <NavbarMenu>
    //       {SideMenu.map((item, index) => (
    //         <NavbarMenuItem key={`${item}-${index}`}>
    //           <Link
    //             className="w-full"
    //             // to={item.to}
    //             onPress={() => {
    //               navigate(item.to)
    //               setIsMenuOpen(!isMenuOpen)
    //             }}
    //           >
    //             {item.title}
    //           </Link>
    //         </NavbarMenuItem>
    //       ))}
    //     </NavbarMenu>
    //   </Navbar>
    //   <section className={`flex-grow overflow-auto `}>
    //     <Routes>
    //       {
    //         AdminRoutes.map(
    //           (item: any) => <Route key={item.path} path={item.path} element={<item.element />} />)
    //       }
    //     </Routes>

    //     {/* <Footer footerLinks={adminLinks} /> */}
    //     <Footer />

    //   </section>
    //   <CommonConfirmation
    //     isOpen={isOpen}
    //     onOpenChange={onOpenChange}
    //     title={"Are you sure want to logout ?"}
    //     handleSubmit={() => {
    //       handleLogout(navigate)

    //     }}
    //     nagativeTitle={"No"}
    //     positiveTitle={"Yes"}
    //   />
    // </div>
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              {/* <Package2 className="h-6 w-6" /> */}
              <span className="">Abroly</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {SideMenu.map((menuItems: any) => (
                <Link
                  key={menuItems?.to}
                  to={menuItems?.to}
                  className={`flex items-center gap-3 px-3 py-2 ${window.location.pathname.substring(1) == menuItems.to.substring(1) && 'bg-gray-200 dark:bg-gray-700'} rounded-xl my-1 transition-all`}
                >
                  {/* <Home className="h-4 w-4" /> */}
                  {menuItems?.title}
                </Link>
              ))}
            </nav>
          </div>
          {/* <div className="mt-auto p-4"> */}
            {/* <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card> */}
            {/* <p>Footer Content</p> */}
          {/* </div> */}
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
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
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
              {SideMenu.map((menuItems: any) => (
                <Link
                  key={menuItems?.to}
                  to={menuItems?.to}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all"
                >
                  <Home className="h-4 w-4" />
                  {menuItems?.title}
                </Link>
              ))}

              </nav>
              <div className="mt-auto">
                {/* <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card> */}
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            {/* <form>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
              />
            </div>
          </form> */}
            <p>Header Content</p>
          </div>
          <ThemeToggle />
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="flat" isIconOnly className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
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
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
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