import React, { useState, useRef } from "react";
import {
  MdEmail,
  MdContactEmergency,
  MdHome,
  MdCloudUpload,
  MdEdit,
} from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import axios from "axios";

// Shadcn
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UPLOAD_STUDENT_API_ENDPOINT } from "../../utils/constants";

function ProfileForm({ edit }) {
  const [signature, setSignature] = useState(null);
  const [vaccineCert, setVaccineCert] = useState(null);
  const [isVaccinated, setIsVaccinated] = useState("no");
  const [loading, setLoading] = useState(false);
  const signatureInputRef = useRef(null);
  const vaccineInputRef = useRef(null);
  const signatureFileRef = useRef(null);
  const vaccineFileRef = useRef(null);

  const triggerSignatureInput = () => {
    signatureInputRef.current?.click();
  };

  const triggerVaccineInput = () => {
    vaccineInputRef.current?.click();
  };

  const handleSignatureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setSignature(previewUrl);
      signatureFileRef.current = file;
    }
  };

  const handleVaccineChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setVaccineCert(previewUrl);
      vaccineFileRef.current = file;
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      const formData = new FormData();
      
      // Append files if they exist
      if (signatureFileRef.current) {
        formData.append('file', signatureFileRef.current);
      }
      
      if (isVaccinated === "yes" && vaccineFileRef.current) {
        formData.append('covid', vaccineFileRef.current);
      }

      // Make API call
      const response = await axios.post(UPLOAD_STUDENT_API_ENDPOINT, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      
      console.log('Files uploaded successfully:', response.data);
      
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-6 overflow-hidden">
      <div className="border-b-2 border-gray-200 relative">
        <h3 className="text-sm primary-text mt-10 pb-2 px-5 inline-block relative">
          ABOUT
          <span className="absolute -bottom-[2px] left-0 right-0 h-[2px] bg-black"></span>
        </h3>
      </div>

      <div className="grid grid-cols-12 py-10 gap-10 lg:gap-0">
        <div className="lg:col-span-6 col-span-12 w-full overflow-hidden">
          <h3 className="primary-text font-medium text-lg">
            Contact Information
          </h3>

          {/* Email */}
          <div className="flex mx-3 mt-5">
            <span>
              <MdEmail className="h-7 w-7 mt-2 primary-text" />
            </span>
            <div className="relative w-full pb-2 mx-4">
              <h4 className="text-[14px] font-medium text-primary">
                ayaz@gmail.com
              </h4>
              <p className="text-[12px] text-gray-500 pt-2">Email</p>
              <div className="absolute bottom-0 left-0 right-0 border-b-2"></div>
            </div>
          </div>

          {/* Phone */}
          <div className="flex mx-3 mt-3">
            <span>
              <FaPhoneAlt className="h-6 w-6 mt-2 primary-text" />
            </span>
            <div className="relative w-full pb-2 mx-4">
              <h4 className="text-[14px] font-medium text-primary">
                +92 38385353
              </h4>
              <p className="text-[12px] text-gray-500 pt-2">Phone</p>
              <div className="absolute bottom-0 left-0 right-0 border-b-2"></div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="flex mx-3 mt-3">
            <span>
              <MdContactEmergency className="h-6 w-6 mt-2 primary-text" />
            </span>
            <div className="relative w-full pb-2 mx-4">
              <h4 className="text-[14px] font-medium text-primary">
                +92 38353838
              </h4>
              <p className="text-[12px] text-gray-500 pt-2">
                Emergency Contact
              </p>
              <div className="absolute bottom-0 left-0 right-0 border-b-2"></div>
            </div>
          </div>

          {/* Present Address */}
          <div className="flex mx-3 mt-3">
            <span>
              <MdHome className="h-6 w-6 mt-2 primary-text" />
            </span>
            <div className="relative w-full pb-2 mx-4">
              <h4 className="text-[14px] font-medium text-primary">
                ayaz@gmail.com
              </h4>
              <p className="text-[12px] text-gray-500 pt-2">Present Address</p>
              <div className="absolute bottom-0 left-0 right-0 border-b-2"></div>
            </div>
          </div>

          {/* Permanent Address */}
          <div className="flex mx-3 mt-3">
            <span className="h-6 w-6 mt-2"></span>
            <div className="relative w-full pb-2 mx-4">
              <h4 className="text-[14px] font-medium text-primary">
                Dalazak Road
              </h4>
              <p className="text-[12px] text-gray-500 pt-2">
                Permanent Address
              </p>
              <div className="absolute bottom-0 left-0 right-0 border-b-2"></div>
            </div>
          </div>

          {/* Official Signature */}
          <div className="flex mx-3 mt-3">
            <span className="h-6 w-6 mt-2"></span>
            <div className="relative w-full pb-2 mx-4">
              <h4 className="text-[14px] font-medium text-primary">
                Official Signature
              </h4>
              {edit ? (
                <div className="mt-2">
                  <span className="text-[12px] text-gray-500 pt-2">
                    Signature
                  </span>
                </div>
              ) : (
                <div className="mt-2">
                  <input
                  type="file"
                  ref={signatureInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handleSignatureChange}
                  />

                  {signature ? (
                    <div className="flex items-center gap-4">
                      <div className="relative group">
                        <img
                          src={signature}
                          alt="Signature Preview"
                          className="h-16 object-contain border border-gray-200 p-1 bg-white"
                        />
                        <button
                          onClick={triggerSignatureInput}
                          className="absolute -top-2 -right-2 bg-[#991B1E] p-1 rounded-full hover:bg-[#991B1E]/90 transition"
                        >
                          <MdEdit className="h-4 w-4 text-white" />
                        </button>
                      </div>
                      <span className="text-[12px] text-gray-500">
                        Signature uploaded
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={triggerSignatureInput}
                      className="flex items-center gap-2 text-[12px] text-gray-500 pt-2 hover:text-primary transition cursor-pointer"
                    >
                      <MdCloudUpload className="h-4 w-4" />
                      <span>Upload signature image</span>
                    </button>
                  )}
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 border-b-2"></div>
            </div>
          </div>
        </div>

        {/* Right Column - Vaccine Information */}
        <div className="lg:col-span-6 col-span-12">
          <h3 className="primary-text font-medium text-lg">
            Vaccine Certification Information
          </h3>
          <div className="border-b-2 pb-3 mt-5">
            <p className="text-black font-medium text-[14px]">
              Are you COVID-19 vaccinated?
            </p>
            {edit ? (
              <p className="text-gray-900 text-sm">No</p>
            ) : (
              <Select
                value={isVaccinated}
                onValueChange={(value) => {
                  setIsVaccinated(value);
                  if (value === "no") {
                    setVaccineCert(null);
                    vaccineFileRef.current = null;
                  }
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="No" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="yes">Yes</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>

          {!edit && isVaccinated === "yes" && (
            <>
              <div className="mt-2">
                <input
                  type="file"
                  ref={vaccineInputRef}
                  accept="image/*"
                  className="hidden"
                />

                {vaccineCert ? (
                  <div className="flex items-center gap-4 mt-2">
                    <div className="relative group">
                      <img
                        src={vaccineCert}
                        alt="Vaccine Certificate"
                        className="h-24 object-contain border border-gray-200 p-1 bg-white"
                      />
                      <button
                        onClick={triggerVaccineInput}
                        className="absolute -top-2 -right-2 bg-[#991B1E] p-1 rounded-full hover:bg-[#991B1E]/90 transition"
                      >
                        <MdEdit className="h-4 w-4 text-white" />
                      </button>
                    </div>
                    <span className="text-red-500 text-[13px]">
                      Certificate uploaded
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={triggerVaccineInput}
                    className="flex items-center gap-1 text-red-500 text-[13px] mt-1 hover:text-red-600 transition cursor-pointer"
                  >
                    <MdCloudUpload className="h-4 w-4" />
                    <span>Upload COVID-19 Certificate</span>
                  </button>
                )}
              </div>
            </>
          )}

          <div className="mt-10">
            <h3 className="text-[15px] primary-text font-medium">
              Get Vaccination Certificate (NADRA)
            </h3>
            <div className="text-[13px] text-gray-600 mt-2">
              <p>
                Note: Points for successful uploading of vaccination
                certificate.
              </p>
              <p>1) Bio data information must be completed.</p>
              <p>2) Certificate size must be less than 600 KB.</p>
            </div>
          </div>
        </div>
      </div>
      {!edit && (
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-6 py-2 rounded-md text-white ${
              loading ? 'bg-gray-400' : 'bg-[#991B1E] hover:bg-[#991B1E]/90'
            } transition`}
          >
            {loading ? 'Uploading...' : 'Submit'}
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileForm;