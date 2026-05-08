function LoginPage({
  isLoggingIn,
  isDarkMode,
  loginError,
  loginForm,
  onInputChange,
  onSubmit,
  onToggleTheme,
}) {
  const inputClassName = `w-full rounded-2xl border px-3.5 py-3 outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20 ${
    isDarkMode
      ? "border-white/10 bg-[#0f1c17] text-slate-100 placeholder:text-slate-500"
      : "border-[#034620]/10 bg-white text-[#111827]"
  }`;

  return (
    <main className="mx-auto flex min-h-screen w-[min(1180px,calc(100%-32px))] items-center py-8 max-md:w-[min(100%,calc(100%-20px))]">
      <section
        className={`grid w-full overflow-hidden rounded-[32px] border shadow-[0_24px_80px_rgba(3,70,32,0.10)] backdrop-blur-[18px] lg:grid-cols-[1.15fr_0.85fr] ${
          isDarkMode
            ? "border-white/10 bg-[#08130f]"
            : "border-[#034620]/10 bg-white"
        }`}
      >
        <div className="flex flex-col justify-between bg-[linear-gradient(145deg,#034620,#046b31)] p-8 text-white md:p-12">
          <div>
            <div className="mb-10 flex items-center justify-between gap-4">
              <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-white/80">
                LeadFlow CRM
              </div>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/18"
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
            <h1 className="mb-5 max-w-[11ch] text-[clamp(2.6rem,4.6vw,4.4rem)] font-semibold leading-[0.96] tracking-[-0.05em] text-white">
              Sales pipeline clarity for small teams
            </h1>
            <p className="max-w-[48ch] text-base leading-7 text-white/78">
              Keep every lead, update, and next step in one calm workspace built
              for quick follow-ups and cleaner pipeline visibility.
            </p>
          </div>

          
        </div>

        <div className={`p-8 md:p-12 ${isDarkMode ? "text-slate-100" : ""}`}>
          <div className="mb-8">
            <p className={`mb-3 text-[0.72rem] uppercase tracking-[0.18em] ${isDarkMode ? "text-[#10B981]/75" : "text-[#034620]/65"}`}>
              Sign in
            </p>
            <h2 className={`mb-3 text-[clamp(2rem,3vw,2.6rem)] font-semibold tracking-[-0.04em] ${isDarkMode ? "text-white" : "text-[#111827]"}`}>
              Sign in to your workspace
            </h2>
            <p className={`max-w-[48ch] ${isDarkMode ? "text-slate-300/80" : "text-[#034620]/75"}`}>
              Access your lead pipeline, account activity, and follow-up notes
              from one secure workspace.
            </p>
          </div>

          <form className="grid gap-4" onSubmit={onSubmit} autoComplete="off">
            <label className={`grid gap-2 font-semibold ${isDarkMode ? "text-slate-100" : "text-[#111827]"}`}>
              Email
              <input
                className={inputClassName}
                name="email"
                type="email"
                autoComplete="off"
                placeholder="Enter username"
                value={loginForm.email}
                onChange={onInputChange}
                required
              />
            </label>

            <label className={`grid gap-2 font-semibold ${isDarkMode ? "text-slate-100" : "text-[#111827]"}`}>
              Password
              <input
                className={inputClassName}
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="Enter password"
                value={loginForm.password}
                onChange={onInputChange}
                required
              />
            </label>

            {loginError ? (
              <p className={`rounded-2xl border px-4 py-3.5 ${isDarkMode ? "border-red-500/30 bg-red-500/12 text-red-100" : "border-rose-200 bg-rose-50 text-rose-900"}`}>
                {loginError}
              </p>
            ) : null}

            <button
              type="submit"
              className="mt-2 rounded-2xl bg-[#034620] px-[18px] py-3 text-white shadow-[0_14px_28px_rgba(3,70,32,0.18)] transition hover:-translate-y-0.5 hover:bg-[#10B981] disabled:cursor-not-allowed disabled:opacity-70"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? "Signing in..." : "Access workspace"}
            </button>
          </form>

          <div className={`mt-8 rounded-[22px] border px-5 py-4 ${isDarkMode ? "border-white/10 bg-white/5" : "border-[#034620]/10 bg-[#034620]/[0.03]"}`}>
            <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-[#111827]"}`}>
              Secure access
            </p>
            <p className={`mt-1 text-sm leading-6 ${isDarkMode ? "text-slate-300/78" : "text-[#034620]/75"}`}>
              This portal is restricted to authorized CRM administrators and
              operations users.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-[20px] border border-white/15 bg-white/10 px-4 py-4">
      <p className="text-xs uppercase tracking-[0.18em] text-white/60">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}

export default LoginPage;
