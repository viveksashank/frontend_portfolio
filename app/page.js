// import LoginPage from './(auth)/login/page'
// import SideBar from './components/dashboard/SideBar'
// import PaymentsPage from './components/payments/damnIt'

// export default function page() {
//   return (
//     <div className="flex h-screen overflow-hidden bg-[#ecebf3]">
     
//       <SideBar />
//       <PaymentsPage />
     
//     </div>
//   )
// }          
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login");
}







