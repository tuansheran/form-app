"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { inputClass } from "@/constants/styles";



const schema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Full name must be less than 80 characters")
    .regex(/^[A-Za-z\s'-]+$/, "Only letters, spaces, apostrophes, and hyphens allowed"),
  email: z.string().email("Invalid email"),
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters"),
  services: z
    .array(z.enum(["UI/UX", "Branding", "Web Dev", "Mobile App"]))
    .min(1, "Select at least one service"),
  budget: z
    .number()
    .int("Must be an integer")
    .min(100, "Minimum budget is 100")
    .max(1_000_000, "Maximum budget is 1,000,000")
    .optional()
    .or(z.literal(NaN)), // allows empty
  startDate: z.string().refine(
    (date) => {
      const today = new Date();
      const selected = new Date(date);
      return selected >= new Date(today.toDateString());
    },
    { message: "Start date must be today or later" }
  ),
  acceptTerms: z.literal(true, {message: 'You Must Accept Terms'})
});

type FormData = z.infer<typeof schema>;

export default function OnboardingPage() {
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_ONBOARD_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed request");
      setServerMessage("Client successfully onboarded!");
      reset();
    } catch {
      setServerMessage("Error submitting form. Try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-6xl font-bold mb-4">Client Onboarding</h1>
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
          <input
            type="number"
            {...register("budget", { valueAsNumber: true })}
            className={inputClass}
          />
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

      {serverMessage && (
        <p className={`mt-4 ${serverMessage.includes("Error") ? "text-red-800" : "text-green-600"}`}>
          {serverMessage}
        </p>
      )}
    </div>
  );
}
