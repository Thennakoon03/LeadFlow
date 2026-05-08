import { formatCurrency, formatDate } from "../utils/formatters";

function NotesPanel({
  editingNoteId,
  isDarkMode,
  isLoadingNotes,
  isSavingNote,
  noteContent,
  notes,
  onCancelNoteEdit,
  onDeleteNote,
  onEditNote,
  onNoteChange,
  onSubmit,
  onTogglePinnedNote,
  selectedCurrency,
  selectedLead,
}) {
  const textareaClassName =
    `w-full rounded-2xl border px-3.5 py-3 outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20 ${
      isDarkMode
        ? "border-white/10 bg-[#0f1c17] text-slate-100"
        : "border-[#034620]/10 bg-white text-[#111827]"
    }`;

  return (
    <section className={`rounded-[30px] border p-6 shadow-[0_20px_60px_rgba(3,70,32,0.08)] backdrop-blur-[14px] ${isDarkMode ? "border-white/10 bg-[#091410]/95" : "border-[#034620]/10 bg-white/95"}`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className={`mb-3 text-[0.72rem] uppercase tracking-[0.18em] ${isDarkMode ? "text-[#10B981]/75" : "text-[#034620]/65"}`}>
            Context
          </p>
          <h2 className={`text-[1.85rem] font-semibold tracking-[-0.03em] ${isDarkMode ? "text-white" : "text-[#111827]"}`}>
            Lead details and notes
          </h2>
        </div>
      </div>

      {selectedLead ? (
        <>
          <div className={`my-5 rounded-[22px] border p-4 ${isDarkMode ? "border-white/10 bg-white/5" : "border-[#034620]/10 bg-[#034620]/[0.03]"}`}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-[#111827]"}`}>
                  {selectedLead.leadName}
                </h3>
                <p className={`mt-1 text-sm ${isDarkMode ? "text-slate-400" : "text-[#034620]/72"}`}>
                  {selectedLead.companyName} | {selectedLead.email}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <SummaryPill
                  isDarkMode={isDarkMode}
                  label="Status"
                  value={selectedLead.status}
                />
                <SummaryPill
                  isDarkMode={isDarkMode}
                  label="Owner"
                  value={selectedLead.assignedSalesperson}
                />
                <SummaryPill
                  isDarkMode={isDarkMode}
                  label="Value"
                  value={formatCurrency(
                    selectedLead.estimatedDealValue,
                    selectedCurrency
                  )}
                />
              </div>
            </div>
          </div>

          <form className="mb-5 grid gap-4" onSubmit={onSubmit}>
            <label className={`grid gap-2 font-semibold ${isDarkMode ? "text-slate-100" : "text-[#111827]"}`}>
              {editingNoteId ? "Edit note" : "Add note"}
              <textarea
                className={textareaClassName}
                rows="4"
                value={noteContent}
                onChange={onNoteChange}
                placeholder="Add context from a call, email, or meeting..."
                required
              />
            </label>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="submit"
                className="rounded-2xl bg-[#10B981] px-[18px] py-3 font-medium text-white shadow-[0_14px_28px_rgba(16,185,129,0.28)] transition hover:-translate-y-0.5 hover:bg-[#0ea371] disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isSavingNote}
              >
                {isSavingNote
                  ? "Saving note..."
                  : editingNoteId
                    ? "Update note"
                    : "Save note"}
              </button>

              {editingNoteId ? (
                <button
                  type="button"
                  className={`rounded-2xl border px-[18px] py-3 transition hover:-translate-y-0.5 ${isDarkMode ? "border-white/10 text-slate-300 hover:bg-white/6" : "border-[#034620]/12 text-[#034620]"}`}
                  onClick={onCancelNoteEdit}
                >
                  Cancel
                </button>
              ) : null}
            </div>
          </form>

          <div className="grid gap-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className={`text-[0.68rem] uppercase tracking-[0.16em] ${isDarkMode ? "text-[#10B981]/75" : "text-[#034620]/65"}`}>
                  Timeline
                </p>
                <h3 className={`mt-1 text-lg font-semibold ${isDarkMode ? "text-white" : "text-[#111827]"}`}>
                  Recent notes
                </h3>
              </div>
              <span className={`rounded-full px-3 py-1 text-sm font-medium ${isDarkMode ? "bg-[#10B981]/18 text-[#8bf0c2]" : "bg-[#10B981]/10 text-[#034620]"}`}>
                {notes.length} {notes.length === 1 ? "note" : "notes"}
              </span>
            </div>

            {isLoadingNotes ? (
              <p className={`rounded-2xl px-4 py-3.5 ${isDarkMode ? "bg-white/5 text-slate-300" : "bg-[#034620]/[0.04] text-[#034620]/70"}`}>
                Loading notes...
              </p>
            ) : null}

            {!isLoadingNotes && notes.length === 0 ? (
              <p className={`rounded-2xl px-4 py-3.5 ${isDarkMode ? "bg-white/5 text-slate-300" : "bg-[#034620]/[0.04] text-[#034620]/70"}`}>
                No notes yet. Add the first follow-up for this lead.
              </p>
            ) : null}

            <div className="relative max-h-[420px] overflow-y-auto pl-6 pr-1 before:absolute before:left-[11px] before:top-1 before:h-[calc(100%-8px)] before:w-px before:bg-[#10B981]/25 xl:max-h-[calc(100vh-29rem)]">
              <div className="grid gap-4 pb-1">
                {notes.map((note) => (
                  <article
                    key={note._id}
                    className={`relative rounded-[22px] border p-4 shadow-[0_10px_26px_rgba(3,70,32,0.05)] ${
                      note.isPinned
                        ? `${isDarkMode ? "bg-[#0f1c17] border-[#10B981]/45 ring-1 ring-[#10B981]/20" : "bg-white border-[#10B981]/45 ring-1 ring-[#10B981]/20"}`
                        : `${isDarkMode ? "bg-[#0c1713] border-white/10" : "bg-white border-[#034620]/10"}`
                    }`}
                  >
                    <span
                      className={`absolute -left-[31px] top-5 flex h-5 w-5 items-center justify-center rounded-full border-4 border-white ${
                        note.isPinned ? "bg-[#10B981]" : "bg-[#034620]"
                      }`}
                    />

                    <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-semibold ${isDarkMode ? "bg-white/8 text-[#8bf0c2]" : "bg-[#034620]/8 text-[#034620]"}`}>
                          {getInitials(note.createdBy)}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <strong className={isDarkMode ? "text-white" : "text-[#111827]"}>
                              {note.createdBy}
                            </strong>
                            {note.isPinned ? (
                              <span className="rounded-full bg-[#10B981]/12 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#034620]">
                                Pinned
                              </span>
                            ) : null}
                          </div>
                          <p className={`mt-1 text-sm ${isDarkMode ? "text-slate-400" : "text-[#034620]/70"}`}>
                            {formatDate(note.createdAt)}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition ${
                            note.isPinned
                              ? "bg-[#10B981] text-white shadow-[0_10px_20px_rgba(16,185,129,0.22)] hover:bg-[#0ea371]"
                              : "border border-[#10B981]/20 bg-[#10B981]/10 text-[#034620] hover:-translate-y-0.5 hover:bg-[#10B981] hover:text-white"
                          }`}
                          onClick={() => onTogglePinnedNote(note._id)}
                        >
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            className="h-4 w-4 fill-current"
                          >
                            <path d="M14 3a1 1 0 0 0-1 1v3.2l-4.35 5.23A1 1 0 0 0 9.42 14H11v6l2-1.5L15 20v-6h1.58a1 1 0 0 0 .77-1.57L13 7.2V4a1 1 0 0 0-1-1h2Z" />
                          </svg>
                          {note.isPinned ? "Pinned" : "Pin note"}
                        </button>

                        <button
                          type="button"
                          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#10B981]/20 bg-[#10B981]/10 text-[#10B981] transition hover:-translate-y-0.5 hover:bg-[#10B981] hover:text-white"
                          onClick={() => onEditNote(note)}
                          aria-label={`Edit note from ${note.createdBy}`}
                          title="Edit note"
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
                          onClick={() => onDeleteNote(note._id)}
                          aria-label={`Delete note from ${note.createdBy}`}
                          title="Delete note"
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

                    <div className={`rounded-[18px] px-4 py-3.5 ${isDarkMode ? "bg-white/5" : "bg-[#034620]/[0.03]"}`}>
                      <p className={`leading-7 ${isDarkMode ? "text-slate-100" : "text-[#111827]"}`}>{note.content}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className={`mt-5 rounded-2xl px-4 py-3.5 ${isDarkMode ? "bg-white/5 text-slate-300" : "bg-[#034620]/[0.04] text-[#034620]/70"}`}>
          Select a lead from the list or create a new one to view details.
        </p>
      )}
    </section>
  );
}

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function SummaryPill({ isDarkMode, label, value }) {
  return (
    <div className={`rounded-full border px-3 py-2 text-sm ${isDarkMode ? "border-white/10 bg-white/5" : "border-[#034620]/10 bg-white"}`}>
      <span className={isDarkMode ? "text-slate-400" : "text-[#034620]/65"}>{label}: </span>
      <strong className={isDarkMode ? "text-white" : "text-[#111827]"}>{value}</strong>
    </div>
  );
}

export default NotesPanel;
