import React, { useState } from "react";

// Define the schema interface
interface Field {
  id: string;
  type: string;
  label: string;
  required: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: {
    pattern: string;
    message: string;
  };
}

interface FormSchema {
  formTitle: string;
  formDescription: string;
  fields: Field[];
}

const schema: FormSchema = {
  formTitle: "Project Requirements Survey",
  formDescription: "Please fill out this survey about your project needs",
  fields: [
    {
      id: "name",
      type: "text",
      label: "Full Name",
      required: true,
      placeholder: "Enter your full name",
    },
    {
      id: "email",
      type: "email",
      label: "Email Address",
      required: true,
      placeholder: "you@example.com",
      validation: {
        pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        message: "Please enter a valid email address",
      },
    },
    {
      id: "companySize",
      type: "select",
      label: "Company Size",
      required: true,
      options: [
        { value: "1-50", label: "1-50 employees" },
        { value: "51-200", label: "51-200 employees" },
        { value: "201-1000", label: "201-1000 employees" },
        { value: "1000+", label: "1000+ employees" },
      ],
    },
    {
      id: "industry",
      type: "radio",
      label: "Industry",
      required: true,
      options: [
        { value: "tech", label: "Technology" },
        { value: "healthcare", label: "Healthcare" },
        { value: "finance", label: "Finance" },
        { value: "retail", label: "Retail" },
        { value: "other", label: "Other" },
      ],
    },
    {
      id: "timeline",
      type: "select",
      label: "Project Timeline",
      required: true,
      options: [
        { value: "immediate", label: "Immediate (within 1 month)" },
        { value: "short", label: "Short-term (1-3 months)" },
        { value: "medium", label: "Medium-term (3-6 months)" },
        { value: "long", label: "Long-term (6+ months)" },
      ],
    },
    {
      id: "comments",
      type: "textarea",
      label: "Additional Comments",
      required: false,
      placeholder: "Any other details you'd like to share...",
    },
  ],
};

const App: React.FC = () => {
  const [formData, setFormData] = useState<any>({});
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Form Submitted Successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">{schema.formTitle}</h1>
        <p className="text-gray-700 mb-6">{schema.formDescription}</p>
        <form onSubmit={handleSubmit}>
          {schema.fields.map((field) => {
            if (field.type === "text" || field.type === "email" || field.type === "textarea") {
              return (
                <div key={field.id} className="mb-4">
                  <label htmlFor={field.id} className="block text-gray-700">{field.label}</label>
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.id}
                    value={formData[field.id] || ""}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="mt-1 p-2 border rounded w-full"
                  />
                  {field.validation && !new RegExp(field.validation.pattern).test(formData[field.id]) && (
                    <p className="text-red-500 text-xs">{field.validation.message}</p>
                  )}
                </div>
              );
            }
            if (field.type === "select") {
              return (
                <div key={field.id} className="mb-4">
                  <label htmlFor={field.id} className="block text-gray-700">{field.label}</label>
                  <select
                    id={field.id}
                    name={field.id}
                    value={formData[field.id] || ""}
                    onChange={handleChange}
                    required={field.required}
                    className="mt-1 p-2 border rounded w-full"
                  >
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }
            if (field.type === "radio") {
              return (
                <div key={field.id} className="mb-4">
                  <label className="block text-gray-700">{field.label}</label>
                  {field.options?.map((option) => (
                    <div key={option.value} className="flex items-center mb-2">
                      <input
                        type="radio"
                        id={option.value}
                        name={field.id}
                        value={option.value}
                        checked={formData[field.id] === option.value}
                        onChange={handleChange}
                        required={field.required}
                        className="mr-2"
                      />
                      <label htmlFor={option.value} className="text-gray-700">{option.label}</label>
                    </div>
                  ))}
                </div>
              );
            }
            return null;
          })}
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
        </form>
        {submitMessage && (
          <p className="mt-4 text-green-500 font-bold">{submitMessage}</p>
        )}
      </div>
    </div>
  );
};

export default App;
