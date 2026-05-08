import { useState } from "react";
import LeadFormPanel from "../components/LeadFormPanel";
import LeadListPanel from "../components/LeadListPanel";
import NotesPanel from "../components/NotesPanel";
import StatCard from "../components/StatCard";
import { formatCurrency } from "../utils/formatters";

function CrmPage({
  crmError,
  crmMessage,
  currencyOptions,
  dashboard,
  editingLead,
  editingNoteId,
  filteredLeads,
  filters,
  isDarkMode,
  isLoadingData,
  isLoadingNotes,
  isSavingLead,
  isSavingNote,
  leadForm,
  noteContent,
  notes,
  onDeleteLead,
  onEditLead,
  onFilterChange,
  onMarkQualified,
  onLeadInputChange,
  onLogout,
  onCancelNoteEdit,
  onCurrencyChange,
  onDeleteNote,
  onDismissToast,
  onEditNote,
  onNoteChange,
  onSearchChange,
  onSelectLead,
  onStartNewLead,
  onSubmitLead,
  onSubmitNote,
  onToggleTheme,
  onTogglePinnedNote,
  salespersonFilterOptions,
  salespersonOptions,
  searchTerm,
  selectedLead,
  selectedLeadId,
  selectedCurrency,
  sourceOptions,
  statusOptions,
  user,
}) {
  const [activeView, setActiveView] = useState("dashboard");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const focusLeads = filteredLeads.slice(0, 5);
  const userInitials = getInitials(user?.name || "CRM User");
  const firstName = user?.name?.split(" ")?.[0] || "Workspace";

  return (
    <main className="relative mx-auto w-[min(1320px,calc(100%-32px))] px-0 py-6 max-md:w-[min(100%,calc(100%-20px))]">
      <header className={`mb-6 rounded-[26px] border px-5 py-4 shadow-[0_10px_30px_rgba(3,70,32,0.06)] backdrop-blur-xl ${isDarkMode ? "border-white/10 bg-[#091410]/90" : "border-[#034620]/10 bg-white/90"}`}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#034620] text-sm font-semibold tracking-[0.16em] text-white">
              LF
            </div>
            <div>
              <p className={`text-xs uppercase tracking-[0.18em] ${isDarkMode ? "text-[#10B981]/75" : "text-[#034620]/65"}`}>
                LeadFlow CRM
              </p>
              <p className={`mt-1 text-lg font-semibold ${isDarkMode ? "text-white" : "text-[#111827]"}`}>
                Revenue workspace
              </p>
            </div>
          </div>

          <nav className={`flex flex-wrap items-center gap-2 rounded-[20px] p-1.5 ring-1 ${isDarkMode ? "bg-[#10B981]/10 ring-[#10B981]/16" : "bg-[#10B981]/12 ring-[#10B981]/18"}`}>
            <NavButton
              active={activeView === "dashboard"}
              isDarkMode={isDarkMode}
              label="Dashboard"
              onClick={() => setActiveView("dashboard")}
            />
            <NavButton
              active={activeView === "leads"}
              isDarkMode={isDarkMode}
              label="Leads"
              onClick={() => setActiveView("leads")}
            />
            <NavButton
              active={activeView === "notes"}
              isDarkMode={isDarkMode}
              label="Notes"
              onClick={() => setActiveView("notes")}
            />
          </nav>

          <div className="flex items-center justify-end">
            <button
              type="button"
              className={`inline-flex items-center gap-3 rounded-[20px] border px-3.5 py-2.5 text-left transition hover:-translate-y-0.5 ${isDarkMode ? "border-white/10 bg-white/5 text-slate-100 hover:bg-white/8" : "border-[#034620]/10 bg-white text-[#111827]"}`}
              onClick={() => setIsProfileMenuOpen((current) => !current)}
              aria-label="Open workspace settings"
              aria-expanded={isProfileMenuOpen}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#034620] text-sm font-semibold tracking-[0.12em] text-white">
                {userInitials}
              </span>
              <span className="hidden sm:block">
                <span className={`block text-sm font-medium ${isDarkMode ? "text-white" : "text-[#111827]"}`}>
                  {firstName}
                </span>
                <span className={`block text-xs ${isDarkMode ? "text-slate-400" : "text-[#034620]/60"}`}>
                  Settings
                </span>
              </span>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className={`h-4 w-4 fill-none stroke-current stroke-[1.8] transition ${isProfileMenuOpen ? "rotate-180" : ""}`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {isProfileMenuOpen ? (
        <section className="pointer-events-none absolute right-0 top-[108px] z-40 flex w-full justify-end max-md:top-[124px]">
          <div
            className={`pointer-events-auto w-full max-w-[320px] rounded-[24px] border p-4 shadow-[0_24px_60px_rgba(17,24,39,0.18)] backdrop-blur-xl ${isDarkMode ? "border-white/10 bg-[#0c1713]/98" : "border-[#034620]/10 bg-white/98"}`}
          >
            <div className={`rounded-[18px] border px-4 py-3 ${isDarkMode ? "border-white/10 bg-white/5" : "border-[#034620]/10 bg-[#034620]/[0.03]"}`}>
              <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-[#111827]"}`}>{user?.name}</p>
              <p className={`mt-1 text-sm ${isDarkMode ? "text-slate-400" : "text-[#034620]/65"}`}>{user?.email}</p>
            </div>

            <div className="mt-4 grid gap-4">
              <label className={`grid gap-2 text-sm font-semibold ${isDarkMode ? "text-slate-200" : "text-[#111827]"}`}>
                Currency
                <select
                  className={`rounded-2xl border px-4 py-3 text-sm font-medium outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20 ${
                    isDarkMode
                      ? "border-white/10 bg-white/5 text-slate-100"
                      : "border-[#034620]/10 bg-white text-[#034620]"
                  }`}
                  value={selectedCurrency}
                  onChange={onCurrencyChange}
                  aria-label="Select currency"
                >
                  {currencyOptions.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.label}
                    </option>
                  ))}
                </select>
              </label>

              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-[#111827]"}`}>
                    Appearance
                  </p>
                  <p className={`mt-1 text-xs ${isDarkMode ? "text-slate-400" : "text-[#034620]/60"}`}>
                    Switch between light and dark workspace modes
                  </p>
                </div>
                <button
                  type="button"
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl border transition hover:-translate-y-0.5 ${isDarkMode ? "border-white/10 bg-white/5 text-slate-100 hover:bg-white/10" : "border-[#034620]/10 bg-white text-[#034620]"}`}
                  onClick={onToggleTheme}
                  aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                  title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {isDarkMode ? (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 fill-none stroke-current stroke-[1.8]"
                    >
                      <circle cx="12" cy="12" r="4" />
                      <path strokeLinecap="round" d="M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07 6.7 17.3M17.3 6.7l1.77-1.77" />
                    </svg>
                  ) : (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 fill-current"
                    >
                      <path d="M20.742 13.045A8.088 8.088 0 0 1 10.955 3.258a.75.75 0 0 0-.813-.957A9.503 9.503 0 1 0 21.7 13.858a.75.75 0 0 0-.958-.813Z" />
                    </svg>
                  )}
                </button>
              </div>

              <button
                type="button"
                className="rounded-2xl border border-red-200 bg-red-50 px-[18px] py-3 font-medium text-red-700 transition hover:-translate-y-0.5 hover:bg-red-600 hover:text-white"
                onClick={onLogout}
              >
                Log out
              </button>
            </div>
          </div>
        </section>
      ) : null}

      {activeView !== "dashboard" ? (
        <section className={`mb-5 rounded-[24px] border px-5 py-4 shadow-[0_10px_24px_rgba(3,70,32,0.05)] backdrop-blur-xl ${isDarkMode ? "border-white/10 bg-[#091410]/95" : "border-[#034620]/10 bg-white/95"}`}>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className={`mb-1.5 text-[0.68rem] uppercase tracking-[0.18em] ${isDarkMode ? "text-[#10B981]/75" : "text-[#034620]/65"}`}>
                {getViewEyebrow(activeView)}
              </p>
              <h1 className={`text-[clamp(1.45rem,2.2vw,2rem)] font-semibold leading-[1.05] tracking-[-0.04em] ${isDarkMode ? "text-white" : "text-[#111827]"}`}>
                {getViewTitle(activeView)}
              </h1>
              <p className={`mt-2 max-w-[58ch] text-sm ${isDarkMode ? "text-slate-300/80" : "text-[#034620]/72"}`}>
                {getViewDescription(activeView)}
              </p>
            </div>

            <div className="grid gap-2.5 sm:grid-cols-3 lg:min-w-[460px]">
              <HeroMetric isDarkMode={isDarkMode} label="Open leads" value={dashboard.totalLeads} />
              <HeroMetric isDarkMode={isDarkMode} label="Qualified" value={dashboard.qualifiedLeads} />
              <HeroMetric
                isDarkMode={isDarkMode}
                label="Won value"
                value={formatCurrency(dashboard.totalValueOfWonDeals, selectedCurrency)}
              />
            </div>
          </div>
        </section>
      ) : null}

      {crmError || crmMessage ? (
        <ToastNotification
          message={crmError || crmMessage}
          onDismiss={onDismissToast}
          tone={crmError ? "error" : "success"}
        />
      ) : null}

      {activeView === "dashboard" ? (
        <section className="grid gap-6">
          <section className="overflow-hidden rounded-[30px] border border-[#034620]/10 bg-[linear-gradient(135deg,#034620_0%,#056b31_58%,#10B981_100%)] px-6 py-6 text-white shadow-[0_24px_70px_rgba(3,70,32,0.18)]">
            <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr] xl:items-end">
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/70">
                  Dashboard
                </p>
                <h1 className="mt-3 text-[clamp(1.9rem,3vw,2.8rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
                  Keep the pipeline moving with fewer blind spots.
                </h1>
                <p className="mt-3 max-w-[58ch] text-sm leading-6 text-white/78">
                  Track deal value, see how many leads are progressing, and jump straight into the records that need action next.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <DashboardHeroStat
                  label="Pipeline value"
                  value={formatCurrency(dashboard.totalEstimatedDealValue, selectedCurrency)}
                />
                <DashboardHeroStat
                  label="Won revenue"
                  value={formatCurrency(dashboard.totalValueOfWonDeals, selectedCurrency)}
                />
                <DashboardHeroStat
                  label="Conversion"
                  value={getConversionRate(dashboard)}
                />
              </div>
            </div>
          </section>

          <div className="grid gap-3.5 xl:grid-cols-4 md:grid-cols-2">
            <StatCard isDarkMode={isDarkMode} label="Total Leads" value={dashboard.totalLeads} />
            <StatCard isDarkMode={isDarkMode} label="New Leads" value={dashboard.newLeads} />
            <StatCard isDarkMode={isDarkMode} label="Qualified Leads" value={dashboard.qualifiedLeads} />
            <StatCard
              isDarkMode={isDarkMode}
              label="Estimated Value"
              value={formatCurrency(dashboard.totalEstimatedDealValue, selectedCurrency)}
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <section className={`rounded-[30px] border p-6 shadow-[0_20px_60px_rgba(3,70,32,0.08)] backdrop-blur-[14px] ${isDarkMode ? "border-white/10 bg-[#091410]/95" : "border-[#034620]/10 bg-white/95"}`}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className={`mb-3 text-[0.72rem] uppercase tracking-[0.18em] ${isDarkMode ? "text-[#10B981]/75" : "text-[#034620]/65"}`}>
                    Snapshot
                  </p>
                  <h2 className={`text-[1.85rem] font-semibold tracking-[-0.03em] ${isDarkMode ? "text-white" : "text-[#111827]"}`}>
                    Pipeline summary
                  </h2>
                </div>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                <MiniMetric
                  isDarkMode={isDarkMode}
                  label="New"
                  value={dashboard.newLeads}
                  tone="bg-[#10B981]/10 text-[#034620]"
                />
                <MiniMetric
                  isDarkMode={isDarkMode}
                  label="Qualified"
                  value={dashboard.qualifiedLeads}
                  tone="bg-[#10B981]/14 text-[#034620]"
                />
                <MiniMetric
                  isDarkMode={isDarkMode}
                  label="Won"
                  value={dashboard.wonLeads}
                  tone="bg-[#10B981]/18 text-[#034620]"
                />
                <MiniMetric
                  isDarkMode={isDarkMode}
                  label="Lost"
                  value={dashboard.lostLeads}
                  tone="bg-red-50 text-red-800"
                />
                <MiniMetric
                  isDarkMode={isDarkMode}
                  label="Won revenue"
                  value={formatCurrency(dashboard.totalValueOfWonDeals, selectedCurrency)}
                  tone="bg-[#034620]/10 text-[#034620]"
                />
                <MiniMetric
                  isDarkMode={isDarkMode}
                  label="Tracked value"
                  value={formatCurrency(dashboard.totalEstimatedDealValue, selectedCurrency)}
                  tone="bg-[#034620]/8 text-[#111827]"
                />
              </div>
            </section>

            <section className={`rounded-[30px] border p-6 shadow-[0_20px_60px_rgba(3,70,32,0.08)] backdrop-blur-[14px] ${isDarkMode ? "border-white/10 bg-[#091410]/95" : "border-[#034620]/10 bg-white/95"}`}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className={`mb-3 text-[0.72rem] uppercase tracking-[0.18em] ${isDarkMode ? "text-[#10B981]/75" : "text-[#034620]/65"}`}>
                    Focus
                  </p>
                  <h2 className={`text-[1.85rem] font-semibold tracking-[-0.03em] ${isDarkMode ? "text-white" : "text-[#111827]"}`}>
                    Leads needing attention
                  </h2>
                </div>
                <button
                  type="button"
                  className="rounded-2xl bg-[#10B981] px-4 py-2 text-sm font-medium text-white shadow-[0_12px_24px_rgba(16,185,129,0.22)] transition hover:-translate-y-0.5 hover:bg-[#0ea371]"
                  onClick={() => setActiveView("leads")}
                >
                  Open leads
                </button>
              </div>

              <div className="mt-5 grid gap-3">
                {focusLeads.length === 0 ? (
                  <p className={`rounded-2xl px-4 py-3.5 ${isDarkMode ? "bg-white/5 text-slate-300" : "bg-[#034620]/[0.04] text-[#034620]/70"}`}>
                    No active leads yet. Add your first record to start tracking
                    pipeline activity.
                  </p>
                ) : null}

                {focusLeads.map((lead) => (
                  <button
                    key={lead._id}
                    type="button"
                    className={`flex items-center justify-between rounded-[22px] border px-4 py-4 text-left transition hover:-translate-y-0.5 ${isDarkMode ? "border-white/10 bg-[#0c1713]" : "border-[#034620]/10 bg-white"}`}
                    onClick={() => {
                      onSelectLead(lead._id);
                      setActiveView("notes");
                    }}
                  >
                    <div>
                      <p className={`font-medium ${isDarkMode ? "text-white" : "text-[#111827]"}`}>{lead.leadName}</p>
                      <p className={`mt-1 text-sm ${isDarkMode ? "text-slate-400" : "text-[#034620]/70"}`}>
                        {lead.companyName} | {lead.assignedSalesperson}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-[#034620]/70"}`}>{lead.status}</p>
                      <p className={`mt-1 font-medium ${isDarkMode ? "text-white" : "text-[#111827]"}`}>
                        {formatCurrency(lead.estimatedDealValue, selectedCurrency)}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </div>
        </section>
      ) : null}

      {activeView === "leads" ? (
        <section className="grid gap-6 xl:grid-cols-[1.2fr_1fr] xl:items-start">
          <LeadListPanel
            filteredLeads={filteredLeads}
            filters={filters}
            isDarkMode={isDarkMode}
            isLoadingData={isLoadingData}
            onDeleteLead={onDeleteLead}
            onEditLead={(lead) => {
              onEditLead(lead);
              setActiveView("leads");
            }}
            onFilterChange={onFilterChange}
            onMarkQualified={onMarkQualified}
            onSearchChange={onSearchChange}
            onSelectLead={onSelectLead}
            onStartNewLead={onStartNewLead}
            salespersonOptions={salespersonFilterOptions}
            searchTerm={searchTerm}
            selectedCurrency={selectedCurrency}
            selectedLeadId={selectedLeadId}
            sourceOptions={sourceOptions}
            statusOptions={statusOptions}
          />

          <LeadFormPanel
            isDarkMode={isDarkMode}
            isSavingLead={isSavingLead}
            leadForm={leadForm}
            salespersonOptions={salespersonOptions}
            onInputChange={onLeadInputChange}
            onReset={onStartNewLead}
            onSubmit={onSubmitLead}
            selectedLead={editingLead}
            sourceOptions={sourceOptions}
            statusOptions={statusOptions}
          />
        </section>
      ) : null}

      {activeView === "notes" ? (
        <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr] xl:items-start">
          <LeadListPanel
            filteredLeads={filteredLeads}
            filters={filters}
            isDarkMode={isDarkMode}
            isLoadingData={isLoadingData}
            onDeleteLead={onDeleteLead}
            onEditLead={(lead) => {
              onEditLead(lead);
              setActiveView("leads");
            }}
            onFilterChange={onFilterChange}
            onMarkQualified={onMarkQualified}
            onSearchChange={onSearchChange}
            onSelectLead={onSelectLead}
            onStartNewLead={onStartNewLead}
            salespersonOptions={salespersonFilterOptions}
            searchTerm={searchTerm}
            selectedCurrency={selectedCurrency}
            selectedLeadId={selectedLeadId}
            sourceOptions={sourceOptions}
            statusOptions={statusOptions}
          />

          <NotesPanel
            editingNoteId={editingNoteId}
            isDarkMode={isDarkMode}
            isLoadingNotes={isLoadingNotes}
            isSavingNote={isSavingNote}
            noteContent={noteContent}
            notes={notes}
            onCancelNoteEdit={onCancelNoteEdit}
            onDeleteNote={onDeleteNote}
            onEditNote={onEditNote}
            onNoteChange={onNoteChange}
            onSubmit={onSubmitNote}
            onTogglePinnedNote={onTogglePinnedNote}
            selectedCurrency={selectedCurrency}
            selectedLead={selectedLead}
          />
        </section>
      ) : null}

      <footer className={`mt-8 rounded-[22px] border px-5 py-4 shadow-[0_12px_28px_rgba(3,70,32,0.05)] backdrop-blur-xl ${isDarkMode ? "border-white/10 bg-[#091410]/95" : "border-[#034620]/10 bg-white/95"}`}>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#034620] text-xs font-semibold tracking-[0.16em] text-white">
              LF
            </div>
            <div>
              <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-[#111827]"}`}>LeadFlow CRM</p>
              <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-[#034620]/68"}`}>
                Secure lead tracking, follow-up notes, and pipeline visibility in one workspace.
              </p>
            </div>
          </div>

          <div className={`flex flex-wrap gap-x-5 gap-y-1 text-sm ${isDarkMode ? "text-slate-400" : "text-[#034620]/65"}`}>
            <span>{user?.name || "CRM user"}</span>
            <span>{dashboard.totalLeads} leads</span>
            <span>{formatCurrency(dashboard.totalEstimatedDealValue, selectedCurrency)} pipeline</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

function NavButton({ active, isDarkMode, label, onClick }) {
  return (
    <button
      type="button"
      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
        active
          ? "bg-[#10B981] text-white shadow-[0_10px_18px_rgba(16,185,129,0.25)]"
          : isDarkMode
            ? "bg-transparent text-slate-300 hover:-translate-y-0.5 hover:bg-white/8"
            : "bg-transparent text-[#034620] hover:-translate-y-0.5 hover:bg-white/70"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function HeroMetric({ isDarkMode, label, value }) {
  return (
    <div className={`rounded-[16px] border px-3.5 py-3 ${isDarkMode ? "border-white/10 bg-white/5" : "border-[#034620]/10 bg-[#10B981]/8"}`}>
      <p className={`text-[0.68rem] uppercase tracking-[0.16em] ${isDarkMode ? "text-[#10B981]/75" : "text-[#034620]/65"}`}>{label}</p>
      <p className={`mt-1.5 text-base font-semibold ${isDarkMode ? "text-white" : "text-[#111827]"}`}>{value}</p>
    </div>
  );
}

function MiniMetric({ isDarkMode, label, value, tone }) {
  return (
    <div className={`rounded-[18px] border px-4 py-4 ${isDarkMode ? "border-white/10 bg-white/5 text-white" : `border-slate-200 ${tone}`}`}>
      <p className={`text-xs uppercase tracking-[0.18em] ${isDarkMode ? "text-slate-400" : "opacity-70"}`}>{label}</p>
      <p className="mt-2 text-xl font-semibold">{value}</p>
    </div>
  );
}

function DashboardHeroStat({ label, value }) {
  return (
    <div className="rounded-[22px] border border-white/14 bg-white/10 px-4 py-4 backdrop-blur-sm">
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/70">
        {label}
      </p>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

function ToastNotification({ message, onDismiss, tone }) {
  const isError = tone === "error";

  return (
    <div className="pointer-events-none fixed right-5 top-5 z-50 flex justify-end">
      <div
        className={`pointer-events-auto relative flex w-[min(380px,calc(100vw-32px))] items-start gap-3 overflow-hidden rounded-[24px] border-l-[6px] px-4 py-4 shadow-[0_24px_60px_rgba(17,24,39,0.22)] ring-1 backdrop-blur-xl ${
          isError
            ? "border-red-500 bg-[linear-gradient(135deg,rgba(254,242,242,0.96),rgba(255,255,255,0.98))] text-red-900 ring-red-200/80"
            : "border-[#10B981] bg-[linear-gradient(135deg,rgba(236,253,245,0.97),rgba(255,255,255,0.98))] text-[#02351a] ring-[#10B981]/25"
        }`}
      >
        <span
          className={`absolute inset-y-0 left-0 w-1 ${
            isError ? "bg-red-500" : "bg-[#10B981]"
          }`}
        />

        <span
          className={`mt-0.5 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold shadow-sm ${
            isError
              ? "bg-red-600 text-white"
              : "bg-[#10B981] text-white"
          }`}
        >
          {isError ? "!" : "OK"}
        </span>

        <div className="min-w-0 flex-1">
          <p
            className={`text-[0.68rem] font-semibold uppercase tracking-[0.16em] ${
              isError ? "text-red-700/80" : "text-[#047144]"
            }`}
          >
            {isError ? "Action failed" : "Success"}
          </p>
          <p className="mt-1 text-sm font-semibold leading-6">{message}</p>
        </div>

        <button
          type="button"
          className="rounded-full p-1 text-current/70 transition hover:bg-black/5 hover:text-current"
          onClick={onDismiss}
          aria-label="Dismiss notification"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4 fill-none stroke-current stroke-[1.8]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 6l12 12M18 6 6 18"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

function getViewEyebrow(activeView) {
  if (activeView === "dashboard") return "Overview";
  if (activeView === "leads") return "Lead management";
  return "Collaboration";
}

function getViewTitle(activeView) {
  if (activeView === "dashboard") return "A calmer pipeline overview";
  if (activeView === "leads") return "Create, edit, and organize leads";
  return "Capture context and follow-ups";
}

function getViewDescription(activeView) {
  if (activeView === "dashboard") {
    return "Keep the default view focused on pipeline health and the few leads that matter most right now.";
  }

  if (activeView === "leads") {
    return "Use the lead list to edit or delete records, and use the form on the right to add a new lead or update the selected one.";
  }

  return "Review lead details and add notes in a dedicated workspace built for follow-up context.";
}

function getConversionRate(dashboard) {
  if (!dashboard.totalLeads) {
    return "0%";
  }

  return `${Math.round((dashboard.wonLeads / dashboard.totalLeads) * 100)}%`;
}

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default CrmPage;
