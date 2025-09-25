import React from "react";
import {Button} from "./ui/Button";
import {Badge} from "./ui/Badge";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "./ui/Card";
import {ShoppingCart, Package} from "lucide-react";
import {useAuth} from "@/contexts/AuthContext";
import {sweetsAPI} from "@/lib/api";
import {useToast} from "@/hooks/use-toast";

const SweetCard = ({sweet, onPurchase, onUpdate}) => {
    const {isAuthenticated} = useAuth();
    const {toast} = useToast();
    const [purchasing, setPurchasing] = React.useState(false);

    const handlePurchase = async () => {
        if (!isAuthenticated) {
            toast({
                title: "Login Required",
                description: "Please log in to purchase sweets.",
                variant: "destructive",
            });
            return;
        }

        try {
            setPurchasing(true);
            await sweetsAPI.purchase(sweet.id);
            toast({
                title: "Purchase Successful!",
                description: `You bought ${sweet.name}! 🍭`,
            });
            onPurchase?.(sweet);
        } catch (error) {
            toast({
                title: "Purchase Failed",
                description: error.response?.data?.message || "Could not complete purchase",
                variant: "destructive",
            });
        } finally {
            setPurchasing(false);
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
        }).format(price);
    };

    const getQuantityColor = (quantity) => {
        if (quantity === 0) return "destructive";
        if (quantity <= 5) return "secondary";
        return "default";
    };

    const getQuantityIcon = (quantity) => {
        if (quantity === 0) return "❌";
        if (quantity <= 5) return "⚠️";
        return "✅";
    };

    return (
        <Card className="h-full flex flex-col shadow-card hover:shadow-sweet transition-smooth bg-gradient-to-br from-card to-muted/30">
            {/* Sweet Image */}
            {sweet.image && (
                <div className="w-full h-40 overflow-hidden rounded-t-lg">
                    <img
                        src={sweet.image}
                        alt={sweet.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                </div>
            )}

            <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-bold text-foreground">{sweet.name}</CardTitle>
                    <Badge variant={getQuantityColor(sweet.quantity)} className="ml-2">
                        <Package className="h-3 w-3 mr-1" />
                        {sweet.quantity}
                    </Badge>
                </div>
                <CardDescription className="text-sm">
                    <Badge variant="outline" className="text-xs">
                        {sweet.category}
                    </Badge>
                </CardDescription>
            </CardHeader>

            <CardContent className="flex-1 pb-3">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">{formatPrice(sweet.price)}</span>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                            {getQuantityIcon(sweet.quantity)}
                            {sweet.quantity > 0 ? `${sweet.quantity} in stock` : "Out of stock"}
                        </span>
                    </div>

                    {sweet.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">{sweet.description}</p>
                    )}
                </div>
            </CardContent>

            <CardFooter className="pt-3">
                <Button
                    variant="purchase"
                    size="sm"
                    className="w-full"
                    disabled={sweet.quantity === 0 || purchasing}
                    onClick={handlePurchase}
                >
                    {purchasing ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Processing...
                        </>
                    ) : (
                        <>
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            {sweet.quantity === 0 ? "Out of Stock" : "Buy Now"}
                        </>
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default SweetCard;
