"use client";

import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useCreateEvent, useUpdateEvent } from "@/hooks/api/useEvents.js";
import useUploadImage from "@/hooks/utility/useUploadImage.js";
import { useCategories } from "@/hooks/api/useCategories.js";
import {
  Type,
  AlignLeft,
  ImageUp,
  MapPin,
  Building2,
  Globe,
  CalendarClock,
  DollarSign,
  Users,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  Layers,
  Save,
  PlusCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const inputClass =
  "w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all";

const formatLocalDateTime = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 16);
};

const toDateTimeLocal = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (isNaN(date)) return "";
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 16);
};

export default function EventForm({ mode = "create", initialData }) {
  const isEdit = mode === "edit";

  const { data } = useCategories();
  const { mutateAsync: createEvent } = useCreateEvent();
  const { mutateAsync: updateEvent } = useUpdateEvent();
  const { mutateAsync: uploadImage } = useUploadImage();

  const [uploadedPreview, setUploadedPreview] = useState(null);
  const preview = uploadedPreview ?? initialData?.imageUrl ?? null;

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
      imageUrl: initialData?.imageUrl ?? "",
      categoryId: initialData?.categoryId._id ?? "",
      city: initialData?.location?.city ?? "",
      address: initialData?.location?.address ?? "",
      country: initialData?.location?.country ?? "",
      startDateTime: toDateTimeLocal(initialData?.startDateTime),
      endDateTime: toDateTimeLocal(initialData?.endDateTime),
      price: initialData?.price ?? "",
      capacity: initialData?.capacity ?? "",
      status: initialData?.status ?? "published",
      currency: initialData?.currency ?? "USD",
    },

    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      imageUrl: Yup.string().required("Cover image is required"),
      categoryId: Yup.string().required("Category is required"),
      startDateTime: Yup.date()
        .required("Start date is required")
        .test("not-past", "Start date can't be in the past", function (value) {
          if (isEdit) return true;
          if (!value) return false;
          return new Date(value) >= new Date();
        }),
      endDateTime: Yup.date()
        .required("End date is required")
        .test(
          "is-after-start",
          "End date must be after start date",
          function (value) {
            const { startDateTime } = this.parent;
            if (!startDateTime || !value) return true;
            return new Date(value) > new Date(startDateTime);
          },
        ),
      price: Yup.number()
        .required("Price is required")
        .typeError("Price must be a number")
        .min(0, "Price can't be negative"),
      capacity: Yup.number()
        .typeError("Capacity must be a number")
        .required("Capacity is required")
        .min(1, "Minimum capacity is 1"),
      status: Yup.string()
        .required("Status is required")
        .oneOf(["published", "draft", "completed"]),
    }),

    onSubmit: async (values) => {
      try {
        const payload = {
          ...values,
          location: {
            city: values.city,
            address: values.address,
            country: values.country,
          },
        };
        if (mode === "create") {
          payload.availableSeats = values.capacity;
        }

        if (isEdit) {
          await updateEvent({ id: initialData._id, data: payload });
        } else {
          await createEvent(payload);
        }
      } catch (err) {
        console.error(err);
      }
    },
  });

  const handleImage = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;
      setUploadedPreview(URL.createObjectURL(file));
      const url = await uploadImage(file);
      formik.setFieldValue("imageUrl", url);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <Link href="/organizer-events" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>My Events</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-indigo-600 font-bold">{isEdit ? "Edit Event" : "Create Event"}</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
          {isEdit ? "Update Your " : "Publish New "}
          <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
            Event
          </span>
        </h1>
        <p className="text-xs font-medium text-slate-500">
          {isEdit
            ? "Modify the schedule, ticket prices, location, and details of your event."
            : "Fill in the details below to create and list your new event for attendees."}
        </p>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 space-y-8 shadow-sm"
      >
        {/* ── Basic Info ─────────────────────────────────────────── */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">Basic Information</h3>
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <Type className="w-4 h-4 text-indigo-500" />
              Event Title
            </label>
            <input
              name="title"
              placeholder="e.g. Annual International Tech Summit 2026"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              className={inputClass}
            />
            {formik.errors.title && formik.touched.title && (
              <p className="text-xs font-medium text-red-500">{formik.errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <AlignLeft className="w-4 h-4 text-indigo-500" />
              Description
            </label>
            <textarea
              name="description"
              placeholder="Provide a comprehensive summary of what attendees can expect..."
              rows={4}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              className={`${inputClass} resize-none`}
            />
            {formik.errors.description && formik.touched.description && (
              <p className="text-xs font-medium text-red-500">
                {formik.errors.description}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-500" />
              Category
            </label>
            <select
              name="categoryId"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.categoryId}
              className={inputClass}
            >
              <option value="">Select event category</option>
              {data?.categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            {formik.errors.categoryId && formik.touched.categoryId && (
              <p className="text-xs font-medium text-red-500">
                {formik.errors.categoryId}
              </p>
            )}
          </div>

          {/* Cover Image Upload */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <ImageUp className="w-4 h-4 text-indigo-500" />
              Cover Image
            </label>
            <input
              type="file"
              onChange={handleImage}
              className="w-full text-xs text-slate-500 file:mr-4 file:cursor-pointer file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 transition-all"
            />
            {formik.errors.imageUrl && formik.touched.imageUrl && (
              <p className="text-xs font-medium text-red-500">{formik.errors.imageUrl}</p>
            )}

            {preview && (
              <div className="relative w-full h-48 sm:h-64 rounded-2xl overflow-hidden border border-slate-200 mt-3 bg-slate-100">
                <Image
                  src={preview}
                  alt="Event Cover Preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* ── Location ───────────────────────────────────────────── */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <MapPin className="w-4 h-4 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">Event Location</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* City */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-pink-500" />
                City
              </label>
              <input
                name="city"
                placeholder="e.g. Cairo"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                className={inputClass}
              />
            </div>

            {/* Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-pink-500" />
                Venue / Address
              </label>
              <input
                name="address"
                placeholder="e.g. Nasr City Convention Center"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                className={inputClass}
              />
            </div>

            {/* Country */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-pink-500" />
                Country
              </label>
              <input
                name="country"
                placeholder="e.g. Egypt"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.country}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* ── Date & Time ────────────────────────────────────────── */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <CalendarClock className="w-4 h-4 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">Date & Schedule</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Start */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <CalendarClock className="w-4 h-4 text-violet-500" />
                Start Date & Time
              </label>
              <input
                type="datetime-local"
                name="startDateTime"
                min={isEdit ? undefined : formatLocalDateTime()}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.startDateTime}
                className={inputClass}
              />
              {formik.errors.startDateTime && formik.touched.startDateTime && (
                <p className="text-xs font-medium text-red-500">
                  {formik.errors.startDateTime}
                </p>
              )}
            </div>

            {/* End */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <CalendarClock className="w-4 h-4 text-violet-500" />
                End Date & Time
              </label>
              <input
                type="datetime-local"
                name="endDateTime"
                min={
                  formik.values.startDateTime ||
                  (isEdit ? undefined : formatLocalDateTime())
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.endDateTime}
                className={inputClass}
              />
              {formik.errors.endDateTime && formik.touched.endDateTime && (
                <p className="text-xs font-medium text-red-500">
                  {formik.errors.endDateTime}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ── Tickets & Capacity ──────────────────────────────────── */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <DollarSign className="w-4 h-4 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">Tickets & Capacity</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Price */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                Ticket Price (USD)
              </label>
              <input
                name="price"
                type="number"
                min={0}
                placeholder="0 for Free event"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
                className={inputClass}
              />
              {formik.errors.price && formik.touched.price && (
                <p className="text-xs font-medium text-red-500">{formik.errors.price}</p>
              )}
            </div>

            {/* Capacity */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-600" />
                Total Ticket Capacity
              </label>
              <input
                name="capacity"
                type="number"
                min={1}
                placeholder="e.g. 500"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.capacity}
                className={inputClass}
              />
              {formik.errors.capacity && formik.touched.capacity && (
                <p className="text-xs font-medium text-red-500">
                  {formik.errors.capacity}
                </p>
              )}
            </div>
          </div>

          {mode === "edit" && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Type className="w-4 h-4 text-slate-500" />
                Publication Status
              </label>
              <select
                name="status"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.status}
                className={inputClass}
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="completed">Completed</option>
              </select>
              {formik.errors.status && formik.touched.status && (
                <p className="text-xs font-medium text-red-500">
                  {formik.errors.status}
                </p>
              )}
            </div>
          )}
        </div>

        {/* ── Submit Button ───────────────────────────────────────── */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-indigo-500/25 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isEdit ? <Save className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
            <span>
              {formik.isSubmitting
                ? isEdit
                  ? "Saving Changes..."
                  : "Creating Event..."
                : isEdit
                  ? "Save Changes"
                  : "Publish Event"}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
