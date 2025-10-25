// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import { useAuth } from "@/context/AuthContext";
// import {
// 	Form,
// 	FormControl,
// 	FormField,
// 	FormItem,
// 	FormLabel,
// 	FormMessage,
// } from "@/components/ui/form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Loader2 } from "lucide-react";

// const LoginForm = () => {
// 	const [isSubmitting, setIsSubmitting] = useState(false);
// 	const { login: loginUser } = useAuth();
// 	const navigate = useNavigate();

// 	const form = useForm({
// 		defaultValues: {
// 			email: "",
// 			password: "",
// 		},
// 	});

// 	const onSubmit = async (data) => {
// 		setIsSubmitting(ture)

// 		try {
// 			const result = await loginUser(data)

// 			if (result.success) {
// 				toast.success("Login successful!");
// 				navigate("/");
// 			}
// 			else {
// 				toast.error(result.message || "Registration failed!");
// 			}
// 		} catch (err) {
// 			console.error("Registration error:", err);
// 			toast.error("Something went wrong!");
// 		} finally {
// 			setIsSubmitting(false)
// 		}
// 	}

// 	return (
// 		<div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow">
// 			<div className="text-center">
// 				<h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
// 				<p className="text-gray-600">Sign in to continue</p>
// 			</div>

// 			<Form {...form}>
// 				<form onSubmit={form.handleSubmit(onsubmit)} className="space-y-5">

// 					<FormField
// 						name="email"
// 						control={form.control}
// 						rules={{
// 							required: "Email is required",
// 							pattern: {
// 								value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
// 								message: "Invalid email format",
// 							},
// 						}}
// 						render={({ field }) => (
// 							<FormItem>
// 								<FormLabel>Email</FormLabel>
// 								<FormControl>
// 									<Input type="email" placeholder="you@example.com" {...field} />
// 								</FormControl>
// 								<FormMessage />
// 							</FormItem>
// 						)}
// 					/>

// 					<FormField
// 						name="password"
// 						control={form.control}
// 						rules={{
// 							required: "Password is required",
// 							minLength: {
// 								value: 6,
// 								message: "Password must be at least 6 characters long",
// 							},
// 						}}
// 						render={({ field }) => (
// 							<FormItem>
// 								<FormLabel>Password</FormLabel>
// 								<FormControl>
// 									<Input type="password" placeholder="********" {...field} />
// 								</FormControl>
// 								<FormMessage />
// 							</FormItem>
// 						)}
// 					/>
// 					<div>
// 						<p
// 							onClick={() => navigate('/reset-password')}
// 							className='mb-4 text-indigo-500 curPnt'>Forgot password?</p>

// 						{/* <Button className='curPnt w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-midium'>{}</Button> */}
// 						{/* <button className='curPnt w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-midium'>{ }</button> */}
// 					</div>


// 					<Button type="submit" disabled={isSubmitting} className="w-full">
// 						{/* it will disable when the isSubmitting is true */}

// 						{
// 							isSubmitting ? (
// 								<>
// 									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
// 									Signing in...
// 								</>
// 							) : (
// 								"Sign In"
// 							)
// 						}
// 					</Button>
// 				</form>

// 			</Form>
// 			<div className="text-center text-sm">
// 				New Member?{" "}
// 				<Link to="/sign-up" className="text-blue-600 hover:underline">
// 					Sign Up
// 				</Link>
// 			</div>
// 		</div>
// 	);
// }

// export default LoginForm


















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
// import { Loader2 } from "lucide-react";

// const LoginForm = () => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { login: loginUser } = useAuth();
//   const navigate = useNavigate();

