"use client";

import { UseFormRegister, FieldErrors, UseFormHandleSubmit, FormState } from "react-hook-form";
import { FormData } from "@/lib/schema";
import { inputClass } from "@/constants/styles";

type Props = {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  isSubmitting: boolean;
  handleSubmit: (onValid: (data: FormData) => void) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  onSubmit: (data: FormData) => void;
};

export default function OnboardingForm({ register, errors, isSubmitting, handleSubmit, onSubmit }: Props) {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      {/* Full name */}
      <div>
        <label>Full Name</label>
        <input {...register("fullName")} className={inputClass}/>
        {errors.fullName && <p className="text-red-800">{errors.fullName.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label>Email</label>
        <input {...register("email")} className={inputClass} />
        {errors.email && <p className="text-red-800">{errors.email.message}</p>}
      </div>

      {/* Company */}
      <div>
        <label>Company Name</label>
        <input {...register("companyName")} className={inputClass} />
        {errors.companyName && <p className="text-red-800">{errors.companyName.message}</p>}
      </div>

      {/* Services */}
      <div>
        <label>Services Interested In</label>
        <div className="space-y-1">
          {["UI/UX", "Branding", "Web Dev", "Mobile App"].map((service) => (
            <label key={service} className="flex items-center space-x-2 rounded-b-full">
              <input type="checkbox" value={service} {...register("services")} />
              <span>{service}</span>
            </label>
          ))}
        </div>
        {errors.services && <p className="text-red-800">{errors.services.message}</p>}
      </div>

      {/* Budget */}
      <div>
        <label>Budget (USD)</label>
        <input type="number" {...register("budget", { valueAsNumber: true })} className={inputClass} />
        {errors.budget && <p className="text-red-800">{errors.budget.message}</p>}
      </div>

      {/* Start date */}
      <div>
        <label>Project Start Date</label>
        <input type="date" {...register("startDate")} className={inputClass} />
        {errors.startDate && <p className="text-red-800">{errors.startDate.message}</p>}
      </div>

      {/* Terms */}
      <div>
        <label className="flex items-center space-x-2">
          <input type="checkbox" {...register("acceptTerms")} />
          <span>I accept the terms and conditions</span>
        </label>
        {errors.acceptTerms && <p className="text-red-800">{errors.acceptTerms.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-[#E67A9E] text-white px-4 py-2 rounded-3xl"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
