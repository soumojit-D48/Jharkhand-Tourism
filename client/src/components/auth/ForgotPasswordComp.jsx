// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import { useAuth } from "@/context/AuthContext";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Loader2, ArrowLeft } from "lucide-react";

// const ForgotPasswordComp = () => {
//   const [step, setStep] = useState(1); // 1: email, 2: otp + new password
//   const [email, setEmail] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { sendResetOtp, resetPassword } = useAuth();
//   const navigate = useNavigate();

//   // Form for email step
//   const emailForm = useForm({
//     defaultValues: {
//       email: "",
//     },
//   });

//   // Form for OTP + new password step
//   const resetForm = useForm({
//     defaultValues: {
//       otp: "",
//       newPassword: "",
//       confirmPassword: "",
//     },
//   });

//   const onSendOtp = async (data) => {
//     setIsSubmitting(true);
    
//     try {
//       const result = await sendResetOtp(data.email);
      
//       if (result.success) {
//         setEmail(data.email);
//         setStep(2);
//         toast.success("OTP sent to your email!");
//       } else {
//         toast.error(result.message || "Failed to send OTP!");
//       }
//     } catch (err) {
//       console.error("Send OTP error:", err);
//       toast.error("Something went wrong!");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const onResetPassword = async (data) => {
//     if (data.newPassword !== data.confirmPassword) {
//       toast.error("Passwords don't match!");
//       return;
//     }

//     setIsSubmitting(true);
    
//     try {
//       const resetData = {
//         email: email,
//         otp: data.otp,
//         newPassword: data.newPassword,
//       };
      
//       const result = await resetPassword(resetData);
      
//       if (result.success) {
//         toast.success("Password reset successful!");
//         navigate("/sign-in");
//       } else {
//         toast.error(result.message || "Password reset failed!");
//       }
//     } catch (err) {
//       console.error("Reset password error:", err);
//       toast.error("Something went wrong!");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const goBack = () => {
//     if (step === 2) {
//       setStep(1);
//       resetForm.reset();
//     } else {
//       navigate("/sign-in");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center ">
//     <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow">
//       <div className="flex items-center mb-4">
//         {/* <button
//           onClick={goBack}
//           className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//         >
//           <ArrowLeft className="h-5 w-5" />
//         </button> */}
//         <div className="text-center flex-1">
//           <h1 className="text-3xl font-bold mb-2">
//             {step === 1 ? "Forgot Password" : "Reset Password"}
//           </h1>
//           <p className="text-gray-600">
//             {step === 1 
//               ? "Enter your email to receive a reset code" 
//               : "Enter the OTP and your new password"
//             }
//           </p>
//         </div>
//       </div>

//       {step === 1 ? (
//         <Form {...emailForm}>
//           <form onSubmit={emailForm.handleSubmit(onSendOtp)} className="space-y-5">
//             <FormField
//               name="email"
//               control={emailForm.control}
//               rules={{
//                 required: "Email is required",
//                 pattern: {
//                   value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
//                   message: "Invalid email format",
//                 },
//               }}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email Address</FormLabel>
//                   <FormControl>
//                     <Input 
//                       type="email" 
//                       placeholder="Enter your email address" 
//                       {...field} 
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <Button type="submit" disabled={isSubmitting} className="w-full">
//               {isSubmitting ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Sending OTP...
//                 </>
//               ) : (
//                 "Send Reset Code"
//               )}
//             </Button>
//           </form>
//         </Form>
//       ) : (
//         <Form {...resetForm}>
//           <form onSubmit={resetForm.handleSubmit(onResetPassword)} className="space-y-5">
//             <div className="text-sm text-gray-600 mb-4">
//               We sent a reset code to: <strong>{email}</strong>
//             </div>

//             <FormField
//               name="otp"
//               control={resetForm.control}
//               rules={{
//                 required: "OTP is required",
//                 pattern: {
//                   value: /^\d{6}$/,
//                   message: "OTP must be 6 digits",
//                 },
//               }}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Verification Code</FormLabel>
//                   <FormControl>
//                     <Input 
//                       type="text" 
//                       placeholder="Enter 6-digit code" 
//                       maxLength={6}
//                       {...field} 
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               name="newPassword"
//               control={resetForm.control}
//               rules={{
//                 required: "New password is required",
//                 minLength: {
//                   value: 6,
//                   message: "Password must be at least 6 characters long",
//                 },
//               }}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>New Password</FormLabel>
//                   <FormControl>
//                     <Input 
//                       type="password" 
//                       placeholder="Enter new password" 
//                       {...field} 
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               name="confirmPassword"
//               control={resetForm.control}
//               rules={{
//                 required: "Please confirm your password",
//                 minLength: {
//                   value: 6,
//                   message: "Password must be at least 6 characters long",
//                 },
//               }}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Confirm New Password</FormLabel>
//                   <FormControl>
//                     <Input 
//                       type="password" 
//                       placeholder="Confirm new password" 
//                       {...field} 
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <Button type="submit" disabled={isSubmitting} className="w-full">
//               {isSubmitting ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Resetting Password...
//                 </>
//               ) : (
//                 "Reset Password"
//               )}
//             </Button>

