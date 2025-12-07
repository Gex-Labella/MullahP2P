import { motion } from "framer-motion";
import { Check, X, Shield, AlertTriangle } from "lucide-react";
import { useMemo } from "react";

interface PasswordStrengthProps {
  password: string;
}

interface PasswordRequirement {
  label: string;
  test: (password: string) => boolean;
  icon: typeof Check;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const requirements: PasswordRequirement[] = [
    {
      label: "At least 8 characters",
      test: (pwd) => pwd.length >= 8,
      icon: Check,
    },
    {
      label: "Contains uppercase letter",
      test: (pwd) => /[A-Z]/.test(pwd),
      icon: Check,
    },
    {
      label: "Contains lowercase letter",
      test: (pwd) => /[a-z]/.test(pwd),
      icon: Check,
    },
    {
      label: "Contains number",
      test: (pwd) => /\d/.test(pwd),
      icon: Check,
    },
    {
      label: "Contains special character",
      test: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
      icon: Check,
    },
  ];

  const strength = useMemo(() => {
    const passedRequirements = requirements.filter((req) =>
      req.test(password)
    ).length;
    const percentage = (passedRequirements / requirements.length) * 100;

    if (percentage === 0)
      return { level: "none", color: "gray", label: "Enter password" };
    if (percentage <= 40) return { level: "weak", color: "red", label: "Weak" };
    if (percentage <= 60)
      return { level: "fair", color: "orange", label: "Fair" };
    if (percentage <= 80)
      return { level: "good", color: "yellow", label: "Good" };
    return { level: "strong", color: "emerald", label: "Strong" };
  }, [password, requirements]);

  const getStrengthColor = (color: string) => {
    switch (color) {
      case "red":
        return "from-red-500 to-red-600";
      case "orange":
        return "from-orange-500 to-yellow-500";
      case "yellow":
        return "from-yellow-500 to-emerald-500";
      case "emerald":
        return "from-emerald-500 to-green-500";
      default:
        return "from-gray-400 to-gray-500";
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case "red":
        return "text-red-400";
      case "orange":
        return "text-orange-400";
      case "yellow":
        return "text-yellow-400";
      case "emerald":
        return "text-emerald-400";
      default:
        return "text-gray-400";
    }
  };

  if (!password) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4 mt-4"
    >
      {/* Strength Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/70">Password Strength</span>
          <div className="flex items-center space-x-2">
            {strength.level === "strong" ? (
              <Shield className="h-4 w-4 text-emerald-400" />
            ) : strength.level === "none" ? (
              <AlertTriangle className="h-4 w-4 text-gray-400" />
            ) : (
              <AlertTriangle
                className={`h-4 w-4 ${getIconColor(strength.color)}`}
              />
            )}
            <span
              className={`text-sm font-medium ${getIconColor(strength.color)}`}
            >
              {strength.label}
            </span>
          </div>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${getStrengthColor(
              strength.color
            )}`}
            initial={{ width: 0 }}
            animate={{
              width: `${
                (requirements.filter((req) => req.test(password)).length /
                  requirements.length) *
                100
              }%`,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Requirements Checklist */}
      <div className="space-y-2">
        {requirements.map((requirement, index) => {
          const isPassed = requirement.test(password);
          return (
            <motion.div
              key={requirement.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-3"
            >
              <motion.div
                animate={{
                  scale: isPassed ? [1, 1.2, 1] : 1,
                  rotate: isPassed ? [0, 360] : 0,
                }}
                transition={{ duration: 0.3 }}
                className={`w-5 h-5 rounded-full flex items-center justify-center border-2 ${
                  isPassed
                    ? "bg-emerald-500 border-emerald-500"
                    : "border-white/30"
                }`}
              >
                {isPassed ? (
                  <Check className="h-3 w-3 text-white" />
                ) : (
                  <X className="h-3 w-3 text-white/50" />
                )}
              </motion.div>
              <span
                className={`text-sm ${
                  isPassed ? "text-emerald-400" : "text-white/50"
                }`}
              >
                {requirement.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
