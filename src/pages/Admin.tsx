import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Upload,
  Plus,
  Trash2,
  ImageOff,
  Pencil,
  X,
  RefreshCw,
  ShoppingBag,
  Package,
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  storage?: string;
  ram?: string;
  description?: string;
  image?: string;
}

interface Order {
  id: string;

  product_id?: string;

  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  customer_location?: string;

  payment_method: string;

  amount: number;

  status: string;

  created_at?: string;
}

const API_URL = "https://elite-store-k5l2.onrender.com";

const Admin = () => {
  // ============================================================
  // PRODUCT STATE
  // ============================================================

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("phones");
  const [price, setPrice] = useState("");
  const [storage, setStorage] = useState("");
  const [ram, setRam] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [savedProducts, setSavedProducts] = useState<Product[]>(
    []
  );

  const [editingId, setEditingId] = useState<string | null>(
    null
  );

  // ============================================================
  // ORDER STATE
  // ============================================================

  const [orders, setOrders] = useState<Order[]>([]);

  const [loadingOrders, setLoadingOrders] =
    useState(false);

  const [updatingOrderId, setUpdatingOrderId] =
    useState<string | null>(null);

  // ============================================================
  // GENERAL LOADING
  // ============================================================

  const [loading, setLoading] = useState(false);

  // ============================================================
  // CLEAR PRODUCT FORM
  // ============================================================

  const clearForm = () => {
    setName("");
    setBrand("");
    setCategory("phones");
    setPrice("");
    setStorage("");
    setRam("");
    setDescription("");
    setImage("");
  };

  // ============================================================
  // CANCEL EDIT
  // ============================================================

  const cancelEdit = () => {
    setEditingId(null);

    clearForm();
  };

  // ============================================================
  // LOAD PRODUCTS
  // ============================================================

  const loadProducts = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/products`
      );

      if (!response.ok) {
        throw new Error(
          `Server returned ${response.status}`
        );
      }

      const data = await response.json();

      setSavedProducts(data);
    } catch (error) {
      console.error(
        "Failed to load products:",
        error
      );

      alert(
        "Failed to load products. Make sure FastAPI is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // LOAD ORDERS
  // ============================================================

  const loadOrders = async () => {
    try {
      setLoadingOrders(true);

      const token = localStorage.getItem(
        "admin_token"
      );

      const response = await fetch(
        `${API_URL}/orders`,
        {
          method: "GET",

          headers: {
            Accept: "application/json",

            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorText =
          await response.text();

        console.error(
          "Orders error:",
          errorText
        );

        throw new Error(
          `Server returned ${response.status}`
        );
      }

      const data = await response.json();

      console.log(
        "Orders loaded:",
        data
      );

      setOrders(data);
    } catch (error) {
      console.error(
        "Failed to load orders:",
        error
      );

      alert(
        "Failed to load orders. Make sure your Orders API is working."
      );
    } finally {
      setLoadingOrders(false);
    }
  };

  // ============================================================
  // INITIAL LOAD
  // ============================================================

  useEffect(() => {
    loadProducts();

    loadOrders();
  }, []);

  // ============================================================
  // IMAGE UPLOAD
  // ============================================================

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    if (
      !file.type.startsWith("image/")
    ) {
      alert(
        "Please select an image file."
      );

      return;
    }

    const reader =
      new FileReader();

    reader.onload = () => {
      setImage(
        reader.result as string
      );
    };

    reader.readAsDataURL(file);
  };

  // ============================================================
  // EDIT PRODUCT
  // ============================================================

  const handleEditProduct = (
    product: Product
  ) => {
    setEditingId(product.id);

    setName(product.name);

    setBrand(product.brand);

    setCategory(product.category);

    setPrice(
      String(product.price)
    );

    setStorage(
      product.storage || ""
    );

    setRam(
      product.ram || ""
    );

    setDescription(
      product.description || ""
    );

    setImage(
      product.image || ""
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ============================================================
  // ADD / UPDATE PRODUCT
  // ============================================================

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!name.trim()) {
      alert(
        "Please enter product name."
      );

      return;
    }

    if (!brand.trim()) {
      alert(
        "Please enter brand."
      );

      return;
    }

    if (
      !price ||
      Number(price) <= 0
    ) {
      alert(
        "Please enter a valid price."
      );

      return;
    }

    if (!description.trim()) {
      alert(
        "Please enter product description."
      );

      return;
    }

    if (!image) {
      alert(
        "Please upload a product photo."
      );

      return;
    }

    try {
      setLoading(true);

      const token =
        localStorage.getItem(
          "admin_token"
        );

      const productData = {
        name: name.trim(),

        brand: brand.trim(),

        category,

        price: Number(price),

        storage: storage.trim(),

        ram: ram.trim(),

        description:
          description.trim(),

        image,
      };

      // ========================================================
      // UPDATE
      // ========================================================

      if (editingId) {
        const response =
          await fetch(
            `${API_URL}/products/${editingId}`,
            {
              method: "PUT",

              headers: {
                "Content-Type":
                  "application/json",

                Accept:
                  "application/json",

                Authorization: `Bearer ${token}`,
              },

              body: JSON.stringify(
                productData
              ),
            }
          );

        if (!response.ok) {
          const errorText =
            await response.text();

          console.error(
            "Update error:",
            errorText
          );

          throw new Error(
            "Failed to update product"
          );
        }

        const updatedProduct =
          await response.json();

        setSavedProducts(
          (previous) =>
            previous.map(
              (product) =>
                product.id ===
                editingId
                  ? updatedProduct
                  : product
            )
        );

        alert(
          "Product updated successfully!"
        );

        cancelEdit();

        return;
      }

      // ========================================================
      // CREATE
      // ========================================================

      const response =
        await fetch(
          `${API_URL}/products`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Accept:
                "application/json",

              Authorization: `Bearer ${token}`,
            },

            body: JSON.stringify(
              productData
            ),
          }
        );

      if (!response.ok) {
        const errorText =
          await response.text();

        console.error(
          "Server error:",
          errorText
        );

        throw new Error(
          "Failed to add product"
        );
      }

      const createdProduct =
        await response.json();

      setSavedProducts(
        (previous) => [
          ...previous,
          createdProduct,
        ]
      );

      alert(
        "Product added successfully!"
      );

      clearForm();

    } catch (error) {
      console.error(
        "Save error:",
        error
      );

      alert(
        "Failed to save product. Check your backend."
      );

    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // DELETE PRODUCT
  // ============================================================

  const handleRemoveProduct =
    async (id: string) => {
      const confirmed =
        window.confirm(
          "Are you sure you want to remove this product?"
        );

      if (!confirmed) return;

      try {
        setLoading(true);

        const token =
          localStorage.getItem(
            "admin_token"
          );

        const response =
          await fetch(
            `${API_URL}/products/${id}`,
            {
              method: "DELETE",

              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        if (!response.ok) {
          throw new Error(
            "Failed to delete product"
          );
        }

        setSavedProducts(
          (previous) =>
            previous.filter(
              (product) =>
                product.id !== id
            )
        );

        if (
          editingId === id
        ) {
          cancelEdit();
        }

        alert(
          "Product removed successfully."
        );

      } catch (error) {
        console.error(
          "Delete error:",
          error
        );

        alert(
          "Failed to remove product."
        );

      } finally {
        setLoading(false);
      }
    };

  // ============================================================
  // UPDATE ORDER STATUS
  // ============================================================

  const handleUpdateOrderStatus =
    async (
      orderId: string,
      status: string
    ) => {
      try {
        setUpdatingOrderId(
          orderId
        );

        const token =
          localStorage.getItem(
            "admin_token"
          );

        const response =
          await fetch(
            `${API_URL}/orders/${orderId}`,
            {
              method: "PUT",

              headers: {
                "Content-Type":
                  "application/json",

                Accept:
                  "application/json",

                Authorization: `Bearer ${token}`,
              },

              body: JSON.stringify({
                status,
              }),
            }
          );

        if (!response.ok) {
          const errorText =
            await response.text();

          console.error(
            "Status update error:",
            errorText
          );

          throw new Error(
            "Failed to update order status"
          );
        }

        const updatedOrder =
          await response.json();

        setOrders(
          (previous) =>
            previous.map(
              (order) =>
                order.id ===
                orderId
                  ? updatedOrder
                  : order
            )
        );

        alert(
          "Order status updated successfully."
        );

      } catch (error) {
        console.error(
          "Order status error:",
          error
        );

        alert(
          "Failed to update order status."
        );

      } finally {
        setUpdatingOrderId(
          null
        );
      }
    };

  // ============================================================
  // DELETE ORDER
  // ============================================================

  const handleDeleteOrder =
    async (orderId: string) => {
      const confirmed =
        window.confirm(
          "Are you sure you want to delete this order?"
        );

      if (!confirmed) return;

      try {
        setUpdatingOrderId(
          orderId
        );

        const token =
          localStorage.getItem(
            "admin_token"
          );

        const response =
          await fetch(
            `${API_URL}/orders/${orderId}`,
            {
              method: "DELETE",

              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        if (!response.ok) {
          const errorText =
            await response.text();

          console.error(
            "Delete order error:",
            errorText
          );

          throw new Error(
            "Failed to delete order"
          );
        }

        setOrders(
          (previous) =>
            previous.filter(
              (order) =>
                order.id !== orderId
            )
        );

        alert(
          "Order deleted successfully."
        );

      } catch (error) {
        console.error(
          "Delete order error:",
          error
        );

        alert(
          "Failed to delete order."
        );

      } finally {
        setUpdatingOrderId(
          null
        );
      }
    };

  // ============================================================
  // ORDER STATUS BADGE
  // ============================================================

  const getStatusBadge = (
    status: string
  ) => {
    const normalized =
      status.toLowerCase();

    if (
      normalized === "completed"
    ) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
          <CheckCircle className="w-3 h-3" />
          Completed
        </span>
      );
    }

    if (
      normalized === "cancelled"
    ) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
          <XCircle className="w-3 h-3" />
          Cancelled
        </span>
      );
    }

    if (
      normalized === "paid"
    ) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
          <CheckCircle className="w-3 h-3" />
          Paid
        </span>
      );
    }

    if (
      normalized === "processing"
    ) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
          <Package className="w-3 h-3" />
          Processing
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
        <Clock className="w-3 h-3" />
        Pending
      </span>
    );
  };

  // ============================================================
  // LOGOUT
  // ============================================================

  const handleLogout = () => {
    localStorage.removeItem(
      "admin_token"
    );

    window.location.href =
      "/admin/login";
  };

  // ============================================================
  // FORMAT DATE
  // ============================================================

  const formatDate = (
    date?: string
  ) => {
    if (!date) {
      return "Unknown";
    }

    try {
      return new Date(
        date
      ).toLocaleString();
    } catch {
      return date;
    }
  };

  // ============================================================
  // DASHBOARD COUNTS
  // ============================================================

  const pendingOrders =
    orders.filter(
      (order) =>
        order.status?.toLowerCase() ===
        "pending"
    ).length;

  const paidOrders =
    orders.filter(
      (order) =>
        order.status?.toLowerCase() ===
        "paid"
    ).length;

  const processingOrders =
    orders.filter(
      (order) =>
        order.status?.toLowerCase() ===
        "processing"
    ).length;

  const completedOrders =
    orders.filter(
      (order) =>
        order.status?.toLowerCase() ===
        "completed"
    ).length;

  // ============================================================
  // RETURN
  // ============================================================

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">

      <div className="container mx-auto px-4 max-w-7xl">

        {/* ======================================================
            HEADER
        ====================================================== */}

        <div className="mb-10">

          <Link
            to="/"
            className="inline-flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground"
          >

            <ArrowLeft className="w-4 h-4" />

            Back to Store

          </Link>

          <div className="flex items-start justify-between gap-4">

            <div>

              <h1 className="text-4xl font-bold">
                Admin Panel
              </h1>

              <p className="text-muted-foreground mt-2">
                Manage Elite Store products
                and customer orders.
              </p>

            </div>

            <Button
              type="button"
              variant="destructive"
              onClick={handleLogout}
            >
              Logout
            </Button>

          </div>

        </div>

        {/* ======================================================
            DASHBOARD SUMMARY
        ====================================================== */}

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">

          <div className="bg-card border rounded-xl p-5">

            <ShoppingBag className="w-6 h-6 mb-3 text-accent" />

            <p className="text-sm text-muted-foreground">
              Total Orders
            </p>

            <p className="text-2xl font-bold">
              {orders.length}
            </p>

          </div>

          <div className="bg-card border rounded-xl p-5">

            <Clock className="w-6 h-6 mb-3 text-yellow-600" />

            <p className="text-sm text-muted-foreground">
              Pending
            </p>

            <p className="text-2xl font-bold">
              {pendingOrders}
            </p>

          </div>

          <div className="bg-card border rounded-xl p-5">

            <CheckCircle className="w-6 h-6 mb-3 text-blue-600" />

            <p className="text-sm text-muted-foreground">
              Paid
            </p>

            <p className="text-2xl font-bold">
              {paidOrders}
            </p>

          </div>

          <div className="bg-card border rounded-xl p-5">

            <Package className="w-6 h-6 mb-3 text-orange-600" />

            <p className="text-sm text-muted-foreground">
              Processing
            </p>

            <p className="text-2xl font-bold">
              {processingOrders}
            </p>

          </div>

          <div className="bg-card border rounded-xl p-5">

            <CheckCircle className="w-6 h-6 mb-3 text-green-600" />

            <p className="text-sm text-muted-foreground">
              Completed
            </p>

            <p className="text-2xl font-bold">
              {completedOrders}
            </p>

          </div>

        </div>

        {/* ======================================================
            ORDERS SECTION
        ====================================================== */}

        <section className="mb-16">

          <div className="flex items-center justify-between mb-6">

            <div>

              <h2 className="text-3xl font-bold flex items-center gap-2">

                <ShoppingBag className="w-7 h-7" />

                Customer Orders

              </h2>

              <p className="text-muted-foreground mt-1">

                Manage orders submitted by
                Elite Store customers.

              </p>

            </div>

            <Button
              type="button"
              variant="outline"
              onClick={loadOrders}
              disabled={loadingOrders}
            >

              <RefreshCw
                className={`w-4 h-4 mr-2 ${
                  loadingOrders
                    ? "animate-spin"
                    : ""
                }`}
              />

              Refresh Orders

            </Button>

          </div>

          {/* ORDERS LOADING */}

          {loadingOrders &&
          orders.length === 0 ? (
            <div className="border rounded-xl p-10 text-center text-muted-foreground">

              Loading customer orders...

            </div>
          ) : orders.length === 0 ? (
            <div className="border rounded-xl p-10 text-center">

              <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />

              <h3 className="font-semibold text-lg">
                No Orders Yet
              </h3>

              <p className="text-muted-foreground mt-2">
                Customer orders will appear
                here when customers place
                orders.
              </p>

            </div>
          ) : (
            <div className="space-y-5">

              {orders.map(
                (order) => (

                  <div
                    key={order.id}
                    className="bg-card border rounded-2xl p-6 shadow-elite-sm"
                  >

                    {/* ORDER HEADER */}

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                      <div>

                        <p className="text-xs text-muted-foreground uppercase">
                          Order ID
                        </p>

                        <p className="font-mono text-sm break-all">
                          {order.id}
                        </p>

                      </div>

                      <div className="flex items-center gap-3">

                        {getStatusBadge(
                          order.status
                        )}

                      </div>

                    </div>

                    {/* ORDER INFORMATION */}

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                      {/* CUSTOMER */}

                      <div>

                        <h3 className="font-semibold mb-3 flex items-center gap-2">

                          <User className="w-4 h-4" />

                          Customer

                        </h3>

                        <p className="font-medium">
                          {order.customer_name}
                        </p>

                        <p className="text-sm text-muted-foreground flex items-center gap-2 mt-2">

                          <Phone className="w-3 h-3" />

                          {order.customer_phone}

                        </p>

                        {order.customer_email && (

                          <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1 break-all">

                            <Mail className="w-3 h-3 flex-shrink-0" />

                            {order.customer_email}

                          </p>

                        )}

                      </div>

                      {/* LOCATION */}

                      <div>

                        <h3 className="font-semibold mb-3 flex items-center gap-2">

                          <MapPin className="w-4 h-4" />

                          Delivery Location

                        </h3>

                        <p className="text-muted-foreground">

                          {order.customer_location ||
                            "Not provided"}

                        </p>

                      </div>

                      {/* PAYMENT */}

                      <div>

                        <h3 className="font-semibold mb-3 flex items-center gap-2">

                          <CreditCard className="w-4 h-4" />

                          Payment

                        </h3>

                        <p className="font-medium">

                          {order.payment_method}

                        </p>

                        <p className="text-lg font-bold text-accent mt-2">

                          TSh{" "}
                          {Number(
                            order.amount
                          ).toLocaleString()}

                        </p>

                      </div>

                      {/* DATE */}

                      <div>

                        <h3 className="font-semibold mb-3 flex items-center gap-2">

                          <Clock className="w-4 h-4" />

                          Order Date

                        </h3>

                        <p className="text-sm text-muted-foreground">

                          {formatDate(
                            order.created_at
                          )}

                        </p>

                      </div>

                    </div>

                    {/* ACTIONS */}

                    <div className="border-t mt-6 pt-5">

                      <div className="flex flex-col md:flex-row gap-4">

                        {/* STATUS */}

                        <div className="flex-1">

                          <label className="block text-sm font-medium mb-2">

                            Update Order Status

                          </label>

                          <select
                            value={
                              order.status ||
                              "pending"
                            }
                            onChange={(e) =>
                              handleUpdateOrderStatus(
                                order.id,
                                e.target.value
                              )
                            }
                            disabled={
                              updatingOrderId ===
                              order.id
                            }
                            className="w-full border rounded-lg px-4 py-3 bg-background"
                          >

                            <option value="pending">
                              Pending
                            </option>

                            <option value="paid">
                              Paid
                            </option>

                            <option value="processing">
                              Processing
                            </option>

                            <option value="completed">
                              Completed
                            </option>

                            <option value="cancelled">
                              Cancelled
                            </option>

                          </select>

                        </div>

                        {/* DELETE */}

                        <div className="md:flex md:items-end">

                          <Button
                            type="button"
                            variant="destructive"
                            onClick={() =>
                              handleDeleteOrder(
                                order.id
                              )
                            }
                            disabled={
                              updatingOrderId ===
                              order.id
                            }
                          >

                            <Trash2 className="w-4 h-4 mr-2" />

                            Delete Order

                          </Button>

                        </div>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>
          )}

        </section>

        {/* ======================================================
            PRODUCT SECTION
        ====================================================== */}

        <section>

          <div className="mb-6">

            <h2 className="text-3xl font-bold flex items-center gap-2">

              <Package className="w-7 h-7" />

              Product Management

            </h2>

            <p className="text-muted-foreground mt-1">
              Add, edit and manage Elite Store
              products.
            </p>

          </div>

          {/* ====================================================
              FORM HEADER
          ==================================================== */}

          <div className="flex items-center justify-between mb-4">

            <h3 className="text-2xl font-bold">

              {editingId
                ? "Edit Product"
                : "Add New Product"}

            </h3>

            {editingId && (

              <Button
                type="button"
                variant="outline"
                onClick={cancelEdit}
              >

                <X className="w-4 h-4 mr-2" />

                Cancel Edit

              </Button>

            )}

          </div>

          {/* ====================================================
              PRODUCT FORM
          ==================================================== */}

          <form
            onSubmit={handleSubmit}
            className="bg-card border rounded-2xl p-6 shadow-elite-md space-y-6"
          >

            {/* PRODUCT NAME */}

            <div>

              <label className="block font-medium mb-2">
                Product Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="e.g. iPhone 15 Pro"
                className="w-full border rounded-lg px-4 py-3 bg-background"
              />

            </div>

            {/* BRAND */}

            <div>

              <label className="block font-medium mb-2">
                Brand
              </label>

              <input
                type="text"
                value={brand}
                onChange={(e) =>
                  setBrand(e.target.value)
                }
                placeholder="e.g. Apple"
                className="w-full border rounded-lg px-4 py-3 bg-background"
              />

            </div>

            {/* CATEGORY */}

           {/* CATEGORY */}

{/* CATEGORY */}

<div>

  <label className="block font-medium mb-2">
    Category
  </label>

  <select
    value={category}
    onChange={(e) =>
      setCategory(e.target.value)
    }
    className="w-full border rounded-lg px-4 py-3 bg-background"
  >

    <option value="phones">
      Mobile Phones
    </option>

    <option value="watches">
      Smart Watches
    </option>

    <option value="ipods">
      iPods
    </option>

    <option value="gamepads">
      Gamepads
    </option>

    <option value="smart-glasses">
      Smart Glasses
    </option>

  </select>

</div>

            {/* PRICE */}

            <div>

              <label className="block font-medium mb-2">
                Price (TZS)
              </label>

              <input
                type="number"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value)
                }
                placeholder="2800000"
                className="w-full border rounded-lg px-4 py-3 bg-background"
              />

            </div>

            {/* STORAGE */}

            <div>

              <label className="block font-medium mb-2">
                Storage
              </label>

              <input
                type="text"
                value={storage}
                onChange={(e) =>
                  setStorage(e.target.value)
                }
                placeholder="e.g. 256GB"
                className="w-full border rounded-lg px-4 py-3 bg-background"
              />

            </div>

            {/* RAM */}

            <div>

              <label className="block font-medium mb-2">
                RAM
              </label>

              <input
                type="text"
                value={ram}
                onChange={(e) =>
                  setRam(e.target.value)
                }
                placeholder="e.g. 8GB"
                className="w-full border rounded-lg px-4 py-3 bg-background"
              />

            </div>

            {/* DESCRIPTION */}

            <div>

              <label className="block font-medium mb-2">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                placeholder="Describe the product..."
                rows={4}
                className="w-full border rounded-lg px-4 py-3 bg-background"
              />

            </div>

            {/* IMAGE */}

            <div>

              <label className="block font-medium mb-2">
                Product Photo
              </label>

              {!image ? (

                <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 cursor-pointer hover:bg-secondary transition-colors">

                  <Upload className="w-10 h-10 mb-3 text-muted-foreground" />

                  <span className="font-medium">
                    Click to upload photo
                  </span>

                  <span className="text-sm text-muted-foreground mt-1">
                    PNG, JPG or WEBP
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={
                      handleImageUpload
                    }
                    className="hidden"
                  />

                </label>

              ) : (

                <div className="space-y-4">

                  <div className="relative border rounded-xl p-3 bg-secondary/30">

                    <img
                      src={image}
                      alt="Product preview"
                      className="w-full max-h-80 object-contain rounded-lg"
                    />

                  </div>

                  <div className="flex gap-3">

                    <label className="flex-1">

                      <div className="w-full text-center cursor-pointer border rounded-lg px-4 py-3 hover:bg-secondary transition-colors">

                        Replace Photo

                      </div>

                      <input
                        type="file"
                        accept="image/*"
                        onChange={
                          handleImageUpload
                        }
                        className="hidden"
                      />

                    </label>

                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() =>
                        setImage("")
                      }
                      className="flex-1"
                    >

                      <Trash2 className="w-4 h-4 mr-2" />

                      Remove Photo

                    </Button>

                  </div>

                </div>

              )}

            </div>

            {/* SUBMIT */}

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={loading}
            >

              {editingId ? (
                <Pencil className="w-5 h-5 mr-2" />
              ) : (
                <Plus className="w-5 h-5 mr-2" />
              )}

              {loading
                ? editingId
                  ? "Updating Product..."
                  : "Adding Product..."
                : editingId
                  ? "Update Product"
                  : "Add Product"}

            </Button>

          </form>

          {/* ====================================================
              SAVED PRODUCTS
          ==================================================== */}

          <section className="mt-12">

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-2xl font-bold">
                  Products
                </h2>

                <p className="text-muted-foreground">

                  {savedProducts.length} product
                  {savedProducts.length !== 1
                    ? "s"
                    : ""}

                </p>

              </div>

              <Button
                type="button"
                variant="outline"
                onClick={loadProducts}
                disabled={loading}
              >

                <RefreshCw
                  className={`w-4 h-4 mr-2 ${
                    loading
                      ? "animate-spin"
                      : ""
                  }`}
                />

                Refresh

              </Button>

            </div>

            {loading &&
            savedProducts.length === 0 ? (

              <div className="border rounded-xl p-10 text-center text-muted-foreground">

                Loading products...

              </div>

            ) : savedProducts.length ===
              0 ? (

              <div className="border rounded-xl p-10 text-center text-muted-foreground">

                No products have been
                added yet.

              </div>

            ) : (

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {savedProducts.map(
                  (product) => (

                    <div
                      key={product.id}
                      className="bg-card border rounded-2xl overflow-hidden shadow-elite-sm"
                    >

                      {/* IMAGE */}

                      <div className="h-56 bg-secondary/30 flex items-center justify-center">

                        {product.image ? (

                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain"
                          />

                        ) : (

                          <div className="text-center text-muted-foreground">

                            <ImageOff className="w-10 h-10 mx-auto mb-2" />

                            <p>
                              No product photo
                            </p>

                          </div>

                        )}

                      </div>

                      {/* DETAILS */}

                      <div className="p-5">

                        <div className="flex items-start justify-between gap-4">

                          <div>

                            <h3 className="text-xl font-bold">
                              {product.name}
                            </h3>

                            <p className="text-muted-foreground">
                              {product.brand}
                            </p>

                          </div>

                          <span className="text-xs bg-secondary px-3 py-1 rounded-full">
                            {product.category}
                          </span>

                        </div>

                        <p className="text-lg font-bold text-accent mt-3">

                          TSh{" "}

                          {product.price.toLocaleString()}

                        </p>

                        {product.storage && (

                          <p className="text-sm text-muted-foreground mt-1">

                            Storage:{" "}
                            {product.storage}

                          </p>

                        )}

                        {product.ram && (

                          <p className="text-sm text-muted-foreground">

                            RAM: {product.ram}

                          </p>

                        )}

                        <p className="text-sm text-muted-foreground mt-3">

                          {product.description}

                        </p>

                        <div className="flex gap-3 mt-5">

                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              handleEditProduct(
                                product
                              )
                            }
                            className="flex-1"
                          >

                            <Pencil className="w-4 h-4 mr-2" />

                            Edit

                          </Button>

                          <Button
                            type="button"
                            variant="destructive"
                            onClick={() =>
                              handleRemoveProduct(
                                product.id
                              )
                            }
                            className="flex-1"
                          >

                            <Trash2 className="w-4 h-4 mr-2" />

                            Remove

                          </Button>

                        </div>

                      </div>

                    </div>

                  )
                )}

              </div>

            )}

          </section>

        </section>

      </div>

    </div>
  );
};

export default Admin;