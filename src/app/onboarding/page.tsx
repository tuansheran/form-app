"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { schema, FormData } from "@/lib/schema";
import OnboardingForm from "../../components/OnboardingForm";

export default function OnboardingPage() {
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_ONBOARD_URL || 'https://postman-echo.com/post', {
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
      <OnboardingForm
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      />
      {serverMessage && (
        <p className={`mt-4 ${serverMessage.includes("Error") ? "text-red-800" : "text-green-600"}`}>
          {serverMessage}
        </p>
      )}
    </div>
  );
}

