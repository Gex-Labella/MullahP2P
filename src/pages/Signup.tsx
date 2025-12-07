/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Shield,
  Wallet2,
  Sparkles,
  Globe,
  Zap,
  UserPlus,
  ArrowRight,
  Check,
  CheckCircle2,
  Info,
  AlertTriangle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { ParticleBackground } from "../components/ParticleBackground";
import { GlassmorphismCard } from "../components/GlassmorphismCard";
import { BlockchainVisualizer } from "../components/BlockchainVisualizer";
import { useStarknet } from "../contexts";

export default function Signup() {
  const navigate = useNavigate();
  const { connectWallet } = useStarknet();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [showSuccessAnim, setShowSuccessAnim] = useState(false);
  const [step, setStep] = useState(1);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptUpdates, setAcceptUpdates] = useState(true);

  // Password strength checker
  const getPasswordStrength = (
    pass: string
  ): {
    score: number;
    color: string;
    text: string;
  } => {
    if (!pass) return { score: 0, color: "bg-slate-200", text: "" };

    let score = 0;
    // Length check
    if (pass.length >= 8) score += 1;
    // Contains uppercase
    if (/[A-Z]/.test(pass)) score += 1;
    // Contains lowercase
    if (/[a-z]/.test(pass)) score += 1;
    // Contains number
    if (/[0-9]/.test(pass)) score += 1;
    // Contains special char
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    const colors = [
      "bg-red-500",
      "bg-red-500",
      "bg-yellow-500",
      "bg-yellow-500",
      "bg-emerald-500",
      "bg-emerald-500",
    ];

    const texts = ["", "Weak", "Weak", "Fair", "Strong", "Very Strong"];

    return {
      score,
      color: colors[score],
      text: texts[score],
    };
  };

  const passwordStrength = getPasswordStrength(password);

  // Email validation
  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!fullName.trim()) {
        toast.error("Please enter your full name");
        return;
      }

      if (!email.trim() || !isEmailValid(email)) {
        toast.error("Please enter a valid email address");
        return;
      }

      setStep(2);
    }
  };

  const handlePrevStep = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  // Signup functionality
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (passwordStrength.score < 3) {
      toast.error("Please use a stronger password");
      return;
    }

    if (!acceptTerms) {
      toast.error("You must accept the Terms of Service");
      return;
    }

    setIsRegistering(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1800));

      toast.success("🎉 Account created successfully!");
      setShowSuccessAnim(true);

      // Delay navigation
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsRegistering(false);
    }
  };

  // Connect wallet for quicker signup
  const handleWalletConnect = async () => {
    try {
      await connectWallet();
      toast.success("🦊 Wallet connected successfully!");
      setStep(2);
    } catch (error: unknown) {
      let errorMessage = "Failed to connect wallet";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <ParticleBackground />
      <BlockchainVisualizer />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`gradient-orb-${i}`}
            className="absolute rounded-full opacity-20 blur-3xl"
            style={{
              background: `linear-gradient(135deg, ${
                i === 0
                  ? "#3b82f6, #10b981"
                  : i === 1
                  ? "#8b5cf6, #ec4899"
                  : "#f59e0b, #ef4444"
              })`,
              width: Math.random() * 400 + 200,
              height: Math.random() * 400 + 200,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50, 0],
              x: [0, Math.random() * 100 - 50, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10"
      >
        {/* Header */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
          className="mb-8 text-center relative z-20"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              animate={{
                rotate: 360,
                boxShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.5)",
                  "0 0 40px rgba(16, 185, 129, 0.5)",
                  "0 0 20px rgba(139, 92, 246, 0.5)",
                  "0 0 20px rgba(59, 130, 246, 0.5)",
                ],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                boxShadow: { duration: 4, repeat: Infinity },
              }}
              className="mr-4 p-3 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500"
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 784 784"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M392 784C608.569 784 784 608.569 784 392C784 175.431 608.569 0 392 0C175.431 0 0 175.431 0 392C0 608.569 175.431 784 392 784Z"
                  fill="currentColor"
                />
                <path
                  d="M406.24 97.9999V315.31L588.3 395.65L406.24 97.9999Z"
                  fill="white"
                  fillOpacity="0.602"
                />
                <path
                  d="M406.24 97.9999L224.16 395.65L406.24 315.31V97.9999Z"
                  fill="white"
                />
                <path
                  d="M406.24 537.19V685.97L588.35 431.23L406.24 537.19Z"
                  fill="white"
                  fillOpacity="0.602"
                />
                <path
                  d="M406.24 685.97V537.18L224.16 431.23L406.24 685.97Z"
                  fill="white"
                />
                <path
                  d="M406.24 503.47L588.3 397.5L406.24 317.21V503.47Z"
                  fill="white"
                  fillOpacity="0.2"
                />
                <path
                  d="M224.16 397.5L406.24 503.47V317.21L224.16 397.5Z"
                  fill="white"
                  fillOpacity="0.602"
                />
              </svg>
            </motion.div>
            <motion.h1
              className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              P2P Mullah
            </motion.h1>
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="ml-3"
            >
              <Sparkles className="h-10 w-10 text-yellow-400" />
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex items-center justify-center space-x-6 text-white/80"
          >
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-blue-400" />
              <span>Multi-Chain</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-emerald-400" />
              <span>Instant Transfer</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-purple-400" />
              <span>Secure</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Signup Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
          className="w-full max-w-lg relative z-20"
        >
          <GlassmorphismCard>
            <Card className="border-0 bg-transparent shadow-none">
              <CardHeader className="text-center p-8 pb-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="mx-auto h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center mb-6 shadow-2xl"
                >
                  <UserPlus className="h-10 w-10 text-white" />
                </motion.div>
                <CardTitle className="text-4xl text-white mb-2">
                  Create Account
                </CardTitle>
                <CardDescription className="text-xl text-white/70">
                  Join the future of decentralized finance
                </CardDescription>
              </CardHeader>

              <CardContent className="p-8 pt-4 space-y-6">
                <AnimatePresence mode="wait">
                  {showSuccessAnim ? (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="flex flex-col items-center justify-center py-8"
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 2,
                          repeat: 3,
                          ease: "easeInOut",
                        }}
                        className="w-24 h-24 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full flex items-center justify-center mb-4"
                      >
                        <motion.div
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          <svg
                            className="w-12 h-12 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <motion.path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </motion.div>
                      </motion.div>
                      <motion.h3
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl font-bold text-white mb-2"
                      >
                        Registration Successful! 🚀
                      </motion.h3>
                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-white/70 text-center"
                      >
                        Redirecting to login page...
                      </motion.p>
                    </motion.div>
                  ) : step === 1 ? (
                    <motion.div
                      key="step-1"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="space-y-6">
                        {/* Step indicator */}
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center">
                            <div className="bg-gradient-to-r from-blue-500 to-emerald-500 w-8 h-8 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold">1</span>
                            </div>
                            <span className="ml-2 text-white font-medium">
                              Basic Info
                            </span>
                          </div>
                          <div className="flex items-center">
                            <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center">
                              <span className="text-white/70 font-bold">2</span>
                            </div>
                            <span className="ml-2 text-white/50 font-medium">
                              Security
                            </span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {/* Quick signup with wallet */}
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              onClick={handleWalletConnect}
                              className="w-full bg-gradient-to-r from-orange-500/80 to-amber-500/80 hover:from-orange-600/80 hover:to-amber-600/80 text-white h-14 text-base group"
                            >
                              <Wallet2 className="h-5 w-5 mr-2 group-hover:animate-pulse" />
                              Quick Signup with Wallet Connection
                            </Button>
                          </motion.div>

                          <div className="relative flex py-4 items-center">
                            <div className="flex-grow border-t border-white/20"></div>
                            <span className="flex-shrink mx-4 text-white/60">
                              or sign up with email
                            </span>
                            <div className="flex-grow border-t border-white/20"></div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <Label
                              htmlFor="fullName"
                              className="text-white/90 flex items-center"
                            >
                              <User className="h-4 w-4 mr-2" />
                              Full Name
                            </Label>
                            <Input
                              id="fullName"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              placeholder="Enter your full name"
                              className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400/30 h-12 backdrop-blur-sm"
                            />
                          </div>

                          <div>
                            <Label
                              htmlFor="email"
                              className="text-white/90 flex items-center"
                            >
                              <Mail className="h-4 w-4 mr-2" />
                              Email Address
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Enter your email address"
                              className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400/30 h-12 backdrop-blur-sm"
                            />
                          </div>
                        </div>

                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            onClick={handleNextStep}
                            className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white h-14 text-lg group"
                          >
                            Continue
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </motion.div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="step-2"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                    >
                      <form onSubmit={handleSignup} className="space-y-6">
                        {/* Step indicator */}
                        <div className="flex items-center justify-between mb-6">
                          <div
                            className="flex items-center cursor-pointer"
                            onClick={handlePrevStep}
                          >
                            <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center">
                              <span className="text-white/70 font-bold">1</span>
                            </div>
                            <span className="ml-2 text-white/50 font-medium">
                              Basic Info
                            </span>
                          </div>
                          <div className="flex items-center">
                            <div className="bg-gradient-to-r from-blue-500 to-emerald-500 w-8 h-8 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold">2</span>
                            </div>
                            <span className="ml-2 text-white font-medium">
                              Security
                            </span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <Label
                              htmlFor="password"
                              className="text-white/90 flex items-center"
                            >
                              <Lock className="h-4 w-4 mr-2" />
                              Create Password
                            </Label>
                            <div className="relative mt-2">
                              <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Create a secure password"
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400/30 h-12 pr-12 backdrop-blur-sm"
                              />
                              <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/50 hover:text-white/80"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-5 w-5" />
                                ) : (
                                  <Eye className="h-5 w-5" />
                                )}
                              </button>
                            </div>

                            {/* Password strength indicator */}
                            {password && (
                              <div className="mt-2 space-y-1">
                                <div className="flex w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                  <motion.div
                                    className={`${passwordStrength.color}`}
                                    initial={{ width: 0 }}
                                    animate={{
                                      width: `${passwordStrength.score * 20}%`,
                                    }}
                                    transition={{ duration: 0.3 }}
                                  />
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                  <span className="text-white/70">
                                    {passwordStrength.text && (
                                      <span
                                        className={`font-medium ${
                                          passwordStrength.score <= 2
                                            ? "text-red-400"
                                            : passwordStrength.score === 3
                                            ? "text-yellow-400"
                                            : "text-emerald-400"
                                        }`}
                                      >
                                        {passwordStrength.text}
                                      </span>
                                    )}
                                  </span>
                                  {passwordStrength.score < 3 && (
                                    <span className="text-white/70 flex items-center">
                                      <Info className="h-3 w-3 mr-1" />
                                      Use 8+ chars with letters, numbers &
                                      symbols
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>

                          <div>
                            <Label
                              htmlFor="confirmPassword"
                              className="text-white/90 flex items-center"
                            >
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              Confirm Password
                            </Label>
                            <div className="relative mt-2">
                              <Input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) =>
                                  setConfirmPassword(e.target.value)
                                }
                                placeholder="Repeat your password"
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400/30 h-12 pr-12 backdrop-blur-sm"
                              />
                              <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/50 hover:text-white/80"
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                              >
                                {showConfirmPassword ? (
                                  <EyeOff className="h-5 w-5" />
                                ) : (
                                  <Eye className="h-5 w-5" />
                                )}
                              </button>
                            </div>
                            {password &&
                              confirmPassword &&
                              password !== confirmPassword && (
                                <p className="mt-1 text-red-400 text-sm flex items-center">
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                  Passwords don't match
                                </p>
                              )}
                          </div>
                        </div>

                        <div className="space-y-3 pt-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="terms"
                              checked={acceptTerms}
                              onCheckedChange={(checked) => {
                                setAcceptTerms(checked === true);
                              }}
                              className="bg-white/10 border-white/30 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                            />
                            <Label
                              htmlFor="terms"
                              className="text-sm text-white/80 leading-tight cursor-pointer"
                            >
                              I agree to the{" "}
                              <a
                                href="#"
                                className="text-blue-400 hover:underline"
                              >
                                Terms of Service
                              </a>{" "}
                              and{" "}
                              <a
                                href="#"
                                className="text-blue-400 hover:underline"
                              >
                                Privacy Policy
                              </a>
                            </Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="updates"
                              checked={acceptUpdates}
                              onCheckedChange={(checked) => {
                                setAcceptUpdates(checked === true);
                              }}
                              className="bg-white/10 border-white/30 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                            />
                            <Label
                              htmlFor="updates"
                              className="text-sm text-white/80 cursor-pointer"
                            >
                              Send me updates about new features and
                              announcements
                            </Label>
                          </div>
                        </div>

                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="pt-2"
                        >
                          <Button
                            type="submit"
                            disabled={isRegistering || !acceptTerms}
                            className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white h-14 text-lg shadow-lg shadow-blue-500/20 hover:shadow-emerald-500/20 transition-all duration-300"
                          >
                            {isRegistering ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                                className="h-6 w-6 border-2 border-white border-t-transparent rounded-full mr-3"
                              />
                            ) : (
                              <UserPlus className="h-6 w-6 mr-3" />
                            )}
                            {isRegistering
                              ? "Creating Account..."
                              : "Create Account"}
                          </Button>
                        </motion.div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="text-center text-white/60 pt-4">
                  Already have an account?{" "}
                  <button
                    onClick={() => navigate("/login")}
                    className="text-blue-400 hover:text-blue-300 font-medium underline"
                  >
                    Sign in here
                  </button>
                </div>
              </CardContent>
            </Card>
          </GlassmorphismCard>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-12 text-center text-white/50 relative z-20 space-y-2"
        >
          <p>© 2025 P2P Mullah byTKC.</p>
          <motion.p
            animate={{
              scale: [1, 1.05, 1],
              color: [
                "rgb(255 255 255 / 0.5)",
                "rgb(59 130 246)",
                "rgb(255 255 255 / 0.5)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="flex items-center justify-center space-x-2"
          >
            <span>Built for the future</span>
            <Zap className="h-4 w-4" />
            <span>Secured by StarkNet</span>
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}
