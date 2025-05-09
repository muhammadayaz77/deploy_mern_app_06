import ContactUsForm from "../../components/shared/ContactUsForm"

function ContactUs() {
  return (
    <div className="bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('/website-banner.jpg')] bg-cover bg-center bg-no-repeat bg-fixed h-[40%] pt-28">
      <div className="text-black"> 
      <h1 className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white text-4xl mb-10">Contact us</h1>
      <div className="bg-white">
        <ContactUsForm />
      </div>
      </div>
    </div>
  )
}

export default ContactUs