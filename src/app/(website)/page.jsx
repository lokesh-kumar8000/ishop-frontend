import Feature from "@/components/website/home/Feature"
import Hero from "@/components/website/home/Hero"
import BestSeller from "@/components/website/home/BestSeller"


function page() {
  return (
    <div className='w-full py-5 '> 
      <div className=" py-[15px] "> 
        <Hero/> 
        <Feature/> 
        <BestSeller/> 
      </div>  
    </div>
  )
}                             

export default page