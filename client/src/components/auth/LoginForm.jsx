import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
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
import { Loader2 } from "lucide-react";

const LoginForm = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { login: loginUser } = useAuth();
	const navigate = useNavigate();

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data) => {
		setIsSubmitting(ture)

		try {
			const result = await loginUser(data)

			if (result.success) {
				toast.success("Login successful!");
				navigate("/");
			}
			else {
				toast.error(result.message || "Registration failed!");
			}
		} catch (err) {
			console.error("Registration error:", err);
			toast.error("Something went wrong!");
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow">
			<div className="text-center">
				<h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
				<p className="text-gray-600">Sign in to continue</p>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onsubmit)} className="space-y-5">

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
										<div>
											<p
                onClick={() => navigate('/reset-password')}
                 className='mb-4 text-indigo-500 curPnt'>Forgot password?</p>

                {/* <Button className='curPnt w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-midium'>{}</Button> */}
								<button className='curPnt w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-midium'>{}</button>
										</div>
										

					<Button type="submit" disabled={isSubmitting} className="w-full">
						{/* it will disable when the isSubmitting is true */}

						{
							isSubmitting ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Signing in...
								</>
							) : (
								"Sign In"
							)
						}
					</Button>
				</form>

			</Form>
			<div className="text-center text-sm">
				New Member?{" "}
				<Link to="/sign-in" className="text-blue-600 hover:underline">
					Sign Up
				</Link>
			</div>
		</div>
	);
}

export default LoginForm
