'use client';

import { useState } from 'react';

export default function CertificateForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    email: '',
    profilePhoto: null as File | null,
    universityName: '',
    degreeName: '',
    fieldOfStudy: '',
    honors: '',
    graduationYear: '',
    issueDate: '',
    duration: '',
    cgpa: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === 'profilePhoto' && files) {
      setFormData({ ...formData, profilePhoto: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = new FormData();

    for (const key in formData) {
      const value = (formData as any)[key];
      if (value) {
        payload.append(key, value);
      }
    }

    const res = await fetch('/api/submit-form', {
      method: 'POST',
      body: payload,
    });

    if (res.ok) {
      alert('Form submitted successfully!');
    } else {
      alert('Failed to submit form.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Student Certificate Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="fullName" label="Full Name" value={formData.fullName} onChange={handleChange} />
        <Input name="studentId" label="Student ID" value={formData.studentId} onChange={handleChange} />
        <Input name="email" label="Email" type="email" value={formData.email} onChange={handleChange} />
        <Input name="universityName" label="University Name" value={formData.universityName} onChange={handleChange} />
        <Input name="degreeName" label="Degree Name" value={formData.degreeName} onChange={handleChange} />
        <Input name="fieldOfStudy" label="Field of Study" value={formData.fieldOfStudy} onChange={handleChange} />
        <Input name="honors" label="Honors" value={formData.honors} onChange={handleChange} />
        <Input name="graduationYear" label="Graduation Year" value={formData.graduationYear} onChange={handleChange} />
        <Input name="issueDate" label="Issue Date" type="date" value={formData.issueDate} onChange={handleChange} />
        <Input name="duration" label="Duration" value={formData.duration} onChange={handleChange} />
        <Input name="cgpa" label="CGPA" value={formData.cgpa} onChange={handleChange} />

        <div>
          <label className="block mb-1 font-medium">Profile Photo</label>
          <input type="file" name="profilePhoto" accept="image/*" onChange={handleChange} required />
          {formData.profilePhoto && (
            <p className="text-sm mt-1 text-gray-600">Selected: {formData.profilePhoto.name}</p>
          )}
        </div>

        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Submit
        </button>
      </form>
    </div>
  );
}

function Input({
  name,
  label,
  value,
  onChange,
  type = 'text',
}: {
  name: string;
  label: string;
  value: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label htmlFor={name} className="block mb-1 font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 px-3 py-2 rounded"
        required
      />
    </div>
  );
}
