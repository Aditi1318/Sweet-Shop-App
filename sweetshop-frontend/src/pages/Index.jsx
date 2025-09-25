import React from "react";
import {Link} from "react-router-dom";
import {Button} from "../components/ui/Button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../components/ui/Card";
import {Badge} from "../components/ui/Badge";
import {Candy, ShoppingCart, Users, Sparkles, Mail, Phone, MapPin} from "lucide-react";
import {Typewriter} from "react-simple-typewriter";

const Index = () => {
    return (
        <div className="min-h-screen bg-gradient-hero flex flex-col">
            {/* Hero Section */}
            <div className="relative flex min-h-screen items-center justify-center px-4 bg-gradient-to-br from-pink-500 via-rose-400 to-orange-300">
                {/* Floating candies background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="animate-bounce-slow absolute top-10 left-10 text-white/30">
                        <Candy className="h-12 w-12" />
                    </div>
                    <div className="animate-bounce-slow absolute bottom-20 right-12 text-white/20 delay-200">
                        <Candy className="h-16 w-16" />
                    </div>
                    <div className="animate-bounce-slow absolute top-1/3 right-1/4 text-white/25 delay-500">
                        <Candy className="h-10 w-10" />
                    </div>
                </div>

                {/* Main content */}
                <div className="relative text-center max-w-4xl mx-auto">
                    <div className="mb-8">
                        <div className="flex justify-center mb-6">
                            <div className="p-6 bg-white/20 rounded-full backdrop-blur-md shadow-xl animate-pulse">
                                <Candy className="h-16 w-16 text-white" />
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-xl leading-tight">
                            <Typewriter
                                words={[
                                    "Welcome to Sweet Shop 🍭",
                                    "Delicious Treats Await 🍫",
                                    "Fresh & Handcrafted Sweets 🍩",
                                    "Taste the Magic ✨",
                                ]}
                                loop={true}
                                cursor
                                cursorStyle="|"
                                typeSpeed={100}
                                deleteSpeed={60}
                                delaySpeed={1500}
                            />
                        </h1>

                        <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto">
                            Discover a world of <span className="font-semibold text-yellow-200">delicious treats</span>,
                            <span className="font-semibold text-pink-200"> handcrafted sweets</span>, and
                            <span className="font-semibold text-rose-200"> magical confections</span>
                            that will make your taste buds dance with joy!
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/register">
                                <Button
                                    size="lg"
                                    variant="secondary"
                                    className="text-lg px-8 py-3 rounded-2xl shadow-lg transition transform hover:scale-105 hover:shadow-pink-400/50"
                                >
                                    <ShoppingCart className="mr-2 h-5 w-5" />
                                    Start Shopping
                                </Button>
                            </Link>
                            <Link to="/login">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="text-lg px-8 py-3 rounded-2xl border-white/40 text-white bg-white/10 hover:bg-white/20 transition transform hover:scale-105 hover:shadow-lg"
                                >
                                    <Users className="mr-2 h-5 w-5" />
                                    Sign In
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-background/95 backdrop-blur-sm border-t border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose Sweet Shop?</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Experience the finest selection of sweets with our premium quality treats and exceptional
                            service.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="text-center shadow-sweet hover:shadow-lg transition-smooth">
                            <CardHeader>
                                <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                                    <Sparkles className="h-6 w-6 text-primary-foreground" />
                                </div>
                                <CardTitle>Premium Quality</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">
                                    Only the finest ingredients go into our handcrafted sweets, ensuring every bite is
                                    pure magic.
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card className="text-center shadow-sweet hover:shadow-lg transition-smooth">
                            <CardHeader>
                                <div className="mx-auto w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center mb-4">
                                    <ShoppingCart className="h-6 w-6 text-secondary-foreground" />
                                </div>
                                <CardTitle>Easy Shopping</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">
                                    Browse our extensive collection and purchase your favorites with just a few clicks.
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card className="text-center shadow-sweet hover:shadow-lg transition-smooth">
                            <CardHeader>
                                <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                                    <Candy className="h-6 w-6 text-primary-foreground" />
                                </div>
                                <CardTitle>Variety & Freshness</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">
                                    From classic favorites to innovative new flavors, all made fresh daily in our
                                    kitchen.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="text-center mt-12">
                        <Badge variant="outline" className="text-lg px-6 py-2">
                            🎉 Join thousands of happy customers!
                        </Badge>
                    </div>
                </div>
            </div>

            <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 mt-auto">
                <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2">
                    {/* About Sweet Shop */}
                    <div className="pr-8">
                        <h3 className="text-xl font-semibold text-white mb-4">About Sweet Shop</h3>
                        <p className="text-sm max-w-md">
                            At Sweet Shop, we bring happiness with every bite. From traditional sweets to modern
                            delights, all our products are handcrafted fresh daily. Your sweetest moments, our sweetest
                            creations. 🍭
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col items-end text-right">
                        <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-3 justify-end">
                                <Mail className="h-5 w-5 text-pink-400" />
                                <span>support@sweetshop.com</span>
                            </li>
                            <li className="flex items-center gap-3 justify-end">
                                <Phone className="h-5 w-5 text-pink-400" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-3 justify-end">
                                <MapPin className="h-5 w-5 text-pink-400" />
                                <span>123 Sweet Street, Candy City, India</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Copyright */}
                <div className="border-t border-gray-800 text-center py-4 text-sm text-gray-500">
                    © {new Date().getFullYear()} Sweet Shop. All Rights Reserved.
                </div>
            </footer>
        </div>
    );
};

export default Index;
