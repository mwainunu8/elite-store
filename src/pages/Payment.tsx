import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import {
  CheckCircle,
  CreditCard,
  Smartphone,
  Building2,
  ArrowLeft,
  MessageCircle,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Product, formatPrice } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

interface LocationState {
  product: Product;
  customer: {
    fullName: string;
    phoneNumber: string;
    email: string;
    location: string;
  };
}

type PaymentMethod = "airtel" | "crdb";

interface CreatedOrder {
  id?: string;
  order_id?: string;
  [key: string]: unknown;
}

const API_URL = "http://10.26.60.23:8080";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const state = location.state as LocationState | null;

  // ============================================================
  // CHECK ORDER DATA
  // ============================================================

  if (!state?.product || !state?.customer) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-background">
        <div className="text-center px-4">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">
            No Order Found
          </h1>
          <p className="text-muted-foreground mb-6">
            Please start your order from the products page.
          </p>
          <Link to="/products">
            <Button variant="elite">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const { product, customer } = state;

  // ============================================================
  // PAYMENT METHODS
  // ============================================================

  const paymentMethods = [
    {
      id: "airtel" as const,
      name: "Airtel Money",
      icon: Smartphone,
      details: {
        number: "0665974905",
        name: "Elite Store",
      },
      instructions: [
        "Open Airtel Money on your phone",
        'Select "Lipa kwa Simu"',
        "Enter number: 0665974905",
        `Enter amount: ${formatPrice(product.price)}`,
        "Enter your Airtel Money PIN",
        "Confirm the transaction",
      ],
    },
    {
      id: "crdb" as const,
      name: "CRDB Bank",
      icon: Building2,
      details: {
        account: "0152940982000",
        name: "Elite Store",
      },
      instructions: [
        "Log in to CRDB Mobile or Internet Banking",
        'Select "Transfer Funds"',
        "Enter Account: 0152940982000",
        `Enter amount: ${formatPrice(product.price)}`,
        "Add reference: Your name",
        "Confirm the transfer",
      ],
    },
  ];

  // ============================================================
  // CREATE ORDER
  // ============================================================

  const createCustomerOrder = async (
    paymentMethod: PaymentMethod
  ): Promise<CreatedOrder> => {
    const orderData = {
      product_id: String(product.id),
      customer_name: String(customer.fullName),
      customer_phone: String(customer.phoneNumber),
      customer_email: String(customer.email),
      customer_location: String(customer.location),
      quantity: 1,
      payment_method: paymentMethod,
    };

    console.log("====================================");
    console.log("SENDING ORDER TO BACKEND:");
    console.log(orderData);
    console.log("====================================");

    let response: Response;

    try {
      response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(orderData),
      });
    } catch (networkError) {
      console.error("NETWORK ERROR:", networkError);
      throw new Error(
        "Cannot connect to the backend. Make sure FastAPI is running on port 8080."
      );
    }

    const responseText = await response.text();

    console.log("BACKEND STATUS:", response.status);
    console.log("BACKEND RESPONSE:", responseText);

    // ========================================================
    // BACKEND ERROR
    // ========================================================

    if (!response.ok) {
      let errorMessage = `Server returned HTTP ${response.status}`;

      try {
        const errorData = JSON.parse(responseText);
        if (typeof errorData.detail === "string") {
          errorMessage = errorData.detail;
        } else if (errorData.detail) {
          errorMessage = JSON.stringify(errorData.detail);
        }
      } catch {
        if (responseText) {
          errorMessage = responseText;
        }
      }

      throw new Error(errorMessage);
    }

    // ========================================================
    // PARSE RESPONSE
    // ========================================================

    let createdOrder: CreatedOrder;

    try {
      createdOrder = JSON.parse(responseText);
    } catch {
      throw new Error(
        "Order was created, but the backend returned an invalid JSON response."
      );
    }

    console.log("ORDER CREATED:", createdOrder);

    return createdOrder;
  };

  // ============================================================
  // PAYMENT CONFIRMATION
  // ============================================================

  const handlePaymentConfirmation = async () => {
    if (!selectedMethod) {
      toast({
        title: "Select Payment Method",
        description: "Please select Airtel Money or CRDB Bank first.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsCreatingOrder(true);

      // ======================================================
      // STEP 1
      // CREATE DATABASE ORDER
      // ======================================================

      const createdOrder = await createCustomerOrder(selectedMethod);

      // ======================================================
      // STEP 2
      // GET ORDER ID
      // ======================================================

      const createdOrderId = createdOrder?.id || createdOrder?.order_id || null;

      if (createdOrderId) {
        setOrderId(String(createdOrderId));
      }

      // ======================================================
      // STEP 3
      // PAYMENT METHOD DISPLAY NAME
      // ======================================================

      const paymentMethodName = selectedMethod === "airtel" ? "Airtel Money" : "CRDB Bank";

      // ======================================================
      // STEP 4
      // CREATE WHATSAPP MESSAGE
      // ======================================================

      const message =
        `*PAYMENT CONFIRMATION - ELITE STORE*\n\n` +
        `Order ID: ${createdOrderId ? String(createdOrderId) : "Pending"}\n\n` +
        `Product: ${product.name}\n` +
        `Brand: ${product.brand}\n` +
        `Amount: ${formatPrice(product.price)}\n` +
        `Payment Method: ${paymentMethodName}\n\n` +
        `Customer: ${customer.fullName}\n` +
        `Phone: ${customer.phoneNumber}\n` +
        `Email: ${customer.email}\n` +
        `Location: ${customer.location}\n\n` +
        `Payment has been made.\n\n` +
        `Please confirm the payment and process my order.`;

      // ======================================================
      // STEP 5
      // OPEN WHATSAPP
      // ======================================================

      const whatsappUrl = `https://wa.me/255665974905?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");

      // ======================================================
      // STEP 6
      // SUCCESS
      // ======================================================

      setIsPaid(true);

      toast({
        title: "Order Created Successfully!",
        description: "Your order has been saved successfully.",
      });
    } catch (error) {
      console.error("ORDER ERROR:", error);

      toast({
        title: "Order Failed",
        description: error instanceof Error ? error.message : "Failed to create order.",
        variant: "destructive",
      });
    } finally {
      setIsCreatingOrder(false);
    }
  };

  // ============================================================
  // SUCCESS PAGE
  // ============================================================

  if (isPaid) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-background">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[hsl(142,70%,45%)]/10 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-[hsl(142,70%,45%)]" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">
            Order Complete!
          </h1>
          <p className="text-muted-foreground mb-6">
            Thank you for shopping with Elite Store.
            Your order has been received and saved successfully.
          </p>
          {orderId && (
            <div className="bg-secondary rounded-lg p-4 mb-6">
              <p className="text-sm text-muted-foreground">
                Your Order ID
              </p>
              <p className="font-bold text-lg mt-1 break-all">
                {orderId}
              </p>
            </div>
          )}
          <p className="text-muted-foreground mb-8">
            Please complete your payment and send the confirmation through WhatsApp.
            Elite Store will process your order after confirming payment.
          </p>
          <div className="space-y-4">
            <Link to="/products">
              <Button variant="elite" size="lg" className="w-full">
                Continue Shopping
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" size="lg" className="w-full">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // PAYMENT PAGE
  // ============================================================

  return (
    <div className="min-h-screen pt-24 pb-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* HEADER */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-4 gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Complete Payment
            </h1>
            <p className="text-muted-foreground">
              Choose your preferred payment method and follow the instructions.
            </p>
          </div>

          {/* ORDER SUMMARY */}
          <div className="p-6 bg-card rounded-xl shadow-elite-sm mb-8">
            <h2 className="font-display font-semibold text-lg text-foreground mb-4">
              Order Summary
            </h2>
            <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {product.brand}
                </p>
                {product.storage && (
                  <p className="text-sm text-muted-foreground">
                    {product.storage}
                    {product.ram ? ` / ${product.ram} RAM` : ""}
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="font-display font-bold text-xl text-accent">
                  {formatPrice(product.price)}
                </p>
              </div>
            </div>
          </div>

          {/* CUSTOMER INFORMATION */}
          <div className="p-6 bg-card rounded-xl shadow-elite-sm mb-8">
            <h2 className="font-display font-semibold text-lg text-foreground mb-4">
              Customer Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{customer.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{customer.phoneNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium break-all">{customer.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{customer.location}</p>
              </div>
            </div>
          </div>

          {/* PAYMENT METHODS */}
          <div className="space-y-6">
            <h2 className="font-display font-semibold text-lg text-foreground flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Select Payment Method
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {paymentMethods.map((method) => {
                const isSelected = selectedMethod === method.id;
                const Icon = method.icon;

                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setSelectedMethod(method.id)}
                    className={`p-6 rounded-xl border-2 text-left transition-all duration-300 ${
                      isSelected
                        ? "border-accent bg-accent/5 shadow-elite-md"
                        : "border-border bg-card hover:border-accent/50"
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          isSelected ? "bg-accent/20" : "bg-secondary"
                        }`}
                      >
                        <Icon
                          className={`w-6 h-6 ${
                            isSelected ? "text-accent" : "text-muted-foreground"
                          }`}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {method.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {"number" in method.details ? method.details.number : method.details.account}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-accent">
                      {method.details.name}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* PAYMENT INSTRUCTIONS */}
            {selectedMethod && (
              <div className="p-6 bg-secondary/30 rounded-xl">
                <h3 className="font-semibold text-foreground mb-4">
                  Payment Instructions
                </h3>
                <ol className="space-y-3">
                  {paymentMethods
                    .find((method) => method.id === selectedMethod)
                    ?.instructions.map((instruction, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-accent/20 text-accent text-sm font-medium flex items-center justify-center flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-muted-foreground">
                          {instruction}
                        </span>
                      </li>
                    ))}
                </ol>
              </div>
            )}

            {/* CONFIRM BUTTON */}
            <Button
              onClick={handlePaymentConfirmation}
              variant="whatsapp"
              size="xl"
              className="w-full gap-2"
              disabled={!selectedMethod || isCreatingOrder}
            >
              {isCreatingOrder ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Order...
                </>
              ) : (
                <>
                  <MessageCircle className="w-5 h-5" />
                  I Have Paid - Confirm via WhatsApp
                </>
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Your order will first be saved in Elite Store before WhatsApp opens.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;