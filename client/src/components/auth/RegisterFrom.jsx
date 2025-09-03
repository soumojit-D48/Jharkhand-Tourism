// import React, { useState } from "react";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";

// // import {
// //     Form,
// // } from '@/components/ui/form'

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";

// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";

// import { useAuth } from "@/context/AuthContext";

// import { Input } from "../ui/input";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Alert, AlertDescription } from '@/components/ui/alert'

// const RegisterFrom = () => {
//   // const [formData, setFormData] = useState({
//   //     name: '',
//   //     email: '',
//   //     password: '',

//   // })

//   // const [error, setError] = useState('')
//   // const [loading, setLoading] = useState(false)
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const { register: registerUser } = useAuth();
//   const navigate = useNavigate();

//   const form = useForm({
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//     },
//   });

//   const onSubmit = async (data) => {
//     // e.preventDefault()
//     // setError('')

//     setIsSubmitting(true);

//     if (data.password.length < 6) {
//       // setError('Password must be atleast 6 characters')
//       toast.error("Password must be at least 6 characters long");
//       setIsSubmitting(false);
//       return;
//     }

//     // setLoading(true)

//     try {
//       const result = await registerUser(
//         // name: formData.name,
//         // email: formData.email,
//         // password: formData.password
//         data,
//       );

//       // if(result.success) {
//       //     navigate('/')
//       // } else {
//       //     setError(result.message)
//       // }
//       if (result.success) {
//         toast.success("Registration successful!");
//         navigate("/");
//       } else {
//         toast.error(result.message || "Registration failed!");
//       }
//     }
      
//     catch (err) {
//       toast.error("Something went wrong!");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   return (
//     // <div className="w-full max-w-md p-5 bg-card rounded-lg shadow-sm border">
//     //   <div className="text-center">
//     //     <h1 className="Welcome to Our"></h1>
//     //   </div>
//     // </div>

//     <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold mb-2">Create Account</h1>
//           <p className="text-gray-600">Join us and get started</p>
//         </div>

//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
//             <FormField
//               name="name"
//               control={form.control}
//               rules={{ required: "Name is required" }}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Name</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Your name" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               name="email"
//               control={form.control}
//               rules={{
//                 required: "Email is required",
//                 pattern: {
//                   value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
//                   message: "Invalid email format",
//                 },
//               }}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <FormControl>
//                     <Input placeholder="you@example.com" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               name="password"
//               control={form.control}
//               rules={{ required: "Password is required" }}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Password</FormLabel>
//                   <FormControl>
//                     <Input type="password" placeholder="********" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <Button type="submit" disabled={isSubmitting} className="w-full">
//               {isSubmitting ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
//                 </>
//               ) : (
//                 "Sign Up"
//               )}
//             </Button>
//           </form>
//         </Form>

//         <div className="text-center text-sm">
//           Already have an account?{" "}
//           <Link to="/sign-in" className="text-blue-600 hover:underline">
//             Sign In
//           </Link>
//         </div>
//       </div>
//   );
// };

// export default RegisterFrom;






// import React, { useState } from "react";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";

// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";
// import { useAuth } from "@/context/AuthContext";
// import { Input } from "../ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// const RegisterForm = () => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { register } = useAuth();
//   const navigate = useNavigate();

//   const form = useForm({
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//     },
//   });

//   const onSubmit = async (data) => {
//     setIsSubmitting(true);

//     // Password validation is now handled by form rules, but keeping this as backup
//     if (data.password.length < 6) {
//       toast.error("Password must be at least 6 characters long");
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       // Fix: Use registerUser instead of register, and pass data directly
//       const result = await register(data);

//       if (result.success) {
//         toast.success("Registration successful!");
//         navigate("/");
//       } else {
//         toast.error(result.message || "Registration failed!");
//       }
//     } catch (err) {
//       console.error("Registration error:", err);
//       toast.error("Something went wrong!");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow">
//       <div className="text-center">
//         <h1 className="text-3xl font-bold mb-2">Create Account</h1>
//         <p className="text-gray-600">Join us and get started</p>
//       </div>

//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
//           <FormField
//             name="name"
//             control={form.control}
//             rules={{ required: "Name is required" }}
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Name</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Your name" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

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
//                 message: "Password must be at least 6 characters long"
//               }
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

//           <Button type="submit" disabled={isSubmitting} className="w-full">
//             {isSubmitting ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
//               </>
//             ) : (
//               "Sign Up"
//             )}
//           </Button>
//         </form>
//       </Form>

//       <div className="text-center text-sm">
//         Already have an account?{" "}
//         <Link to="/sign-in" className="text-blue-600 hover:underline">
//           Sign In
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default RegisterForm;


import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Input } from "../ui/input";

const RegisterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register: registerUser } = useAuth(); // ✅ renamed to avoid conflict with react-hook-form
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const result = await registerUser(data); 

      if (result.success) {
        toast.success("Registration successful!");
        navigate("/");
      } else {
        toast.error(result.message || "Registration failed!");
      }
    } catch (err) {
      console.error("Registration error:", err);
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Create Account</h1>
        <p className="text-gray-600">Join us and get started</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            name="name"
            control={form.control}
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="email"
            control={form.control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Invalid email format",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="password"
            control={form.control}
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {/* it will disable when the isSubmitting is true */}
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Account...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/sign-in" className="text-blue-600 hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
