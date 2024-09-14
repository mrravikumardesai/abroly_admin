import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, useDisclosure } from '@nextui-org/react';
import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import { AdminRoutes, PublicRoutes } from '../../routes/AuthRoutes';
import ThemeToggle from '../../components/ThemeToggle';
import Footer from '../../components/Footer';
import CommonConfirmation from '../../components/CommonConfirmation';
import { handleLogout } from '../../utils/LogoutUtils';

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
  ]
  return (
    <div>
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        isMenuOpen={isMenuOpen}
      >
        <NavbarContent>
          <NavbarMenuToggle
            className="sm:hidden"
          />
          <NavbarBrand>
            {/* <AcmeLogo /> */}
            <section
              onClick={() => navigate("/")}
            // className={`bg-[url('${logo}')] bg-cover bg-center w-12 h-12`}
            // style={{
            //     // backgroundImage: `url(${logo})`,
            //     backgroundSize: 'cover',
            //     backgroundPosition: 'center',
            //     width: '10rem', 
            //     height: '2.5rem',
            //     cursor: 'pointer',
            //     backgroundColor:"#000000",
            //     borderRadius:20 
            //   }}
            >
              <p>Abroly</p>
            </section>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="end">
          {SideMenu.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className='cursor-pointer text-primary'
                onClick={() => {
                  navigate(item.to)
                  setIsMenuOpen(false)
                }}
              >
                {item.title}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarContent>
        <NavbarContent as="div" justify="end">
          <ThemeToggle />
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
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />

        </NavbarContent>
        <NavbarMenu>
          {SideMenu.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                // to={item.to}
                onPress={() => {
                  navigate(item.to)
                  setIsMenuOpen(!isMenuOpen)
                }}
              >
                {item.title}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
      <section className={`flex-grow overflow-auto `}>
        <Routes>
          {
            AdminRoutes.map(
              (item: any) => <Route key={item.path} path={item.path} element={<item.element />} />)
          }
        </Routes>

        {/* <Footer footerLinks={adminLinks} /> */}
        <Footer />

      </section>
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