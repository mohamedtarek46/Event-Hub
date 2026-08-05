import { useFormik } from "formik";
import * as Yup from "yup";
import { useUpdateMe } from "@/hooks/api/useUsers.js";
import { User, Save } from "lucide-react";

export default function ProfileForm({ user }) {
  const { mutateAsync: updateMe, isPending } = useUpdateMe();
  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
    },

    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(2, "Too short")
        .max(20, "Too long")
        .required("First name is required"),

      lastName: Yup.string()
        .min(2, "Too short")
        .max(20, "Too long")
        .required("Last name is required"),
    }),

    onSubmit: async (values) => {
      try {
        await updateMe(values);
        formik.resetForm({
          values, 
        });
      } catch (err) {
        console.log(err);
      }
    },
    enableReinitialize: true,
  });

  return (
    <div className="mt-6 p-6 md:p-8 rounded-3xl bg-white border border-slate-100 shadow-sm max-w-xl">
      <div className="flex items-center gap-2 mb-6">
        <User className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-bold text-slate-900">Personal Details</h2>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-5">
        {/* First Name */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            First Name
          </label>
          <input
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-3 text-sm text-slate-900 font-medium outline-none transition-all"
            placeholder="Enter first name"
          />

          {formik.touched.firstName && formik.errors.firstName && (
            <p className="text-red-500 text-xs mt-1.5 font-medium">{formik.errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            Last Name
          </label>
          <input
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-3 text-sm text-slate-900 font-medium outline-none transition-all"
            placeholder="Enter last name"
          />

          {formik.touched.lastName && formik.errors.lastName && (
            <p className="text-red-500 text-xs mt-1.5 font-medium">{formik.errors.lastName}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!formik.isValid || isPending}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white font-bold px-6 py-3 rounded-xl shadow-md shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer text-sm"
        >
          <Save className="w-4 h-4" />
          <span>{isPending ? "Saving..." : "Save Changes"}</span>
        </button>
      </form>
    </div>
  );
}
