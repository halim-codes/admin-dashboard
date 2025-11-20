"use client";

import { useEffect, useState, useMemo } from "react";
import { Search } from "lucide-react";
import Button from "@/components/ui/button/Button";
import { useLanguageKeys, useUpdateLanguageKey } from "@/hooks/useLanguageKeys";
import { useLanguages } from "@/hooks/useLanguages";
import { LanguageKey } from "@/types/LanguageKey";

const LanguageKeysComponent = () => {
  const { languageKeys = [], isLoading, isError, refetch } = useLanguageKeys();
  const { languages = [] } = useLanguages();
  const updateMutation = useUpdateLanguageKey();

  const [selectedLang, setSelectedLang] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editedValues, setEditedValues] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const storedLocale = localStorage.getItem("locale");
    if (storedLocale && languages.length > 0) {
      const foundLang = languages.find((lang) => lang.key === storedLocale);
      if (foundLang) setSelectedLang(foundLang.id);
    }
  }, [languages]);

  const filteredKeys = useMemo(() => {
    if (!selectedLang) return [];
    return languageKeys
      .filter((item) => item.languageId === selectedLang)
      .filter(
        (item) =>
          item.keyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.value.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [languageKeys, selectedLang, searchTerm]);

  const handleChange = (id: number, newValue: string) => {
    setEditedValues((prev) => ({ ...prev, [id]: newValue }));
  };

  const handleSave = async () => {
    if (!Object.keys(editedValues).length) return;
    setLoading(true);
    setMessage(null);

    try {
      for (const [id, value] of Object.entries(editedValues)) {
        await updateMutation.mutateAsync({
          id: Number(id),
          data: { value },
        });
      }

      setEditedValues({});
      refetch();

      setMessage("Languages keys updated successfully!");

      setTimeout(() => setMessage(null), 1000);
    } catch (error) {
      console.error("Update failed:", error);
      setMessage("Error updating keys. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-gray-500">Loading language keys...</p>
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-red-500">Failed to load language keys.</p>
      </div>
    );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Language Translations
        </h3>

        <div className="flex flex-wrap items-center gap-3">
          {/* Language Selector */}
          <select
            value={selectedLang ?? ""}
            onChange={(e) =>
              setSelectedLang(e.target.value ? Number(e.target.value) : null)
            }
            className="px-3 py-2 text-sm border rounded-lg bg-white dark:bg-slate-900 dark:text-gray-100 dark:border-white/10"
          >
            <option value="">Select Language</option>
            {languages.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.name}
              </option>
            ))}
          </select>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search keys..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-2 text-sm border rounded-lg bg-white dark:bg-slate-900 dark:text-gray-100 dark:border-white/10 focus:ring-2 focus:ring-primary/40 outline-none"
            />
          </div>
        </div>
      </div>

      {selectedLang ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="space-y-8"
        >
          {message && (
            <p
              className={`text-center font-medium ${
                message.includes("Error") ? "text-red-600" : "text-green-600"
              }`}
            >
              {message}
            </p>
          )}

          {filteredKeys.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              {filteredKeys.map((item: LanguageKey) => (
                <div
                  key={item.id}
                  className="flex flex-col p-4 rounded-2xl border border-gray-200 bg-white shadow-sm dark:bg-slate-900 dark:border-white/[0.08]"
                >
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                    {item.keyName}
                  </label>
                  <input
                    type="text"
                    value={editedValues[item.id] ?? item.value}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-gray-50 dark:bg-slate-800 dark:text-white dark:border-white/10 focus:ring-2 focus:ring-primary/40 outline-none"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No keys found for this language.
            </p>
          )}

          {/* Save Button */}
          <div className="pt-6 flex justify-end">
            <Button
              size="sm"
              type="submit"
              disabled={loading || Object.keys(editedValues).length === 0}
            >
              {loading ? "Saving..." : "Update"}
            </Button>
          </div>
        </form>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">Select a language to view keys.</p>
      )}
    </div>
  );
};

export default LanguageKeysComponent;