//             <div className="text-center">
//               <button
//                 type="button"
//                 onClick={() => onSendOtp({ email })}
//                 disabled={isSubmitting}
//                 className="text-sm text-indigo-600 hover:text-indigo-500 hover:underline disabled:opacity-50"
//               >
//                 Resend Code
//               </button>
//             </div>
//           </form>
//         </Form>
//       )}

//       <div className="text-center text-sm">
//         Remember your password?{" "}
//         <Link to="/sign-in" className="text-blue-600 hover:underline">
//           Back to Login
//         </Link>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default ForgotPasswordComp;


























import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, ArrowLeft } from "lucide-react";

// Zod schema for email step
const emailSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format"),
});

// Zod schema for reset password step
const resetSchema = z.object({
  otp: z
    .string()
    .min(1, "OTP is required")
    .regex(/^\d{6}$/, "OTP must be 6 digits"),
  newPassword: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
  confirmPassword: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const ForgotPasswordComp = () => {
  const [step, setStep] = useState(1); // 1: email, 2: otp + new password
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { sendResetOtp, resetPassword } = useAuth();
  const navigate = useNavigate();

  // Form for email step
  const emailForm = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  // Form for OTP + new password step
  const resetForm = useForm({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSendOtp = async (data) => {
    setIsSubmitting(true);
    
    try {
      const result = await sendResetOtp(data.email);
      
      if (result.success) {
        setEmail(data.email);
        setStep(2);
        toast.success("OTP sent to your email!");
      } else {
        toast.error(result.message || "Failed to send OTP!");
      }
    } catch (err) {
      console.error("Send OTP error:", err);
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onResetPassword = async (data) => {
    setIsSubmitting(true);
    
    try {
      const resetData = {
        email: email,
        otp: data.otp,
        newPassword: data.newPassword,
      };
      
      const result = await resetPassword(resetData);
      
      if (result.success) {
        toast.success("Password reset successful!");
        navigate("/sign-in");
      } else {
        toast.error(result.message || "Password reset failed!");
      }
    } catch (err) {
      console.error("Reset password error:", err);
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    if (step === 2) {
      setStep(1);
      resetForm.reset();
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow">
        <div className="flex items-center mb-4">
          {/* <button
            onClick={goBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button> */}
          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold mb-2">
              {step === 1 ? "Forgot Password" : "Reset Password"}
            </h1>
            <p className="text-gray-600">
              {step === 1 
                ? "Enter your email to receive a reset code" 
                : "Enter the OTP and your new password"
              }
            </p>
          </div>
        </div>

        {step === 1 ? (
          <Form {...emailForm}>
            <form onSubmit={emailForm.handleSubmit(onSendOtp)} className="space-y-5">
              <FormField
                name="email"
                control={emailForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="Enter your email address" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  "Send Reset Code"
                )}
              </Button>
            </form>
          </Form>
        ) : (
          <Form {...resetForm}>
            <form onSubmit={resetForm.handleSubmit(onResetPassword)} className="space-y-5">
              <div className="text-sm text-gray-600 mb-4">
                We sent a reset code to: <strong>{email}</strong>
              </div>

              <FormField
                name="otp"
                control={resetForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification Code</FormLabel>
                    <FormControl>
                      <Input 
                        type="text" 
                        placeholder="Enter 6-digit code" 
                        maxLength={6}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="newPassword"
                control={resetForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Enter new password" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="confirmPassword"
                control={resetForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Confirm new password" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Resetting Password...
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => onSendOtp({ email })}
                  disabled={isSubmitting}
                  className="text-sm text-indigo-600 hover:text-indigo-500 hover:underline disabled:opacity-50"
                >
                  Resend Code
                </button>
              </div>
            </form>
          </Form>
        )}

        <div className="text-center text-sm">
          Remember your password?{" "}
          <Link to="/sign-in" className="text-blue-600 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordComp;