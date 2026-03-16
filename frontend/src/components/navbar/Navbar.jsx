import Leaf from './leaf.png'
import { Link } from 'react-router-dom'
import React,{useState} from 'react'

const Navbar = () => {

   const [change, setChange] = useState(true);

   return (

      <header className="text-gray-600 body-font bg-green-300">

         <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">

            <Link to="/home" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">

               <img className='h-10' src={Leaf} alt="leaf" />

               <span className="ml-3 text-3xl font-bold text-green-800">
                  WasteVision
               </span>

            </Link>

            <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center cursor-pointer">

               <Link to="/home" className="mr-5 hover:text-gray-900">
                  Home
               </Link>

               <Link to="/video" className="mr-5 hover:text-gray-900">
                  WebCam
               </Link>

               <Link to="/image" className="mr-5 hover:text-gray-900">
                  Image Upload
               </Link>

               <Link to="/pickup" className="mr-5 hover:text-gray-900">
                  Book Pickup
               </Link>

               <Link to="/donate" className="mr-5 hover:text-gray-900">
                  Donate Items
               </Link>

               {/* ADMIN DASHBOARD */}

               <Link to="/admin" className="mr-5 hover:text-gray-900">
   Admin Dashboard
</Link>

            </nav>

            <Link to="/login">

               <button
                  onClick={()=>setChange(!change)}
                  className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
               >

                  {change ? "Login" : "Logout"}

                  <svg
                     fill="none"
                     stroke="currentColor"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="2"
                     className="w-4 h-4 ml-1"
                     viewBox="0 0 24 24"
                  >
                     <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>

               </button>

            </Link>

         </div>

      </header>

   )
}

export default Navbar