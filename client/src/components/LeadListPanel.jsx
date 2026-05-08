import { formatCurrency } from "../utils/formatters";
import { slugify } from "../utils/leadHelpers";

function LeadListPanel({
  filteredLeads,
  filters,
  isDarkMode,
  isLoadingData,
  onDeleteLead,
  onEditLead,
  onFilterChange,
  onMarkQualified,
  onSearchChange,
  onSelectLead,
  onStartNewLead,
  salespersonOptions,
  searchTerm,
  selectedCurrency,
  selectedLeadId,
  sourceOptions,
  statusOptions,
}) {
  const inputClassName =
    `w-full rounded-2xl border px-3.5 py-3 outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20 ${
      isDarkMode
        ? "border-white/10 bg-[#0f1c17] text-slate-100"
        : "border-[#034620]/10 bg-white text-[#111827]"
    }`;
  const isQualifiedMilestone = (lead) =>
    lead.hasBeenQualified || lead.status === "Qualified";

  return (
    <div className={`rounded-[30px] border p-6 shadow-[0_20px_60px_rgba(3,70,32,0.08)] backdrop-blur-[14px] xl:flex xl:max-h-[calc(100vh-11rem)] xl:flex-col ${isDarkMode ? "border-white/10 bg-[#091410]/95" : "border-[#034620]/10 bg-white/95"}`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className={`mb-3 text-[0.72rem] uppercase tracking-[0.18em] ${isDarkMode ? "text-[#10B981]/75" : "text-[#034620]/65"}`}>
            Pipeline
          </p>
          <h2 className={`text-[1.85rem] font-semibold tracking-[-0.03em] ${isDarkMode ? "text-white" : "text-[#111827]"}`}>
            Lead list
          </h2>
        </div>
        <button
          type="button"
          className="rounded-2xl bg-[#10B981] px-4 py-3 font-medium text-white shadow-[0_14px_24px_rgba(16,185,129,0.28)] transition hover:-translate-y-0.5 hover:bg-[#0ea371]"
          onClick={onStartNewLead}
        >
          Add new lead
        </button>
      </div>

      <div className="my-5 grid gap-3 md:grid-cols-2">
        <input
          className={inputClassName}
          type="search"
          placeholder="Search by name, company, or email"
          value={searchTerm}
          onChange={onSearchChange}
        />

        <select
          className={inputClassName}
          name="status"
          value={filters.status}
          onChange={onFilterChange}
        >
          <option value="All">All statuses</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <select
          className={inputClassName}
          name="leadSource"
          value={filters.leadSource}
          onChange={onFilterChange}
        >
          <option value="All">All sources</option>
          {sourceOptions.map((source) => (
            <option key={source} value={source}>
              {source}
            </option>
          ))}
        </select>

        <select
          className={inputClassName}
          name="assignedSalesperson"
          value={filters.assignedSalesperson}
          onChange={onFilterChange}
        >
          {salespersonOptions.map((salesperson) => (
            <option key={salesperson} value={salesperson}>
              {salesperson === "All" ? "All owners" : salesperson}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-3.5 xl:min-h-0 xl:flex-1 xl:overflow-y-auto xl:pr-1">
        {isLoadingData ? (
          <p className={`rounded-2xl px-4 py-3.5 ${isDarkMode ? "bg-white/5 text-slate-300" : "bg-[#034620]/[0.04] text-[#034620]/70"}`}>
            Loading leads...
          </p>
        ) : null}

        {!isLoadingData && filteredLeads.length === 0 ? (
          <p className={`rounded-2xl px-4 py-3.5 ${isDarkMode ? "bg-white/5 text-slate-300" : "bg-[#034620]/[0.04] text-[#034620]/70"}`}>
            No leads match the current filters yet.
          </p>
        ) : null}

        {filteredLeads.map((lead) => (
          <article
            key={lead._id}
            className={`rounded-[22px] border ${
              selectedLeadId === lead._id
                ? `${isDarkMode ? "bg-[#0f1c17] border-[#10B981]/80" : "bg-white border-[#10B981]"} shadow-[0_18px_40px_rgba(3,70,32,0.10)]`
                : `${isDarkMode ? "bg-[#0c1713] border-white/10" : "bg-white border-[#034620]/10"}`
            }`}
          >
            <button
              type="button"
              className="w-full cursor-pointer border-0 bg-transparent p-[18px] text-left"
              onClick={() => onSelectLead(lead._id)}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className={`mb-1 text-[1.08rem] font-semibold ${isDarkMode ? "text-white" : "text-[#111827]"}`}>
                    {lead.leadName}
                  </h3>
                  <p className={isDarkMode ? "text-slate-400" : "text-[#034620]/70"}>{lead.companyName}</p>
                </div>
                <span
                  className={`inline-flex rounded-full px-3 py-1.5 text-sm font-bold ${getStatusClassName(
                    lead.status
                  )}`}
                >
                  {lead.status}
                </span>
              </div>

              <dl className="mt-4 grid gap-3 md:grid-cols-3">
                <div>
                  <dt className={`text-sm ${isDarkMode ? "text-slate-400" : "text-[#034620]/70"}`}>Source</dt>
                  <dd className={`mt-1 ${isDarkMode ? "text-slate-100" : "text-[#111827]"}`}>{lead.leadSource}</dd>
                </div>
                <div>
                  <dt className={`text-sm ${isDarkMode ? "text-slate-400" : "text-[#034620]/70"}`}>Owner</dt>
                  <dd className={`mt-1 ${isDarkMode ? "text-slate-100" : "text-[#111827]"}`}>
                    {lead.assignedSalesperson}
                  </dd>
                </div>
                <div>
                  <dt className={`text-sm ${isDarkMode ? "text-slate-400" : "text-[#034620]/70"}`}>Value</dt>
                  <dd className={`mt-1 ${isDarkMode ? "text-slate-100" : "text-[#111827]"}`}>
                    {formatCurrency(lead.estimatedDealValue, selectedCurrency)}
                  </dd>
                </div>
              </dl>
            </button>

            <div className={`border-t px-[18px] py-4 ${isDarkMode ? "border-white/10" : "border-[#034620]/10"}`}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {isQualifiedMilestone(lead) ? (
                  <span className="inline-flex items-center justify-center rounded-xl bg-[#10B981] px-4 py-2.5 text-sm font-medium text-white shadow-[0_12px_24px_rgba(16,185,129,0.24)] sm:min-w-[148px]">
                    Qualified
                  </span>
                ) : (
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-xl border border-[#10B981]/25 bg-[#10B981]/10 px-4 py-2.5 text-sm font-medium text-[#034620] transition hover:-translate-y-0.5 hover:bg-[#10B981] hover:text-white sm:min-w-[148px]"
                    onClick={() => onMarkQualified(lead)}
                  >
                    Mark qualified
                  </button>
                )}

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#10B981]/20 bg-[#10B981]/10 text-[#10B981] transition hover:-translate-y-0.5 hover:bg-[#10B981] hover:text-white"
                    onClick={() => onEditLead(lead)}
                    aria-label={`Edit ${lead.leadName}`}
                    title="Edit lead"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-4.5 w-4.5 fill-none stroke-current stroke-[1.8]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 20h4l10.5-10.5a2.12 2.12 0 0 0-3-3L5 17v3Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m13.5 6 4.5 4.5"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-600 transition hover:-translate-y-0.5 hover:bg-red-600 hover:text-white"
                    onClick={() => onDeleteLead(lead._id)}
                    aria-label={`Delete ${lead.leadName}`}
                    title="Delete lead"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-4.5 w-4.5 fill-none stroke-current stroke-[1.8]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 7h16"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function getStatusClassName(status) {
  const slug = slugify(status);

  if (slug === "new") return "bg-[#10B981]/10 text-[#034620]";
  if (slug === "contacted") return "bg-[#034620]/10 text-[#034620]";
  if (slug === "qualified") return "bg-[#10B981]/15 text-[#034620]";
  if (slug === "proposal-sent") return "bg-[#034620]/12 text-[#034620]";
  if (slug === "won") return "bg-[#10B981]/20 text-[#034620]";
  if (slug === "lost") return "bg-red-100 text-red-800";

  return "bg-[#034620]/8 text-[#034620]";
}

export default LeadListPanel;