//   const form = useForm({
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const onSubmit = async (data) => {
//     setIsSubmitting(true); // Fixed typo: "ture" -> "true"

//     try {
//       const result = await loginUser(data);

//       if (result.success) {
//         toast.success("Login successful!");
//         navigate("/");
//       } else {
//         toast.error(result.message || "Login failed!"); // Fixed: "Registration failed" -> "Login failed"
//       }
//     } catch (err) {
//       console.error("Login error:", err); // Fixed: "Registration error" -> "Login error"
//       toast.error("Something went wrong!");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow">
//       <div className="text-center">
//         <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
//         <p className="text-gray-600">Sign in to continue</p>
//       </div>

//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5"> {/* Fixed: "onsubmit" -> "onSubmit" */}
//           <FormField
//             name="email"
//             control={form.control}
//             rules={{
//               required: "Email is required",
//               pattern: {
//                 value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
//                 message: "Invalid email format",
//               },
//             }}
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input type="email" placeholder="you@example.com" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             name="password"
//             control={form.control}
//             rules={{
//               required: "Password is required",
//               minLength: {
//                 value: 6,
//                 message: "Password must be at least 6 characters long",
//               },
//             }}
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Password</FormLabel>
//                 <FormControl>
//                   <Input type="password" placeholder="********" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <div className="text-right">
//             <Link 
//               to="/forgot-password" 
//               className="text-sm text-indigo-600 hover:text-indigo-500 hover:underline cursor-pointer"
//             >
//               Forgot password?
//             </Link>
//           </div>

//           <Button type="submit" disabled={isSubmitting} className="w-full">
//             {isSubmitting ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Signing in...
//               </>
//             ) : (
//               "Sign In"
//             )}
//           </Button>
//         </form>
//       </Form>

// 		{/*lassName="text-blue-600 hover:underline" */}
//       <div className="text-center text-sm">
//         New Member?{" "}
//         <Link to="/sign-up" >
//           Sign Up
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;













// import React, { useState } from "react";
// import { useNavigate, Link, useLocation } from "react-router-dom";
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
// import { Loader2 } from "lucide-react";

// const LoginForm = () => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { login: loginUser } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Get the page user was trying to access before being redirected to login
//   const from = location.state?.from?.pathname || "/";

//   const form = useForm({
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const onSubmit = async (data) => {
//     setIsSubmitting(true);

//     try {
//       const result = await loginUser(data);

//       if (result.success) {
//         toast.success("Login successful!");
//         // Redirect to the page user was trying to access, or home
//         navigate(from, { replace: true });
//       } else {
//         toast.error(result.message || "Login failed!");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       toast.error("Something went wrong!");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow">
//       <div className="text-center">
//         <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
//         <p className="text-gray-600">Sign in to continue</p>
//         {/* Show message if user was redirected from protected route */}
//         {/* {location.state?.from && (
//           <p className="text-sm text-amber-600 mt-2">
//             Please sign in to access that page
//           </p>
//         )} */}
//       </div>

//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
//           <FormField
//             name="email"
//             control={form.control}
//             rules={{
//               required: "Email is required",
//               pattern: {
//                 value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
//                 message: "Invalid email format",
//               },
//             }}
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input type="email" placeholder="you@example.com" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             name="password"
//             control={form.control}
//             rules={{
//               required: "Password is required",
//               minLength: {
//                 value: 6,
//                 message: "Password must be at least 6 characters long",
//               },
//             }}
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Password</FormLabel>
//                 <FormControl>
//                   <Input type="password" placeholder="********" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <div className="text-right">
//             <Link 
//               to="/forgot-password" 
//               className="text-sm text-indigo-600 hover:text-indigo-500 hover:underline cursor-pointer"
//             >
//               Forgot password?
//             </Link>
//           </div>

//           <Button type="submit" disabled={isSubmitting} className="w-full">
//             {isSubmitting ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Signing in...
//               </>
//             ) : (
//               "Sign In"
//             )}
//           </Button>
//         </form>
//       </Form>

//       <div className="text-center text-sm">
//         New Member?{" "}
//         <Link to="/sign-up" className="text-blue-600 hover:underline">
//           Sign Up
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;










import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Loader2, LogIn, Mail, Lock } from "lucide-react";

// Zod validation schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format")
    .toLowerCase(),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login: loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the page user was trying to access before being redirected to login
  const from = location.state?.from?.pathname || "/";

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const result = await loginUser(data);

      if (result.success) {
        toast.success("Login successful!");
        // Redirect to the page user was trying to access, or home
        navigate(from, { replace: true });
      } else {
        toast.error(result.message || "Login failed!");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
        <p className="text-gray-600">Sign in to continue</p>
        {location.state?.from && (
          <p className="text-sm text-amber-600 mt-2">
            Please sign in to access that page
          </p>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      type="email" 
                      placeholder="you@example.com" 
                      className="pl-10"
                      {...field} 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      type="password" 
                      placeholder="Enter your password" 
                      className="pl-10"
                      {...field} 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link 
              to="/forgot-password" 
              className="text-sm text-indigo-600 hover:text-indigo-500 hover:underline cursor-pointer"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </>
            )}
          </Button>
        </form>
      </Form>

      {/* Sign Up Link */}
      <div className="text-center text-sm">
        New Member?{" "}
        <Link to="/sign-up" className="text-blue-600 hover:underline font-medium">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;








