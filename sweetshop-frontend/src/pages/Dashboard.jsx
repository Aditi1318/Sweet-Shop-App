import React, {useState, useEffect} from "react";
import {useAuth} from "@/contexts/AuthContext";
import {sweetsAPI} from "@/lib/api";
import SweetCard from "@/components/SweetCard";
import {Input} from "@/components/ui/Input";
import {Button} from "@/components/ui/Button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/Select";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/Card";
import {Badge} from "@/components/ui/Badge";
import {Search, Filter, RefreshCw, Store} from "lucide-react";
import {useToast} from "@/hooks/Use-toast";

const Dashboard = () => {
    const {user} = useAuth();
    const {toast} = useToast();
    const [sweets, setSweets] = useState([]);
    const [filteredSweets, setFilteredSweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [priceFilter, setPriceFilter] = useState("all");

    useEffect(() => {
        fetchSweets();
    }, []);

    useEffect(() => {
        filterSweets();
    }, [sweets, searchTerm, categoryFilter, priceFilter]);

    const fetchSweets = async () => {
        try {
            setLoading(true);
            const response = await sweetsAPI.getAll();
            setSweets(response.data);
        } catch (error) {
            toast({
                title: "Error loading sweets",
                description: "Could not fetch sweets from the server",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const filterSweets = () => {
        let filtered = [...sweets];

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(
                (sweet) =>
                    sweet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    sweet.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Category filter
        if (categoryFilter !== "all") {
            filtered = filtered.filter((sweet) => sweet.category === categoryFilter);
        }

        // Price filter
        if (priceFilter !== "all") {
            switch (priceFilter) {
                case "under50":
                    filtered = filtered.filter((sweet) => sweet.price < 50);
                    break;
                case "50to100":
                    filtered = filtered.filter((sweet) => sweet.price >= 50 && sweet.price <= 100);
                    break;
                case "over100":
                    filtered = filtered.filter((sweet) => sweet.price > 100);
                    break;
                default:
                    break;
            }
        }

        setFilteredSweets(filtered);
    };

    const handlePurchase = () => {
        // Refresh sweets data after purchase
        fetchSweets();
    };

    const getUniqueCategories = () => {
        return [...new Set(sweets.map((sweet) => sweet.category))];
    };

    const getStats = () => {
        const totalSweets = sweets.length;
        const inStock = sweets.filter((sweet) => sweet.quantity > 0).length;
        const outOfStock = totalSweets - inStock;
        const categories = getUniqueCategories().length;

        return {totalSweets, inStock, outOfStock, categories};
    };

    const stats = getStats();

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-lg text-muted-foreground">Loading delicious sweets...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
            {/* Header */}
            <div className="bg-gradient-hero border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-white mb-2">Welcome to Sweet Shop! 🍭</h1>
                        <p className="text-lg text-white/90">
                            Hello {user?.username || user?.email}! Discover our amazing collection of treats.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card className="shadow-card">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Sweets</CardTitle>
                            <div className="text-2xl font-bold text-primary">{stats.totalSweets}</div>
                        </CardHeader>
                    </Card>
                    <Card className="shadow-card">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">In Stock</CardTitle>
                            <div className="text-2xl font-bold text-accent">{stats.inStock}</div>
                        </CardHeader>
                    </Card>
                    <Card className="shadow-card">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Out of Stock</CardTitle>
                            <div className="text-2xl font-bold text-destructive">{stats.outOfStock}</div>
                        </CardHeader>
                    </Card>
                    <Card className="shadow-card">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Categories</CardTitle>
                            <div className="text-2xl font-bold text-secondary">{stats.categories}</div>
                        </CardHeader>
                    </Card>
                </div>

                {/* Filters */}
                <Card className="mb-8 shadow-card">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Filter className="h-5 w-5" />
                            Search & Filter
                        </CardTitle>
                        <CardDescription>Find your perfect sweet treat</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search sweets..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>

                            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    {getUniqueCategories().map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={priceFilter} onValueChange={setPriceFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Price Range" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Prices</SelectItem>
                                    <SelectItem value="under50">Under ₹50</SelectItem>
                                    <SelectItem value="50to100">₹50 - ₹100</SelectItem>
                                    <SelectItem value="over100">Over ₹100</SelectItem>
                                </SelectContent>
                            </Select>

                            <Button variant="outline" onClick={fetchSweets} className="flex items-center gap-2">
                                <RefreshCw className="h-4 w-4" />
                                Refresh
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Results Info */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Store className="h-5 w-5 text-muted-foreground" />
                        <span className="text-lg font-medium">
                            {filteredSweets.length} sweet{filteredSweets.length !== 1 ? "s" : ""} available
                        </span>
                    </div>
                    {(searchTerm || categoryFilter !== "all" || priceFilter !== "all") && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                                setSearchTerm("");
                                setCategoryFilter("all");
                                setPriceFilter("all");
                            }}
                        >
                            Clear filters
                        </Button>
                    )}
                </div>

                {/* Sweets Grid */}
                {filteredSweets.length === 0 ? (
                    <Card className="text-center py-12 shadow-card">
                        <CardContent>
                            <div className="text-6xl mb-4">🍭</div>
                            <h3 className="text-xl font-semibold mb-2">No sweets found</h3>
                            <p className="text-muted-foreground">
                                {searchTerm || categoryFilter !== "all" || priceFilter !== "all"
                                    ? "Try adjusting your filters to find more treats!"
                                    : "Looks like our sweet inventory is empty. Check back soon!"}
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredSweets.map((sweet) => (
                            <SweetCard key={sweet.id} sweet={sweet} onPurchase={handlePurchase} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
