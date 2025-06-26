"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { LuCamera, LuHouse, LuMenu, LuSearch, LuSettings } from 'react-icons/lu'

const navList = [
  {
    name: "home",
    link: "/",
    icon: <LuHouse size={24}/>
  },
  {
    name: "settings",
    link: "/",
    icon: <LuSettings size={24}/>
  },
]

const Navbar = () => {
  const pathname = usePathname()
  return (
    <>
    {
      pathname === '/' && (
        <nav className='w-full sticky bottom-0 h-10 '>
      <ul className='flex justify-evenly items-center h-full gap-2 '>
        {
          navList.map((navItem, index)=>{
            return (
              <li key={index}>
            <Link href={navItem.link} className='flex items-center'>
             {navItem.icon} <span className='hidden md:block'>{navItem.name}</span>
            </Link>
          </li>
            )
          })
        }
      </ul>
    </nav>
      )
    }
    </>
  )
}

export default Navbar