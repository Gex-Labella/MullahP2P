import { motion } from "framer-motion";
import { Check, User, Mail, Shield, Sparkles } from "lucide-react";

interface SignUpProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function SignUpProgress({
  currentStep,
  totalSteps,
}: SignUpProgressProps) {
  const steps = [
    { icon: User, label: "Profile", description: "Basic info" },
    { icon: Mail, label: "Verify", description: "Email confirmation" },
    { icon: Shield, label: "Security", description: "Password setup" },
    { icon: Sparkles, label: "Welcome", description: "All set!" },
  ];

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-white/20">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-emerald-500"
            initial={{ width: 0 }}
            animate={{
              width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        {steps.slice(0, totalSteps).map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const Icon = step.icon;

          return (
            <motion.div
              key={stepNumber}
              className="flex flex-col items-center relative z-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 mb-2 ${
                  isCompleted
                    ? "bg-emerald-500 border-emerald-500"
                    : isCurrent
                    ? "bg-gradient-to-r from-blue-500 to-emerald-500 border-transparent"
                    : "bg-white/10 border-white/30"
                }`}
                animate={{
                  scale: isCurrent ? [1, 1.1, 1] : 1,
                  boxShadow: isCurrent
                    ? [
                        "0 0 0px rgba(59, 130, 246, 0.5)",
                        "0 0 20px rgba(16, 185, 129, 0.5)",
                        "0 0 0px rgba(59, 130, 246, 0.5)",
                      ]
                    : "none",
                }}
                transition={{
                  scale: { duration: 2, repeat: Infinity },
                  boxShadow: { duration: 2, repeat: Infinity },
                }}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Check className="h-6 w-6 text-white" />
                  </motion.div>
                ) : (
                  <Icon
                    className={`h-6 w-6 ${
                      isCurrent ? "text-white" : "text-white/50"
                    }`}
                  />
                )}
              </motion.div>

              <motion.div
                className="text-center"
                animate={{
                  color: isCompleted
                    ? "rgb(16 185 129)"
                    : isCurrent
                    ? "rgb(255 255 255)"
                    : "rgb(255 255 255 / 0.5)",
                }}
              >
                <div className="text-sm font-medium">{step.label}</div>
                <div className="text-xs opacity-70">{step.description}</div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
