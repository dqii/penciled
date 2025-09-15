"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { CheckCircle, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                 Variants                                   */
/* -------------------------------------------------------------------------- */

const singleInputFormVariants = cva("w-full", {
  variants: {
    size: {
      default: "max-w-md",
      sm: "max-w-sm",
      lg: "max-w-lg",
      full: "max-w-full",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

/* -------------------------------------------------------------------------- */
/*                               Type definitions                              */
/* -------------------------------------------------------------------------- */

export type FormResponse<TData> =
  | { success: true; data: TData }
  | { success: false; error?: string };

export interface SingleInputFormProps<TData = { value: string }>
  extends VariantProps<typeof singleInputFormVariants> {
  /** Input configuration */
  name?: string;
  type?: "text" | "email" | "tel" | "url";
  placeholder?: string;
  required?: boolean;
  validate?: (value: string) => string | null;

  /** Form submission */
  submit: string | ((value: string) => Promise<FormResponse<TData>>);
  submitLabel?: string;
  loadingLabel?: string;

  /** Success handling */
  onSuccess?: ((data: TData) => void) | string | React.ReactNode;
  onError?: (error: string) => void;

  /** Styling */
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*                                Component                                   */
/* -------------------------------------------------------------------------- */

export function SingleInputForm<TData = { value: string }>({
  name = "value",
  type = "text",
  placeholder,
  required = false,
  validate,
  submit,
  submitLabel = "Submit",
  loadingLabel = "Submitting...",
  onSuccess,
  onError,
  size,
  className,
}: SingleInputFormProps<TData>) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (required && !value.trim()) {
      setError("This field is required");
      return;
    }

    if (validate) {
      const validationError = validate(value);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    setLoading(true);

    try {
      let response: FormResponse<TData>;

      if (typeof submit === "function") {
        response = await submit(value);
      } else {
        // URL submission
        const res = await fetch(submit, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ [name]: value }),
        });

        const data = await res.json();

        if (res.ok) {
          response = { success: true, data: data as TData };
        } else {
          response = {
            success: false,
            error: data.error || data.message || "Request failed",
          };
        }
      }

      if (response.success) {
        if (typeof onSuccess === "function") {
          onSuccess(response.data);
        } else {
          setSucceeded(true);
        }
        setValue("");
      } else {
        const errorMessage = response.error || "Something went wrong";
        setError(errorMessage);
        onError?.(errorMessage);
      }
    } catch {
      const errorMessage = "Network error. Please try again.";
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Show success UI if provided
  if (succeeded && typeof onSuccess !== "function" && onSuccess) {
    return (
      <div className={cn(singleInputFormVariants({ size }), className)}>
        <div className="rounded-lg border bg-background p-6 text-center">
          <CheckCircle className="mx-auto mb-4 size-12 text-green-600" />
          {typeof onSuccess === "string" ? (
            <p className="text-lg">{onSuccess}</p>
          ) : (
            onSuccess
          )}
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(singleInputFormVariants({ size }), className)}
    >
      <div className="flex gap-2">
        <Input
          type={type}
          name={name}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError(null);
          }}
          placeholder={placeholder}
          required={required}
          className={cn(
            "flex-1",
            error && "border-destructive focus-visible:ring-destructive"
          )}
          aria-invalid={!!error}
          aria-describedby={error ? "field-error" : undefined}
        />
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
          {loading ? loadingLabel : submitLabel}
        </Button>
      </div>
      {error && (
        <p id="field-error" className="mt-2 text-sm text-destructive">
          {error}
        </p>
      )}
    </form>
  );
}

SingleInputForm.displayName = "SingleInputForm";

export { singleInputFormVariants };
