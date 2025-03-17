"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

interface SessionStatusProps {
  sessionId: string;
}

export default function SessionStatus({ sessionId }: SessionStatusProps) {
  const [status, setStatus] = useState<
    "loading" | "open" | "complete" | "error"
  >("loading");
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch(`/api/stripe_ession?session_id=${sessionId}`);
        const data = await res.json();
        setStatus(data.status);
      } catch (error) {
        console.error("Error fetching session:", error);
        setStatus("error");
      }
    };

    fetchSession();
  }, [sessionId]);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        <p className="mt-4 text-lg font-medium text-gray-700">
          Checking payment status...
        </p>
      </div>
    );
  }

  if (status === "open") {
    router.push("/");
    return null;
  }

  if (status === "complete") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <CheckCircle className="w-24 h-24 text-green-500" />
        <h1 className="mt-4 text-2xl font-semibold text-gray-900">
          Order is completed
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="mt-4 text-2xl font-semibold text-red-500">
        Error fetching session
      </h1>
    </div>
  );
}
