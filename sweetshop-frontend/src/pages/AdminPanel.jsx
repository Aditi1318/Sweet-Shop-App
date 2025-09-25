// src/pages/AdminPanel.jsx
import React, {useState, useEffect} from "react";
import {Button} from "@/components/ui/Button";
import {Input} from "@/components/ui/Input";
import {Label} from "@/components/ui/Label";
import {Textarea} from "@/components/ui/TextArea";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/Card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/Dialog";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/Table";
import {useToast} from "@/hooks/use-toast";
import {sweetsAPI} from "@/lib/api";
import {Edit, Trash2, PlusCircle, Package} from "lucide-react";

const AdminPanel = () => {
    const {toast} = useToast();
    const [sweets, setSweets] = useState([]);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isRestockDialogOpen, setIsRestockDialogOpen] = useState(false);
    const [currentSweet, setCurrentSweet] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        category: "",
        price: "",
        quantity: "",
        description: "",
        image: "",
    });

    const [restockQuantity, setRestockQuantity] = useState("");

    // Fetch sweets from API
    const fetchSweets = async () => {
        try {
            const res = await sweetsAPI.getAll();
            setSweets(res.data);
        } catch (err) {
            toast({title: "Error", description: "Failed to fetch sweets", variant: "destructive"});
        }
    };

    useEffect(() => {
        fetchSweets();
    }, []);

    // Handle form changes
    const handleFormChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const resetForm = () => {
        setFormData({name: "", category: "", price: "", quantity: "", description: "", image: ""});
        setCurrentSweet(null);
        setRestockQuantity("");
    };

    // Add Sweet
    const handleAddSweet = async (e) => {
        e.preventDefault();
        try {
            await sweetsAPI.create(formData);
            toast({title: "Sweet added!", description: `${formData.name} added successfully.`});
            setIsAddDialogOpen(false);
            resetForm();
            fetchSweets();
        } catch (err) {
            toast({
                title: "Error adding sweet",
                description: err.response?.data?.message || "Failed",
                variant: "destructive",
            });
        }
    };

    // Open Edit Dialog
    const openEditDialog = (sweet) => {
        setCurrentSweet(sweet);
        setFormData({
            name: sweet.name,
            category: sweet.category,
            price: sweet.price,
            quantity: sweet.quantity,
            description: sweet.description,
            image: sweet.image || "",
        });
        setIsEditDialogOpen(true);
    };

    // Edit Sweet
    const handleEditSweet = async (e) => {
        e.preventDefault();
        try {
            await sweetsAPI.update(currentSweet.id, formData);
            toast({title: "Sweet updated!", description: `${formData.name} updated successfully.`});
            setIsEditDialogOpen(false);
            resetForm();
            fetchSweets();
        } catch (err) {
            toast({
                title: "Error updating sweet",
                description: err.response?.data?.message || "Failed",
                variant: "destructive",
            });
        }
    };

    // Delete Sweet
    const handleDeleteSweet = async (id) => {
        if (!window.confirm("Are you sure you want to delete this sweet?")) return;
        try {
            await sweetsAPI.delete(id);
            toast({title: "Sweet deleted!", description: "Sweet removed successfully."});
            fetchSweets();
        } catch (err) {
            toast({
                title: "Error deleting sweet",
                description: err.response?.data?.message || "Failed",
                variant: "destructive",
            });
        }
    };

    // Open Restock Dialog
    const openRestockDialog = (sweet) => {
        setCurrentSweet(sweet);
        setRestockQuantity("");
        setIsRestockDialogOpen(true);
    };

    // Restock Sweet
    const handleRestock = async (e) => {
        e.preventDefault();
        try {
            await sweetsAPI.restock(currentSweet.id, parseInt(restockQuantity));
            toast({title: "Restocked!", description: `${restockQuantity} units added to ${currentSweet.name}`});
            setIsRestockDialogOpen(false);
            resetForm();
            fetchSweets();
        } catch (err) {
            toast({
                title: "Error restocking",
                description: err.response?.data?.message || "Failed",
                variant: "destructive",
            });
        }
    };

    return (
        <Card className="p-6 shadow-lg">
            <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-xl font-bold">Admin Panel</CardTitle>

                {/* Add Sweet Dialog */}
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="flex items-center gap-2">
                            <PlusCircle className="w-4 h-4" /> Add Sweet
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Sweet</DialogTitle>
                            <DialogDescription>
                                Fill in the sweet details including name, category, price, quantity, description, and
                                optional image URL.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleAddSweet} className="space-y-3">
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleFormChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="category">Category</Label>
                                <Input
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleFormChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="price">Price</Label>
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={handleFormChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="quantity">Quantity</Label>
                                <Input
                                    id="quantity"
                                    name="quantity"
                                    type="number"
                                    value={formData.quantity}
                                    onChange={handleFormChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleFormChange}
                                />
                            </div>
                            <div>
                                <Label htmlFor="image">Image URL</Label>
                                <Input
                                    id="image"
                                    name="image"
                                    type="text"
                                    value={formData.image}
                                    onChange={handleFormChange}
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Add Sweet
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </CardHeader>

            {/* Sweet Inventory Table */}
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sweets.map((sweet) => (
                            <TableRow key={sweet.id}>
                                <TableCell>
                                    {sweet.image ? (
                                        <img
                                            src={sweet.image}
                                            alt={sweet.name}
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                    ) : (
                                        <span className="text-gray-400">No Image</span>
                                    )}
                                </TableCell>
                                <TableCell>{sweet.name}</TableCell>
                                <TableCell>{sweet.category}</TableCell>
                                <TableCell>₹{sweet.price}</TableCell>
                                <TableCell>{sweet.quantity}</TableCell>
                                <TableCell>{sweet.description}</TableCell>
                                <TableCell className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={() => openEditDialog(sweet)}>
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => openRestockDialog(sweet)}>
                                        <Package className="w-4 h-4" />
                                    </Button>
                                    <Button variant="destructive" size="sm" onClick={() => handleDeleteSweet(sweet.id)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>

            {/* Edit Sweet Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Sweet</DialogTitle>
                        <DialogDescription>
                            Update the details of {formData.name}. You can also update the image URL.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleEditSweet} className="space-y-3">
                        <div>
                            <Label htmlFor="edit-name">Name</Label>
                            <Input
                                id="edit-name"
                                name="name"
                                value={formData.name}
                                onChange={handleFormChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="edit-category">Category</Label>
                            <Input
                                id="edit-category"
                                name="category"
                                value={formData.category}
                                onChange={handleFormChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="edit-price">Price</Label>
                            <Input
                                id="edit-price"
                                name="price"
                                type="number"
                                step="0.01"
                                value={formData.price}
                                onChange={handleFormChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="edit-quantity">Quantity</Label>
                            <Input
                                id="edit-quantity"
                                name="quantity"
                                type="number"
                                value={formData.quantity}
                                onChange={handleFormChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="edit-description">Description</Label>
                            <Textarea
                                id="edit-description"
                                name="description"
                                value={formData.description}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="edit-image">Image URL</Label>
                            <Input
                                id="edit-image"
                                name="image"
                                type="text"
                                value={formData.image}
                                onChange={handleFormChange}
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Update Sweet
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Restock Dialog */}
            <Dialog open={isRestockDialogOpen} onOpenChange={setIsRestockDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Restock Sweet</DialogTitle>
                        <DialogDescription>
                            Add inventory for {currentSweet?.name}. Current stock: {currentSweet?.quantity}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleRestock} className="space-y-3">
                        <div>
                            <Label htmlFor="restockQuantity">Quantity</Label>
                            <Input
                                id="restockQuantity"
                                name="restockQuantity"
                                type="number"
                                value={restockQuantity}
                                onChange={(e) => setRestockQuantity(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Restock
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </Card>
    );
};

export default AdminPanel;
