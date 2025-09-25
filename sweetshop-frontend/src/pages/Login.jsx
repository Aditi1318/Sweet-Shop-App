// import React, {useState} from "react";
// import {Link, useNavigate} from "react-router-dom";
// import {Button} from "@/components/ui/Button";
// import {Input} from "@/components/ui/Input";
// import {Label} from "@/components/ui/Label";
// import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/Card";
// import {useAuth} from "@/contexts/AuthContext";
// import {Candy, Eye, EyeOff} from "lucide-react";

// const Login = () => {
//     const [formData, setFormData] = useState({
//         email: "",
//         password: "",
//     });
//     const [showPassword, setShowPassword] = useState(false);
//     const [errors, setErrors] = useState({});
//     const {login, loading} = useAuth();
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const {name, value} = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//         // Clear error when user starts typing
//         if (errors[name]) {
//             setErrors((prev) => ({
//                 ...prev,
//                 [name]: "",
//             }));
//         }
//     };

//     const validateForm = () => {
//         const newErrors = {};

//         if (!formData.email.trim()) {
//             newErrors.email = "Email is required";
//         } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//             newErrors.email = "Email is invalid";
//         }

//         if (!formData.password) {
//             newErrors.password = "Password is required";
//         }

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!validateForm()) return;

//         const result = await login(formData);
//         if (result.success) {
//             navigate("/dashboard");
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
//             <Card className="w-full max-w-md shadow-sweet">
//                 <CardHeader className="text-center">
//                     <div className="flex justify-center mb-4">
//                         <div className="p-3 bg-gradient-primary rounded-full">
//                             <Candy className="h-8 w-8 text-primary-foreground" />
//                         </div>
//                     </div>
//                     <CardTitle className="text-2xl font-bold">Welcome Back!</CardTitle>
//                     <CardDescription>Sign in to access your sweet shop account</CardDescription>
//                 </CardHeader>

//                 <form onSubmit={handleSubmit}>
//                     <CardContent className="space-y-4">
//                         <div className="space-y-2">
//                             <Label htmlFor="email">Email</Label>
//                             <Input
//                                 id="email"
//                                 name="email"
//                                 type="email"
//                                 placeholder="your@email.com"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 className={errors.email ? "border-destructive" : ""}
//                             />
//                             {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
//                         </div>

//                         <div className="space-y-2">
//                             <Label htmlFor="password">Password</Label>
//                             <div className="relative">
//                                 <Input
//                                     id="password"
//                                     name="password"
//                                     type={showPassword ? "text" : "password"}
//                                     placeholder="Enter your password"
//                                     value={formData.password}
//                                     onChange={handleChange}
//                                     className={errors.password ? "border-destructive" : ""}
//                                 />
//                                 <Button
//                                     type="button"
//                                     variant="ghost"
//                                     size="sm"
//                                     className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                                     onClick={() => setShowPassword(!showPassword)}
//                                 >
//                                     {showPassword ? (
//                                         <EyeOff className="h-4 w-4 text-muted-foreground" />
//                                     ) : (
//                                         <Eye className="h-4 w-4 text-muted-foreground" />
//                                     )}
//                                 </Button>
//                             </div>
//                             {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
//                         </div>
//                     </CardContent>

//                     <CardFooter className="flex flex-col space-y-4">
//                         <Button type="submit" className="w-full" disabled={loading}>
//                             {loading ? (
//                                 <>
//                                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                                     Signing in...
//                                 </>
//                             ) : (
//                                 "Sign In"
//                             )}
//                         </Button>

//                         <p className="text-sm text-center text-muted-foreground">
//                             Don't have an account?{" "}
//                             <Link to="/register" className="text-primary hover:underline font-medium">
//                                 Sign up here
//                             </Link>
//                         </p>
//                     </CardFooter>
//                 </form>
//             </Card>
//         </div>
//     );
// };

// export default Login;
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/Button";
import {Input} from "@/components/ui/Input";
import {Label} from "@/components/ui/Label";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/Card";
import {useAuth} from "@/contexts/AuthContext";
import {Candy, Eye, EyeOff} from "lucide-react";

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const {login, loading} = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = "Username is required";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const result = await login(formData);
        if (result.success) {
            navigate("/dashboard");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-sweet">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-gradient-primary rounded-full">
                            <Candy className="h-8 w-8 text-primary-foreground" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">Welcome Back!</CardTitle>
                    <CardDescription>Sign in to access your sweet shop account</CardDescription>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        {/* Username Field */}
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Enter your username"
                                value={formData.username}
                                onChange={handleChange}
                                className={errors.username ? "border-destructive" : ""}
                            />
                            {errors.username && <p className="text-sm text-destructive">{errors.username}</p>}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={errors.password ? "border-destructive" : ""}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-muted-foreground" />
                                    )}
                                </Button>
                            </div>
                            {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-4">
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Signing in...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>

                        <p className="text-sm text-center text-muted-foreground">
                            Don't have an account?{" "}
                            <Link to="/register" className="text-primary hover:underline font-medium">
                                Sign up here
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default Login;
