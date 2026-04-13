"use client";

import { useState, useEffect, useRef } from "react";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import {
  BookOpen,
  Plus,
  Pencil,
  Trash2,
  X,
  Upload,
  CheckCircle,
  XCircle,
  Loader2,
  Video,
  Clock,
  DollarSign,
  Image as ImageIcon,
} from "lucide-react";
import toast from "react-hot-toast";

interface Course {
  id: string;
  title: string;
  description: string;
  slug: string;
  price: number;
  currency: string;
  isActive: boolean;
  zoomClassesPerWeek: number;
  classDurationMinutes: number;
  zoomJoinLink: string | null;
  materialsUrl: string | null;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

const defaultForm = {
  title: "",
  description: "",
  slug: "",
  price: "",
  currency: "PKR",
  isActive: true,
  zoomClassesPerWeek: "3",
  classDurationMinutes: "45",
  zoomJoinLink: "",
  materialsUrl: "",
  imageUrl: "",
};

type CourseForm = typeof defaultForm;

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function formatPrice(price: number, currency: string) {
  return `${currency} ${price.toLocaleString()}`;
}

import { createCourseAction, updateCourseAction, deleteCourseAction } from "@/app/actions/admin-courses";

export default function CoursesAdminClient({ initialCourses }: { initialCourses: Course[] }) {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [form, setForm] = useState<CourseForm>(defaultForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [filter, setFilter] = useState<'available' | 'unavailable'>('available');
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCourses(initialCourses);
  }, [initialCourses]);

  // ─── Open Add Modal ──────────────────────────────────────────────
  function openAdd() {
    setEditingCourse(null);
    setForm(defaultForm);
    setShowModal(true);
  }

  // ─── Open Edit Modal ─────────────────────────────────────────────
  function openEdit(course: Course) {
    setEditingCourse(course);
    setForm({
      title: course.title,
      description: course.description,
      slug: course.slug,
      price: String(course.price),
      currency: course.currency,
      isActive: course.isActive,
      zoomClassesPerWeek: String(course.zoomClassesPerWeek),
      classDurationMinutes: String(course.classDurationMinutes),
      zoomJoinLink: course.zoomJoinLink || "",
      materialsUrl: course.materialsUrl || "",
      imageUrl: course.imageUrl || "",
    });
    setShowModal(true);
  }

  // ─── Auto-slug from title ────────────────────────────────────────
  function handleTitleChange(title: string) {
    setForm((prev) => ({
      ...prev,
      title,
      slug: !editingCourse ? slugify(title) : prev.slug,
    }));
  }

