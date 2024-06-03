import PageTitle from "@/app/dashboard/_components/page_title";

export default function AppForm() {
  return (
    <div className="w-full">
      <PageTitle title="Page" />

      <form>
        <div className="space-y-4">
          <div>
            <label className="font-semibold">Name *</label>
            <input
              placeholder="Name"
              required
              disabled={false}
              name="name"
              type="text"
              className="mt-1 default-input"
            />
          </div>

          <div>
            <label className="font-semibold">Domain *</label>
            <input
              placeholder="Domain"
              required
              disabled={false}
              name="domain"
              type="text"
              className="mt-1 default-input"
            />
          </div>
        </div>
        <button
          className="btn-black mt-8"
          // disabled={isLoading}
          type="submit"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
