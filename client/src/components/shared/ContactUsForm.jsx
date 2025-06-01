
function ContactUsForm() {
  return (
    <section className="text-gray-600 body-font relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="container  py-24 mx-auto flex sm:flex-nowrap flex-wrap">
      <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
      <iframe
  width="100%"
  height="100%"
  className="absolute inset-0"
  title="Islamia College Peshawar Map"
  src="https://maps.google.com/maps?q=Islamia%20College%20Peshawar&hl=en&z=14&output=embed"
  // style={{ filter: "grayscale(1) contrast(1.2) opacity(0.4)" }}
></iframe>

        <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md">
          <div className="lg:w-1/2 px-6">
            <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">ADDRESS</h2>
            <p className="mt-1">Islamia College University Peshawar GT Rd, Rahat Abad, Peshawar
</p>
          </div>
          <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
            <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">EMAIL</h2>
            <a className="text-indigo-500 leading-relaxed">icp@email.com</a>
            <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">PHONE</h2>
            <p className="leading-relaxed">+1 555-555-5556</p>
          </div>
        </div>
      </div>
      <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
        <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Feedback</h2>
        <p className="leading-relaxed mb-5 text-gray-600">Contact us about anything related to our company or services.
        We'll do our best to get back to you as soon as possible.</p>
        <div className="relative mb-4">
          <label htmlFor="name" className="leading-7 text-sm text-gray-600">Your Name<sup className="text-red-500">*</sup></label>
          <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="relative mb-4">
          <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone Number</label>
          <input type="text" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="relative mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">Your Email<sup className="text-red-500">*</sup></label>
          <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="relative mb-4">
          <label htmlFor="company" className="leading-7 text-sm text-gray-600">Your Company</label>
          <input type="text" id="company" name="company" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="relative mb-4">
          <label htmlFor="subject" className="leading-7 text-sm text-gray-600">Subject<sup className="text-red-500">*</sup></label>
          <input type="subject" id="subject" name="subject" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="relative mb-4">
          <label htmlFor="message" className="leading-7 text-sm text-gray-600">Your Question<sup className="text-red-500">*</sup></label>
          <textarea id="message" name="message" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
        </div>
        <button className="text-white border-0 py-2 px-6 focus:outline-none rounded text-lg bg-[#e86262] hover:bg-[#DF4A4A] ">Submit</button>
        
      </div>
    </div>
  </section>
  )
}

export default ContactUsForm