  // ─── Image Upload ────────────────────────────────────────────────
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setForm((prev) => ({ ...prev, imageUrl: data.url }));
      toast.success("Image uploaded!");
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  // ─── Save (Create / Update) ──────────────────────────────────────
  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        title: form.title,
        description: form.description,
        slug: form.slug,
        price: Number(form.price),
        currency: form.currency,
        isActive: form.isActive,
        zoomClassesPerWeek: Number(form.zoomClassesPerWeek),
        classDurationMinutes: Number(form.classDurationMinutes),
        zoomJoinLink: form.zoomJoinLink,
        materialsUrl: form.materialsUrl,
        imageUrl: form.imageUrl,
      };

      if (editingCourse) {
        await updateCourseAction(editingCourse.id, payload);
        toast.success("Course updated!");
      } else {
        await createCourseAction(payload);
        toast.success("Course created!");
      }

      setShowModal(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to save course");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    setDeleting(id);
    try {
      await deleteCourseAction(id);
      toast.success("Course deleted");
      setDeleteConfirm(null);
    } catch (err: any) {
      toast.error(err.message || "Failed to delete");
    } finally {
      setDeleting(null);
    }
  }

  // ─── Render ──────────────────────────────────────────────────────
  const displayedCourses = courses.filter((c) => filter === 'available' ? c.isActive : !c.isActive);

  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Header */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-green-600" />
                Manage Courses
              </h1>
              <p className="text-gray-500 mt-1">
                Add, edit, or remove courses for Oasis of Arabic.
              </p>
            </div>
            <button
              onClick={openAdd}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add New Course
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setFilter('available')}
              className={`px-6 py-2.5 rounded-xl font-semibold transition-colors ${
                filter === 'available'
                  ? 'bg-green-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-gray-200'
              }`}
            >
              Available Courses
            </button>
            <button
              onClick={() => setFilter('unavailable')}
              className={`px-6 py-2.5 rounded-xl font-semibold transition-colors ${
                filter === 'unavailable'
                  ? 'bg-gray-800 text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-gray-200'
              }`}
            >
              Unavailable Courses
            </button>
          </div>

          {/* Course Cards Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="w-10 h-10 text-green-600 animate-spin" />
              <span className="ml-3 text-gray-500 text-lg">Loading courses...</span>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-2xl border-2 border-dashed border-green-200">
              <BookOpen className="w-16 h-16 text-green-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No courses yet</h3>
              <p className="text-gray-400 mb-6">Click &ldquo;Add New Course&rdquo; to create your first course.</p>
              <button
                onClick={openAdd}
                className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Create First Course
              </button>
            </div>
          ) : displayedCourses.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No {filter} courses
              </h3>
              <p className="text-gray-400">
                You don't have any {filter} courses at the moment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {displayedCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group"
                >
                  {/* Image */}
                  <div className="relative h-44 bg-gradient-to-br from-green-100 to-emerald-50 overflow-hidden">
                    {course.imageUrl ? (
                      <img
                        src={course.imageUrl}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <ImageIcon className="w-12 h-12 text-green-300" />
                      </div>
                    )}
                    {/* Active badge */}
                    <div className="absolute top-3 left-3">
                      {course.isActive ? (
                        <span className="flex items-center gap-1 bg-green-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                          <CheckCircle className="w-3 h-3" />
                          Active
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 bg-gray-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                          <XCircle className="w-3 h-3" />
                          Inactive
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 text-lg leading-snug mb-1">{course.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-4">{course.description}</p>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-3 mb-5">
                      <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        {formatPrice(course.price, course.currency)}
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        <Video className="w-4 h-4 text-blue-500" />
                        {course.zoomClassesPerWeek}x/week
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        <Clock className="w-4 h-4 text-purple-500" />
                        {course.classDurationMinutes} min
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(course)}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-sm font-semibold transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(course.id)}
                        className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg text-sm font-semibold transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ─── Add / Edit Modal ─────────────────────────────────────── */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-8 bg-black/50 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-green-600" />
                  {editingCourse ? "Edit Course" : "Add New Course"}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSave} className="p-6 space-y-5">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Course Image
                  </label>
                  <div className="flex gap-4 items-start">
                    {form.imageUrl ? (
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-green-200 flex-shrink-0">
                        <img src={form.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setForm((p) => ({ ...p, imageUrl: "" }))}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center bg-gray-50 flex-shrink-0">
                        <ImageIcon className="w-8 h-8 text-gray-300" />
                      </div>
                    )}
                    <div className="flex-1">
                      <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        disabled={uploading}
                        className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                      >
                        {uploading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Upload className="w-4 h-4" />
                        )}
                        {uploading ? "Uploading..." : "Upload Image"}
                      </button>
                      <p className="text-xs text-gray-400 mt-1.5">JPEG, PNG, WebP — max 5MB</p>
                      <input
                        type="text"
                        placeholder="Or paste image path/URL"
                        value={form.imageUrl}
                        onChange={(e) => setForm((p) => ({ ...p, imageUrl: e.target.value }))}
                        className="mt-2 w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Course Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    required
                    placeholder="e.g. Quranic Arabic Foundations"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
                    required
                    placeholder="quranic-arabic-foundations"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm font-mono"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                    required
                    rows={4}
                    placeholder="Describe what students will learn in this course..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm resize-none"
                  />
                </div>

                {/* Price & Currency */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Price <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={form.price}
                      onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
                      required
                      placeholder="e.g. 5000"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Currency
                    </label>
                    <select
                      value={form.currency}
                      onChange={(e) => setForm((p) => ({ ...p, currency: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white"
                    >
                      <option value="PKR">PKR — Pakistani Rupee</option>
                      <option value="USD">USD — US Dollar</option>
                      <option value="GBP">GBP — British Pound</option>
                      <option value="EUR">EUR — Euro</option>
                      <option value="AED">AED — UAE Dirham</option>
                      <option value="SAR">SAR — Saudi Riyal</option>
                    </select>
                  </div>
                </div>

                {/* Zoom Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Classes per week
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="7"
                      value={form.zoomClassesPerWeek}
                      onChange={(e) => setForm((p) => ({ ...p, zoomClassesPerWeek: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Class duration (min)
                    </label>
                    <input
                      type="number"
                      min="15"
                      max="180"
                      step="15"
                      value={form.classDurationMinutes}
                      onChange={(e) => setForm((p) => ({ ...p, classDurationMinutes: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    />
                  </div>
                </div>

                {/* Zoom Link */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Zoom Join Link
                  </label>
                  <input
                    type="url"
                    value={form.zoomJoinLink}
                    onChange={(e) => setForm((p) => ({ ...p, zoomJoinLink: e.target.value }))}
                    placeholder="https://us05web.zoom.us/j/..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  />
                </div>

                {/* Materials URL */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Materials URL (optional)
                  </label>
                  <input
                    type="url"
                    value={form.materialsUrl}
                    onChange={(e) => setForm((p) => ({ ...p, materialsUrl: e.target.value }))}
                    placeholder="https://drive.google.com/..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  />
                </div>

                {/* Active Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-semibold text-gray-700 text-sm">Course Status</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Inactive courses are hidden from students
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, isActive: !p.isActive }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                      form.isActive ? "bg-green-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                        form.isActive ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : editingCourse ? (
                      "Save Changes"
                    ) : (
                      "Create Course"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ─── Delete Confirmation Modal ────────────────────────────── */}
        {deleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Course?</h3>
              <p className="text-gray-500 text-sm mb-6">
                This action cannot be undone. All enrollment links to this course will be removed.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  disabled={!!deleting}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  {deleting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminAuthGuard>
  );
}
