import { useState } from "react";
import { toast } from "sonner";

import SettingsHeader from "../components/settings/SettingsHeader";
import NetworkPreferences from "../components/settings/NetworkPreferences";
import DisplayNotifications from "../components/settings/DisplayNotifications";
import SecuritySettings from "../components/settings/SecuritySettings";
import AdvancedSettings from "../components/settings/AdvancedSettings";

export default function Settings() {
  const [saving, setSaving] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [highSecurityMode, setHighSecurityMode] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("30");
  const [selectedNetwork, setSelectedNetwork] = useState("ethereum");

  const saveSettings = async () => {
    try {
      setSaving(true);
      await new Promise((res) => setTimeout(res, 1200));
      toast.success("✅ Settings saved successfully!");
    } catch {
      toast.error("❌ Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const resetToDefaults = () => {
    setIsDarkMode(true);
    setSoundEnabled(true);
    setNotificationsEnabled(true);
    setAutoRefresh(true);
    setHighSecurityMode(true);
    setShowAdvanced(false);
    setSessionTimeout("30");
    setSelectedNetwork("ethereum");
    toast.success("🔄 Settings reset to defaults");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <SettingsHeader
          onSave={saveSettings}
          onReset={resetToDefaults}
          saving={saving}
        />

        {/* Two Column Layout for Desktop */}
        <div className="grid grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <NetworkPreferences
              selectedNetwork={selectedNetwork}
              setSelectedNetwork={setSelectedNetwork}
            />

            <SecuritySettings
              highSecurityMode={highSecurityMode}
              setHighSecurityMode={setHighSecurityMode}
              sessionTimeout={sessionTimeout}
              setSessionTimeout={setSessionTimeout}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <DisplayNotifications
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
              soundEnabled={soundEnabled}
              setSoundEnabled={setSoundEnabled}
              notificationsEnabled={notificationsEnabled}
              setNotificationsEnabled={setNotificationsEnabled}
              autoRefresh={autoRefresh}
              setAutoRefresh={setAutoRefresh}
            />

            <AdvancedSettings
              showAdvanced={showAdvanced}
              setShowAdvanced={setShowAdvanced}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
