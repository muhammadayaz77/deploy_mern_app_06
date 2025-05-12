import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileForm from "./ProfileForm";

function ProfileInfo() {
  return (
    <div className="shadow-sm">
      <div className="flex gap-5 primary-bg p-5 pb-8 text-white">
        {/* Profile Image */}
        <div>
          <Avatar className="cursor-pointer h-22 w-22">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
        </div>
        {/* Profile Head Details */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col text-[17px] font-medium">
            <span>Muhammad Ayaz</span>
            <span>BSCS-221331</span>
            <span>Faculty of Physical and Numerical Sciences</span>
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col">
              <span className="text-xl font-semibold">Under Graduate</span>
              <span className="text-center text-sm">Career</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-semibold">BS Computer Science</span>
              <span className="text-center text-sm">Program</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-semibold">5th Semester</span>
              <span className="text-center text-sm">Current Semester</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <ProfileForm />
      </div>
    </div>
  );
}

export default ProfileInfo;
