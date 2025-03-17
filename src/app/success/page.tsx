import SessionStatus from "@/components/SessionStatus";
import { use } from "react";

type SearchParams = Promise<{ [key: string]: string | undefined }>;

export default function Success(props: { searchParams: SearchParams }) {
  const searchParams = use(props.searchParams);
  const session_id = searchParams.session_id;

  if (!session_id) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="mt-4 text-2xl font-semibold text-gray-900">
          No session ID provided
        </h1>
      </div>
    );
  }

  return <SessionStatus sessionId={session_id} />;
}
