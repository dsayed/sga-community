import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import type { Profile, TrainingModule, TrainingProgress } from "@/lib/types";

/** Extract initials from a full name. */
function getInitials(name: string | undefined | null): string {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/** Format a date into a short readable string. */
function formatDate(dateString: string | null): string {
  if (!dateString) return "Never";
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return "Never";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Avatar background color based on role. */
function avatarColors(role: string): { bg: string; text: string } {
  switch (role) {
    case "admin":
    case "staff":
      return { bg: "bg-sga-blue-light", text: "text-sga-blue" };
    default:
      return { bg: "bg-sga-orange-light", text: "text-sga-orange" };
  }
}

/** Progress text color based on completion. */
function progressColor(completed: number, total: number): string {
  if (total === 0) return "text-sga-text-secondary";
  if (completed === total) return "text-sga-success";
  if (completed === 0) return "text-sga-urgent";
  return "text-amber-600";
}

export default async function AdminMembersPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const params = await searchParams;
  const filterIncomplete = params.filter === "incomplete";

  const supabase = await createClient();

  // Fetch all data in parallel
  const [profilesRes, modulesRes, progressRes] = await Promise.all([
    supabase.from("profiles").select("*").order("full_name"),
    supabase
      .from("training_modules")
      .select("id")
      .eq("published", true),
    supabase.from("training_progress").select("*"),
  ]);

  const profiles: Profile[] = profilesRes.data ?? [];
  const modules: Pick<TrainingModule, "id">[] = modulesRes.data ?? [];
  const progress: TrainingProgress[] = progressRes.data ?? [];
  const totalModules = modules.length;

  // Build a lookup: user_id -> { completedCount, lastActivity }
  const memberStats = new Map<
    string,
    { completedCount: number; lastActivity: string | null }
  >();

  for (const p of progress) {
    const existing = memberStats.get(p.user_id) ?? {
      completedCount: 0,
      lastActivity: null,
    };

    if (p.status === "completed") {
      existing.completedCount += 1;
    }

    // Track most recent activity (completed_at or just existence)
    const activityDate = p.completed_at;
    if (
      activityDate &&
      (!existing.lastActivity || activityDate > existing.lastActivity)
    ) {
      existing.lastActivity = activityDate;
    }

    memberStats.set(p.user_id, existing);
  }

  // Build display rows
  let members = profiles.map((profile) => {
    const stats = memberStats.get(profile.id) ?? {
      completedCount: 0,
      lastActivity: null,
    };
    return {
      ...profile,
      completedCount: stats.completedCount,
      lastActivity: stats.lastActivity,
      allComplete: totalModules > 0 && stats.completedCount >= totalModules,
    };
  });

  // Apply filter
  if (filterIncomplete) {
    members = members.filter((m) => !m.allComplete);
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold text-sga-text mb-4">Member Progress</h1>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-4">
        <Link
          href="/admin/members"
          className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
            !filterIncomplete
              ? "bg-sga-orange text-white"
              : "bg-sga-warm-gray text-sga-text-secondary"
          }`}
        >
          All Members
          <span className="text-[10px] opacity-70 ml-0.5">
            ({profiles.length})
          </span>
        </Link>
        <Link
          href="/admin/members?filter=incomplete"
          className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
            filterIncomplete
              ? "bg-sga-orange text-white"
              : "bg-sga-warm-gray text-sga-text-secondary"
          }`}
        >
          Incomplete Training Only
        </Link>
      </div>

      {/* Summary */}
      <p className="text-xs text-sga-text-secondary mb-3">
        {totalModules} published training module{totalModules !== 1 ? "s" : ""}{" "}
        &middot; {members.length} member{members.length !== 1 ? "s" : ""} shown
      </p>

      {/* Member list */}
      {members.length === 0 ? (
        <p className="text-sga-text-secondary text-sm py-8 text-center">
          {filterIncomplete
            ? "All members have completed their training!"
            : "No members found."}
        </p>
      ) : (
        <div>
          {members.map((member) => {
            const colors = avatarColors(member.role);
            const pColor = progressColor(member.completedCount, totalModules);

            return (
              <div
                key={member.id}
                className="bg-white mx-0 mb-2 rounded-md p-3 shadow-sm flex items-center gap-3"
              >
                {/* Avatar */}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-[13px] flex-shrink-0 ${colors.bg} ${colors.text}`}
                >
                  {getInitials(member.full_name)}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-sm truncate">
                      {member.full_name}
                    </span>
                    <span className="text-[10px] font-semibold bg-sga-blue-light text-sga-blue px-1.5 py-px rounded capitalize flex-shrink-0">
                      {member.role}
                    </span>
                  </div>
                  {member.location && (
                    <p className="text-xs text-sga-text-secondary truncate">
                      {member.location}
                    </p>
                  )}
                </div>

                {/* Progress + Last activity */}
                <div className="text-right flex-shrink-0">
                  <p className={`text-xs font-medium ${pColor}`}>
                    {totalModules === 0
                      ? "No modules"
                      : member.allComplete
                        ? "All complete \u2713"
                        : `${member.completedCount} of ${totalModules} complete`}
                  </p>
                  <p className="text-[10px] text-sga-text-secondary">
                    {member.lastActivity
                      ? `Last: ${formatDate(member.lastActivity)}`
                      : "No activity"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
