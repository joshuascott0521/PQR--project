import { useState } from "react";
import { FloatingLabel } from "./FloatingLabel";

export default function StepForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    contact: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep = () => {
    if (step === 0 && !formData.name.trim()) return false;
    if (step === 1 && !formData.email.trim()) return false;
    if (step === 2 && (!formData.phone.trim() || !formData.contact)) return false;
    return true;
  };

  const handleNext = () => {
    if (validateStep()) setStep((prev) => prev + 1);
    else alert("Please complete all required fields.");
  };

  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return alert("Complete the form before submitting.");
    alert("Form submitted successfully!");
    console.log(formData);
    setStep(0);
    setFormData({ name: "", email: "", phone: "", contact: "" });
  };

  return (
    <div className="w-full h-screen flex justify-start items-center pl-[112px] ">
      <div className="w-[700px]">
        <div className="bg-white/70  rounded-2xl shadow-lg w-full p-10 border border-gray-100">
          {/* Step Indicators */}
          <div className="relative flex justify-between mb-6">
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-300 z-0" />
            {["STEP 1", "STEP 2", "STEP 3"].map((label, index) => (
              <div key={index} className="flex-1 flex flex-col items-center relative z-10">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 ${
                    index < step
                      ? "bg-green-600 text-white border-green-600"
                      : index === step
                      ? "bg-white text-green-600 border-green-600"
                      : "bg-gray-200 text-gray-500 border-gray-300"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="mt-2 text-sm font-medium text-gray-700">{label}</span>
              </div>
            ))}
          </div>

          {/* Form Steps */}
          <form onSubmit={handleSubmit} className="space-y-4 text-gray-700 text-sm">
            {step === 0 && (
              <div>
                <h2 className="text-md font-semibold mb-4 text-center">Datos del cliente</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FloatingLabel id="documento" label="Documento" />
                  <FloatingLabel
                    id="nombresYApellidos"
                    label="Nombres y Apellidos"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <FloatingLabel id="tipoCliente" label="Tipo Cliente" />
                  <FloatingLabel id="email" label="Email" />
                  <FloatingLabel id="celular" label="Celular" />
                  <FloatingLabel id="direccion" label="Dirección" />
                  <FloatingLabel id="departamento" label="Departamento" />
                  <FloatingLabel id="Municipio" label="Municipio" />
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <label htmlFor="email" className="relative block">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder=" "
                    required
                    className="peer w-full border border-gray-300 rounded px-3 pt-5 pb-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                  <span className="absolute left-3 top-2 text-xs text-gray-500 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 transition-all">
                    Your Email (required)
                  </span>
                </label>
                <div className="mt-6 flex justify-between">
                  <button
                    onClick={handleBack}
                    type="button"
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <label htmlFor="phone" className="relative block">
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder=" "
                    required
                    className="peer w-full border border-gray-300 rounded px-3 pt-5 pb-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                  <span className="absolute left-3 top-2 text-xs text-gray-500 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 transition-all">
                    Your Phone (required)
                  </span>
                </label>

                <fieldset className="mt-6">
                  <legend className="mb-3 font-medium text-sm text-gray-700">Preferred Method of Contact</legend>
                  <div className="flex space-x-6">
                    <label className="flex items-center space-x-2 text-sm">
                      <input
                        type="radio"
                        name="contact"
                        value="email"
                        checked={formData.contact === "email"}
                        onChange={handleChange}
                        className="accent-green-600"
                        required
                      />
                      <span>Email</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm">
                      <input
                        type="radio"
                        name="contact"
                        value="phone"
                        checked={formData.contact === "phone"}
                        onChange={handleChange}
                        className="accent-green-600"
                        required
                      />
                      <span>Phone</span>
                    </label>
                  </div>
                </fieldset>

                <div className="mt-6 flex justify-between">
                  <button
                    onClick={handleBack}
                    type="button"
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
