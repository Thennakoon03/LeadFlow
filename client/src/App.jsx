import { useDeferredValue, useEffect, useMemo, useState } from "react";
import {
  currencyOptions,
  emptyDashboard,
  emptyLeadForm,
  sourceOptions,
  statusOptions,
} from "./constants/crm";
import CrmPage from "./pages/CrmPage";
import LoginPage from "./pages/LoginPage";
import { createApiClient, loginRequest } from "./services/api";
import { persistAuth, readStoredAuth } from "./services/authStorage";

const getLeadFormDefaults = (salespersonName = "Maya Thompson") => ({
  ...emptyLeadForm,
  assignedSalesperson: salespersonName,
});
const themeStorageKey = "leadflow-theme";
const currencyStorageKey = "leadflow-currency";

function App() {
  const storedAuth = readStoredAuth();
  const storedTheme =
    typeof window !== "undefined"
      ? window.localStorage.getItem(themeStorageKey)
      : null;
  const storedCurrency =
    typeof window !== "undefined"
      ? window.localStorage.getItem(currencyStorageKey)
      : null;
  const [token, setToken] = useState(storedAuth.token || "");
  const [user, setUser] = useState(storedAuth.user || null);
  const [isDarkMode, setIsDarkMode] = useState(storedTheme === "dark");
  const [selectedCurrency, setSelectedCurrency] = useState(
    storedCurrency || "USD"
  );
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [dashboard, setDashboard] = useState(emptyDashboard);
  const [leads, setLeads] = useState([]);
  const [salespeople, setSalespeople] = useState([]);
  const [selectedLeadId, setSelectedLeadId] = useState("");
  const [editingLeadId, setEditingLeadId] = useState("");
  const [leadForm, setLeadForm] = useState(getLeadFormDefaults(storedAuth.user?.name));
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "All",
    leadSource: "All",
    assignedSalesperson: "All",
  });
  const [notes, setNotes] = useState([]);
  const [noteContent, setNoteContent] = useState("");
  const [editingNoteId, setEditingNoteId] = useState("");
  const [crmMessage, setCrmMessage] = useState("");
  const [crmError, setCrmError] = useState("");
  const [isSavingLead, setIsSavingLead] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isLoadingNotes, setIsLoadingNotes] = useState(false);
  const [isSavingNote, setIsSavingNote] = useState(false);
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const api = useMemo(() => createApiClient(token), [token]);

  const selectedLead =
    leads.find((lead) => lead._id === selectedLeadId) || null;
  const editingLead =
    leads.find((lead) => lead._id === editingLeadId) || null;

  const filteredLeads = useMemo(() => {
    const normalizedQuery = deferredSearchTerm.trim().toLowerCase();

    return leads.filter((lead) => {
      const matchesStatus =
        filters.status === "All" || lead.status === filters.status;
      const matchesSource =
        filters.leadSource === "All" || lead.leadSource === filters.leadSource;
      const matchesSalesperson =
        filters.assignedSalesperson === "All" ||
        lead.assignedSalesperson === filters.assignedSalesperson;
      const matchesSearch =
        !normalizedQuery ||
        [lead.leadName, lead.companyName, lead.email].some((value) =>
          value.toLowerCase().includes(normalizedQuery)
        );

      return (
        matchesStatus && matchesSource && matchesSalesperson && matchesSearch
      );
    });
  }, [deferredSearchTerm, filters, leads]);

  const salespersonOptions = useMemo(() => {
    const uniqueSalespeople = new Set(salespeople.map((person) => person.name));
    leads
      .map((lead) => lead.assignedSalesperson)
      .filter(Boolean)
      .forEach((name) => uniqueSalespeople.add(name));

    return Array.from(uniqueSalespeople);
  }, [leads, salespeople]);

  const salespersonFilterOptions = useMemo(() => {
    return ["All", ...salespersonOptions];
  }, [salespersonOptions]);

  useEffect(() => {
    persistAuth({ token, user });
  }, [token, user]);

  useEffect(() => {
    document.body.classList.toggle("leadflow-dark", isDarkMode);
    window.localStorage.setItem(themeStorageKey, isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    window.localStorage.setItem(currencyStorageKey, selectedCurrency);
  }, [selectedCurrency]);

  useEffect(() => {
    if (!crmMessage && !crmError) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setCrmMessage("");
      setCrmError("");
    }, 3200);

    return () => window.clearTimeout(timeoutId);
  }, [crmError, crmMessage]);

  useEffect(() => {
    if (!token) {
      return;
    }

    loadCrmData();
  }, [token]);

  useEffect(() => {
    if (!selectedLeadId || !token) {
      setNotes([]);
      setEditingNoteId("");
      setNoteContent("");
      return;
    }

    loadLeadNotes(selectedLeadId);
  }, [selectedLeadId, token]);

  const handleLoginInputChange = (event) => {
    const { name, value } = event.target;

    setLoginForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleLeadInputChange = (event) => {
    const { name, value } = event.target;

    setLeadForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    setFilters((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);

    try {
      const response = await loginRequest({
        email: loginForm.email,
        password: loginForm.password,
      });

      setToken(response.data.token);
      setUser(response.data.user);
    } catch (error) {
      setLoginError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  const loadCrmData = async () => {
    setIsLoadingData(true);
    setCrmError("");

    try {
      const [dashboardResponse, leadsResponse, salespeopleResponse] = await Promise.all([
        api.get("/api/dashboard"),
        api.get("/api/leads"),
        api.get("/api/users/salespeople"),
      ]);

      setDashboard(dashboardResponse.data);
      setLeads(leadsResponse.data);
      setSalespeople(salespeopleResponse.data);

      if (leadsResponse.data.length > 0) {
        setSelectedLeadId((currentId) => {
          const stillExists = leadsResponse.data.some(
            (lead) => lead._id === currentId
          );

          return stillExists ? currentId : leadsResponse.data[0]._id;
        });
      } else {
        setSelectedLeadId("");
      }

      setEditingLeadId((currentId) => {
        if (!currentId) {
          return "";
        }

        const stillExists = leadsResponse.data.some(
          (lead) => lead._id === currentId
        );

        return stillExists ? currentId : "";
      });
    } catch (error) {
      setCrmError(
        error.response?.data?.message ||
          "Could not load CRM data. Check that the backend is running."
      );
    } finally {
      setIsLoadingData(false);
    }
  };

  const loadLeadNotes = async (leadId) => {
    setIsLoadingNotes(true);

    try {
      const response = await api.get(`/api/leads/${leadId}/notes`);
      setNotes(response.data);
    } catch (error) {
      setCrmError(
        error.response?.data?.message || "Could not load notes for this lead."
      );
    } finally {
      setIsLoadingNotes(false);
    }
  };

  const handleSubmitLead = async (event) => {
    event.preventDefault();
    setIsSavingLead(true);
    setCrmError("");
    setCrmMessage("");

    const payload = {
      ...leadForm,
      estimatedDealValue: Number(leadForm.estimatedDealValue) || 0,
    };

    try {
      if (editingLeadId) {
        await api.put(`/api/leads/${editingLeadId}`, payload);
        setCrmMessage("Lead updated successfully.");
        setEditingLeadId("");
      } else {
        const response = await api.post("/api/leads", payload);
        setSelectedLeadId(response.data.lead._id);
        setCrmMessage("Lead created successfully.");
      }

      setLeadForm(getLeadFormDefaults(user?.name));
      await loadCrmData();
    } catch (error) {
      setCrmError(
        error.response?.data?.message || "Could not save the lead."
      );
    } finally {
      setIsSavingLead(false);
    }
  };

  const handleEditLead = (lead) => {
    setSelectedLeadId(lead._id);
    setEditingLeadId(lead._id);
    setLeadForm({
      leadName: lead.leadName,
      companyName: lead.companyName,
      email: lead.email,
      phoneNumber: lead.phoneNumber,
      leadSource: lead.leadSource,
      assignedSalesperson: lead.assignedSalesperson,
      status: lead.status,
      estimatedDealValue: String(lead.estimatedDealValue),
    });
    setCrmMessage("");
    setCrmError("");
  };

  const handleDeleteLead = async (leadId) => {
    setCrmError("");
    setCrmMessage("");

    try {
      await api.delete(`/api/leads/${leadId}`);

      if (selectedLeadId === leadId) {
        setSelectedLeadId("");
        setNotes([]);
      }

      if (editingLeadId === leadId) {
        setEditingLeadId("");
      }

      setLeadForm(getLeadFormDefaults(user?.name));
      setCrmMessage("Lead deleted successfully.");
      await loadCrmData();
    } catch (error) {
      setCrmError(
        error.response?.data?.message || "Could not delete the lead."
      );
    }
  };

  const handleMarkQualified = async (lead) => {
    if (lead.hasBeenQualified || lead.status === "Qualified") {
      return;
    }

    setCrmError("");
    setCrmMessage("");

    try {
      await api.put(`/api/leads/${lead._id}`, {
        ...lead,
        status: "Qualified",
        hasBeenQualified: true,
      });

      if (editingLeadId === lead._id) {
        setLeadForm({
          leadName: lead.leadName,
          companyName: lead.companyName,
          email: lead.email,
          phoneNumber: lead.phoneNumber,
          leadSource: lead.leadSource,
          assignedSalesperson: lead.assignedSalesperson,
          status: "Qualified",
          estimatedDealValue: String(lead.estimatedDealValue),
        });
      }

      setCrmMessage(`${lead.leadName} marked as qualified.`);
      await loadCrmData();
    } catch (error) {
      setCrmError(
        error.response?.data?.message || "Could not update lead status."
      );
    }
  };

  const handleAddNote = async (event) => {
    event.preventDefault();
    if (!selectedLeadId) {
      return;
    }

    setIsSavingNote(true);
    setCrmError("");
    setCrmMessage("");

    try {
      if (editingNoteId) {
        await api.put(`/api/leads/${selectedLeadId}/notes/${editingNoteId}`, {
          content: noteContent,
        });
        setCrmMessage("Note updated successfully.");
      } else {
        await api.post(`/api/leads/${selectedLeadId}/notes`, {
          content: noteContent,
        });
        setCrmMessage("Note added successfully.");
      }

      setNoteContent("");
      setEditingNoteId("");
      await loadLeadNotes(selectedLeadId);
    } catch (error) {
      setCrmError(
        error.response?.data?.message || "Could not save the note."
      );
    } finally {
      setIsSavingNote(false);
    }
  };

  const handleEditNote = (note) => {
    setEditingNoteId(note._id);
    setNoteContent(note.content);
    setCrmMessage("");
    setCrmError("");
  };

  const handleDeleteNote = async (noteId) => {
    if (!selectedLeadId) {
      return;
    }

    setCrmError("");
    setCrmMessage("");

    try {
      await api.delete(`/api/leads/${selectedLeadId}/notes/${noteId}`);

      if (editingNoteId === noteId) {
        setEditingNoteId("");
        setNoteContent("");
      }

      setCrmMessage("Note deleted successfully.");
      await loadLeadNotes(selectedLeadId);
    } catch (error) {
      setCrmError(
        error.response?.data?.message || "Could not delete the note."
      );
    }
  };

  const handleTogglePinnedNote = async (noteId) => {
    if (!selectedLeadId) {
      return;
    }

    setCrmError("");
    setCrmMessage("");

    try {
      const response = await api.patch(
        `/api/leads/${selectedLeadId}/notes/${noteId}/pin`
      );

      setCrmMessage(response.data.message);
      await loadLeadNotes(selectedLeadId);
    } catch (error) {
      setCrmError(
        error.response?.data?.message || "Could not update note pin status."
      );
    }
  };

  const handleLogout = () => {
    setToken("");
    setUser(null);
    setLeads([]);
    setSalespeople([]);
    setNotes([]);
    setEditingNoteId("");
    setSelectedLeadId("");
    setEditingLeadId("");
    setLeadForm(getLeadFormDefaults());
    setDashboard({
      ...emptyDashboard,
    });
    setCrmMessage("");
    setCrmError("");
  };

  const handleStartNewLead = () => {
    setEditingLeadId("");
    setLeadForm(getLeadFormDefaults(user?.name));
    setCrmMessage("");
    setCrmError("");
  };

  const handleCancelNoteEdit = () => {
    setEditingNoteId("");
    setNoteContent("");
    setCrmMessage("");
    setCrmError("");
  };

  const handleDismissToast = () => {
    setCrmMessage("");
    setCrmError("");
  };

  const handleToggleTheme = () => {
    setIsDarkMode((current) => !current);
  };

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  if (!token) {
    return (
      <LoginPage
        isLoggingIn={isLoggingIn}
        isDarkMode={isDarkMode}
        loginError={loginError}
        loginForm={loginForm}
        onInputChange={handleLoginInputChange}
        onSubmit={handleLogin}
        onToggleTheme={handleToggleTheme}
      />
    );
  }

  return (
    <CrmPage
      crmError={crmError}
      crmMessage={crmMessage}
      dashboard={dashboard}
      currencyOptions={currencyOptions}
      filteredLeads={filteredLeads}
      filters={filters}
      editingLead={editingLead}
      editingNoteId={editingNoteId}
      isDarkMode={isDarkMode}
      isLoadingData={isLoadingData}
      isLoadingNotes={isLoadingNotes}
      isSavingLead={isSavingLead}
      isSavingNote={isSavingNote}
      leadForm={leadForm}
      noteContent={noteContent}
      notes={notes}
      onDeleteLead={handleDeleteLead}
      onEditLead={handleEditLead}
      onFilterChange={handleFilterChange}
      onMarkQualified={handleMarkQualified}
      onLeadInputChange={handleLeadInputChange}
      onLogout={handleLogout}
      onNoteChange={(event) => setNoteContent(event.target.value)}
      onCancelNoteEdit={handleCancelNoteEdit}
      onDeleteNote={handleDeleteNote}
      onDismissToast={handleDismissToast}
      onEditNote={handleEditNote}
      onSearchChange={(event) => setSearchTerm(event.target.value)}
      onSelectLead={(leadId) => {
        setSelectedLeadId(leadId);
        setCrmMessage("");
        setCrmError("");
      }}
      onStartNewLead={handleStartNewLead}
      onSubmitLead={handleSubmitLead}
      onSubmitNote={handleAddNote}
      onToggleTheme={handleToggleTheme}
      onTogglePinnedNote={handleTogglePinnedNote}
      salespersonOptions={salespersonOptions}
      salespersonFilterOptions={salespersonFilterOptions}
      searchTerm={searchTerm}
      selectedLead={selectedLead}
      selectedLeadId={selectedLeadId}
      selectedCurrency={selectedCurrency}
      sourceOptions={sourceOptions}
      statusOptions={statusOptions}
      user={user}
      onCurrencyChange={handleCurrencyChange}
    />
  );
}

export default App;
