function LeadFormPanel({
  isDarkMode,
  isSavingLead,
  leadForm,
  salespersonOptions,
  onInputChange,
  onReset,
  onSubmit,
  selectedLead,
  sourceOptions,
  statusOptions,
}) {
  const inputClassName =
    `w-full rounded-2xl border px-3.5 py-3 outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20 ${
      isDarkMode
        ? "border-white/10 bg-[#0f1c17] text-slate-100"
        : "border-[#034620]/10 bg-white text-[#111827]"
    }`;
  const labelClassName = `grid gap-2 font-semibold ${isDarkMode ? "text-slate-100" : "text-[#111827]"}`;

  return (
    <section className={`rounded-[30px] border p-6 shadow-[0_20px_60px_rgba(3,70,32,0.08)] backdrop-blur-[14px] xl:sticky xl:top-6 ${isDarkMode ? "border-white/10 bg-[#091410]/95" : "border-[#034620]/10 bg-white/95"}`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className={`mb-3 text-[0.72rem] uppercase tracking-[0.18em] ${isDarkMode ? "text-[#10B981]/75" : "text-[#034620]/65"}`}>
            {selectedLead ? "Update" : "Create"}
          </p>
          <h2 className={`text-[1.85rem] font-semibold tracking-[-0.03em] ${isDarkMode ? "text-white" : "text-[#111827]"}`}>
            {selectedLead ? "Edit lead" : "Add a new lead"}
          </h2>
        </div>
      </div>

      <form className="mt-5 grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
        <label className={labelClassName}>
          Lead name
          <input
            className={inputClassName}
            name="leadName"
            value={leadForm.leadName}
            onChange={onInputChange}
            required
          />
        </label>

        <label className={labelClassName}>
          Company name
          <input
            className={inputClassName}
            name="companyName"
            value={leadForm.companyName}
            onChange={onInputChange}
            required
          />
        </label>

        <label className={labelClassName}>
          Email
          <input
            className={inputClassName}
            name="email"
            type="email"
            value={leadForm.email}
            onChange={onInputChange}
            required
          />
        </label>

        <label className={labelClassName}>
          Phone number
          <input
            className={inputClassName}
            name="phoneNumber"
            value={leadForm.phoneNumber}
            onChange={onInputChange}
            required
          />
        </label>

        <label className={labelClassName}>
          Lead source
          <select
            className={inputClassName}
            name="leadSource"
            value={leadForm.leadSource}
            onChange={onInputChange}
          >
            {sourceOptions.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </label>

        <label className={labelClassName}>
          Assigned salesperson
          <select
            className={inputClassName}
            name="assignedSalesperson"
            value={leadForm.assignedSalesperson}
            onChange={onInputChange}
          >
            {salespersonOptions.map((salesperson) => (
              <option key={salesperson} value={salesperson}>
                {salesperson}
              </option>
            ))}
          </select>
        </label>

        <label className={labelClassName}>
          Status
          <select
            className={inputClassName}
            name="status"
            value={leadForm.status}
            onChange={onInputChange}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label className={labelClassName}>
          Estimated deal value
          <input
            className={inputClassName}
            name="estimatedDealValue"
            type="number"
            min="0"
            value={leadForm.estimatedDealValue}
            onChange={onInputChange}
            required
          />
        </label>

        <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row sm:justify-between">
          <button
            type="submit"
            className="rounded-2xl bg-[#10B981] px-[18px] py-3 font-medium text-white shadow-[0_14px_28px_rgba(16,185,129,0.28)] transition hover:-translate-y-0.5 hover:bg-[#0ea371] disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isSavingLead}
          >
            {isSavingLead
              ? "Saving..."
              : selectedLead
                ? "Update lead"
                : "Create lead"}
          </button>
          <button
            type="button"
            className={`rounded-2xl border px-[18px] py-3 transition hover:-translate-y-0.5 ${isDarkMode ? "border-white/10 text-slate-300 hover:bg-white/6" : "border-[#034620]/12 text-[#034620]"}`}
            onClick={onReset}
          >
            Clear form
          </button>
        </div>
      </form>
    </section>
  );
}

export default LeadFormPanel;
