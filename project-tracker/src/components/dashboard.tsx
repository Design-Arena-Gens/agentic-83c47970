"use client";

import { useMemo, useState } from "react";
import { StatusBadge, type ProjectStatus } from "./status-badge";

type MilestoneStatus = "Completed" | "In Progress" | "Upcoming";

type TeamMember = {
  name: string;
  role: string;
  avatarColor: string;
  allocation: number;
};

type Milestone = {
  name: string;
  date: string;
  status: MilestoneStatus;
  owner: string;
};

type Highlight = {
  label: string;
  value: string;
};

type Project = {
  id: string;
  name: string;
  status: ProjectStatus;
  summary: string;
  progress: number;
  budgetUsed: number;
  dueDate: string;
  manager: string;
  stage: string;
  lastUpdated: string;
  team: TeamMember[];
  highlights: Highlight[];
  milestones: Milestone[];
};

type StatusFilter = ProjectStatus | "All";

type ActivityItem = {
  id: string;
  projectId: string;
  title: string;
  description: string;
  timestamp: string;
  tag: "Update" | "Risk" | "Meeting" | "Launch";
};

const PROJECTS: Project[] = [
  {
    id: "PJT-1024",
    name: "Customer Portal Revamp",
    status: "On Track",
    summary: "Unifying billing, support, and onboarding flows into a single responsive portal.",
    progress: 68,
    budgetUsed: 0.54,
    dueDate: "2024-08-18",
    manager: "Alicia Chen",
    stage: "Build",
    lastUpdated: "2024-06-03T15:15:00Z",
    team: [
      {
        name: "Alicia Chen",
        role: "Product Lead",
        avatarColor: "bg-emerald-500",
        allocation: 0.45,
      },
      {
        name: "Diego Martins",
        role: "Design Lead",
        avatarColor: "bg-sky-500",
        allocation: 0.35,
      },
      {
        name: "Morgan Reid",
        role: "Engineering Manager",
        avatarColor: "bg-indigo-500",
        allocation: 0.5,
      },
      {
        name: "Priya Patel",
        role: "QA Lead",
        avatarColor: "bg-amber-500",
        allocation: 0.25,
      },
    ],
    highlights: [
      { label: "Sprint Velocity", value: "42 pts" },
      { label: "Open Issues", value: "8" },
      { label: "Blocked Tasks", value: "2" },
    ],
    milestones: [
      {
        name: "Final UX Sign-off",
        date: "2024-06-28",
        status: "In Progress",
        owner: "Diego Martins",
      },
      {
        name: "Beta Release",
        date: "2024-07-22",
        status: "Upcoming",
        owner: "Morgan Reid",
      },
      {
        name: "GA Launch",
        date: "2024-08-18",
        status: "Upcoming",
        owner: "Alicia Chen",
      },
    ],
  },
  {
    id: "PJT-1042",
    name: "Data Platform Hardening",
    status: "At Risk",
    summary: "Stabilizing ingestion pipeline and compliance readiness for SOC 2 Type II.",
    progress: 52,
    budgetUsed: 0.76,
    dueDate: "2024-07-05",
    manager: "Samuel Ortiz",
    stage: "Stabilize",
    lastUpdated: "2024-06-04T12:45:00Z",
    team: [
      {
        name: "Samuel Ortiz",
        role: "Program Manager",
        avatarColor: "bg-purple-500",
        allocation: 0.6,
      },
      {
        name: "Morgan Reid",
        role: "Engineering Manager",
        avatarColor: "bg-indigo-500",
        allocation: 0.4,
      },
      {
        name: "Ritika Sharma",
        role: "Security Lead",
        avatarColor: "bg-rose-500",
        allocation: 0.5,
      },
      {
        name: "Noah Kim",
        role: "Data Engineer",
        avatarColor: "bg-cyan-500",
        allocation: 0.7,
      },
    ],
    highlights: [
      { label: "Incidents (30d)", value: "3" },
      { label: "Error Budget", value: "61% remaining" },
      { label: "Compliance", value: "Audit prep" },
    ],
    milestones: [
      {
        name: "Pipeline Refactor Complete",
        date: "2024-06-20",
        status: "In Progress",
        owner: "Noah Kim",
      },
      {
        name: "SOC 2 Internal Review",
        date: "2024-06-30",
        status: "Upcoming",
        owner: "Ritika Sharma",
      },
      {
        name: "Cutover & Monitoring",
        date: "2024-07-05",
        status: "Upcoming",
        owner: "Samuel Ortiz",
      },
    ],
  },
  {
    id: "PJT-1083",
    name: "Mobile Onboarding Optimization",
    status: "On Track",
    summary: "Improving first-session conversion for mobile through guided checklists and personalization.",
    progress: 41,
    budgetUsed: 0.36,
    dueDate: "2024-09-01",
    manager: "Farah Ali",
    stage: "Discovery",
    lastUpdated: "2024-06-02T10:05:00Z",
    team: [
      {
        name: "Farah Ali",
        role: "Growth PM",
        avatarColor: "bg-fuchsia-500",
        allocation: 0.5,
      },
      {
        name: "Maya Thompson",
        role: "UX Research",
        avatarColor: "bg-lime-500",
        allocation: 0.4,
      },
      {
        name: "Diego Martins",
        role: "Design Lead",
        avatarColor: "bg-sky-500",
        allocation: 0.3,
      },
      {
        name: "Jason Lee",
        role: "iOS Engineer",
        avatarColor: "bg-orange-500",
        allocation: 0.6,
      },
    ],
    highlights: [
      { label: "Activation Lift", value: "+6.4%" },
      { label: "Research Sessions", value: "14" },
      { label: "Beta Waitlist", value: "312" },
    ],
    milestones: [
      {
        name: "Usability Testing",
        date: "2024-06-25",
        status: "Upcoming",
        owner: "Maya Thompson",
      },
      {
        name: "Beta Build",
        date: "2024-07-30",
        status: "Upcoming",
        owner: "Jason Lee",
      },
      {
        name: "North Star KPI Review",
        date: "2024-09-01",
        status: "Upcoming",
        owner: "Farah Ali",
      },
    ],
  },
  {
    id: "PJT-1101",
    name: "Partner API Expansion",
    status: "Stalled",
    summary: "Extending third-party integrations with deeper analytics and provisioning hooks.",
    progress: 33,
    budgetUsed: 0.48,
    dueDate: "2024-07-18",
    manager: "Leo Martinez",
    stage: "Build",
    lastUpdated: "2024-05-28T09:20:00Z",
    team: [
      {
        name: "Leo Martinez",
        role: "Platform PM",
        avatarColor: "bg-blue-500",
        allocation: 0.5,
      },
      {
        name: "Priya Patel",
        role: "QA Lead",
        avatarColor: "bg-amber-500",
        allocation: 0.3,
      },
      {
        name: "Noah Kim",
        role: "Data Engineer",
        avatarColor: "bg-cyan-500",
        allocation: 0.4,
      },
      {
        name: "Claire Dubois",
        role: "Backend Engineer",
        avatarColor: "bg-rose-400",
        allocation: 0.7,
      },
    ],
    highlights: [
      { label: "Partner NDA", value: "Signed" },
      { label: "Open PRs", value: "12" },
      { label: "Test Coverage", value: "71%" },
    ],
    milestones: [
      {
        name: "Integration Test Suite",
        date: "2024-06-14",
        status: "Completed",
        owner: "Priya Patel",
      },
      {
        name: "Partner Sandbox Release",
        date: "2024-07-02",
        status: "In Progress",
        owner: "Claire Dubois",
      },
      {
        name: "Launch Webinar",
        date: "2024-07-18",
        status: "Upcoming",
        owner: "Leo Martinez",
      },
    ],
  },
  {
    id: "PJT-980",
    name: "Billing Modernization",
    status: "Completed",
    summary: "Migrated subscription ledger to Stripe Billing with real-time entitlement sync.",
    progress: 100,
    budgetUsed: 0.89,
    dueDate: "2024-04-12",
    manager: "Kara Lawson",
    stage: "Closed",
    lastUpdated: "2024-04-15T17:40:00Z",
    team: [
      {
        name: "Kara Lawson",
        role: "Program Manager",
        avatarColor: "bg-emerald-400",
        allocation: 0.4,
      },
      {
        name: "Morgan Reid",
        role: "Engineering Manager",
        avatarColor: "bg-indigo-500",
        allocation: 0.2,
      },
      {
        name: "Jason Lee",
        role: "iOS Engineer",
        avatarColor: "bg-orange-500",
        allocation: 0.3,
      },
      {
        name: "Ritika Sharma",
        role: "Security Lead",
        avatarColor: "bg-rose-500",
        allocation: 0.35,
      },
    ],
    highlights: [
      { label: "Launch Date", value: "Apr 12" },
      { label: "ARR Impact", value: "+$420k" },
      { label: "Support Tickets", value: "-38%" },
    ],
    milestones: [
      {
        name: "Dark Launch",
        date: "2024-03-28",
        status: "Completed",
        owner: "Morgan Reid",
      },
      {
        name: "Uptime Review",
        date: "2024-04-20",
        status: "Completed",
        owner: "Kara Lawson",
      },
      {
        name: "Retro & Handoff",
        date: "2024-05-03",
        status: "Completed",
        owner: "Kara Lawson",
      },
    ],
  },
];

const ACTIVITY: ActivityItem[] = [
  {
    id: "ACT-1",
    projectId: "PJT-1042",
    title: "Risk review scheduled",
    description: "Security council deep dive booked for June 12 to unblock SOC 2 findings.",
    timestamp: "2024-06-04T09:10:00Z",
    tag: "Risk",
  },
  {
    id: "ACT-2",
    projectId: "PJT-1024",
    title: "Sprint 18 completed",
    description: "Portal revamp hit all 7 sprint goals with 2 stretch tasks delivered early.",
    timestamp: "2024-06-03T22:05:00Z",
    tag: "Update",
  },
  {
    id: "ACT-3",
    projectId: "PJT-1083",
    title: "Research synthesis published",
    description: "Early cohort leaning toward checklist onboarding; prototype validation underway.",
    timestamp: "2024-06-02T14:55:00Z",
    tag: "Meeting",
  },
  {
    id: "ACT-4",
    projectId: "PJT-1101",
    title: "Sandbox release delayed",
    description: "Integration tests blocked by partner API rate limits; mitigation plan drafted.",
    timestamp: "2024-06-01T19:20:00Z",
    tag: "Risk",
  },
  {
    id: "ACT-5",
    projectId: "PJT-980",
    title: "Celebration & wrap-up",
    description: "Billing modernization handoff complete; shared retro notes and KPIs.",
    timestamp: "2024-05-15T10:00:00Z",
    tag: "Launch",
  },
];

const statusFilters: StatusFilter[] = [
  "All",
  "On Track",
  "At Risk",
  "Stalled",
  "Completed",
];

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

const longDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function formatRelativeTimestamp(isoDate: string) {
  const now = new Date();
  const timestamp = new Date(isoDate);
  const diffMs = now.getTime() - timestamp.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  if (diffMins < 60) {
    return `${diffMins}m ago`;
  }
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) {
    return `${diffDays}d ago`;
  }
  return longDateFormatter.format(timestamp);
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

export default function Dashboard() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [searchTerm, setSearchTerm] = useState("");

  const metrics = useMemo(() => {
    const now = new Date();
    const activeProjects = PROJECTS.filter(
      (project) => project.status !== "Completed",
    ).length;
    const completedProjects = PROJECTS.filter(
      (project) => project.status === "Completed",
    ).length;
    const atRiskProjects = PROJECTS.filter(
      (project) => project.status === "At Risk" || project.status === "Stalled",
    ).length;
    const upcomingDeadlines = PROJECTS.filter((project) => {
      const due = new Date(project.dueDate);
      const diffDays =
        (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
      return diffDays >= 0 && diffDays <= 14;
    }).length;

    return [
      {
        label: "Active Projects",
        value: activeProjects,
        caption: "↑ 2 since last month",
        accent: "from-emerald-400/50 to-emerald-500/10",
      },
      {
        label: "At Risk / Stalled",
        value: atRiskProjects,
        caption: "Trigger health check",
        accent: "from-amber-400/50 to-amber-500/10",
      },
      {
        label: "Upcoming Deadlines",
        value: upcomingDeadlines,
        caption: "Due in next 14 days",
        accent: "from-sky-400/50 to-sky-500/10",
      },
      {
        label: "Completed YTD",
        value: completedProjects,
        caption: "Portfolio velocity",
        accent: "from-slate-400/50 to-slate-500/10",
      },
    ];
  }, []);

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      const matchesStatus =
        statusFilter === "All" ? true : project.status === statusFilter;
      const search = searchTerm.trim().toLowerCase();
      if (!matchesStatus) return false;
      if (!search) return true;
      return (
        project.name.toLowerCase().includes(search) ||
        project.summary.toLowerCase().includes(search) ||
        project.manager.toLowerCase().includes(search) ||
        project.team.some((member) =>
          member.name.toLowerCase().includes(search),
        )
      );
    });
  }, [statusFilter, searchTerm]);

  const upcomingMilestones = useMemo(() => {
    return PROJECTS.flatMap((project) =>
      project.milestones.map((milestone) => ({
        projectId: project.id,
        projectName: project.name,
        status: milestone.status,
        date: milestone.date,
        owner: milestone.owner,
        name: milestone.name,
      })),
    )
      .filter((milestone) => new Date(milestone.date) >= new Date())
      .sort(
        (a, b) =>
          new Date(a.date).getTime() - new Date(b.date).getTime(),
      )
      .slice(0, 5);
  }, []);

  const teamUtilization = useMemo(() => {
    const map = new Map<
      string,
      {
        name: string;
        role: string;
        avatarColor: string;
        totalAllocation: number;
        projects: { id: string; name: string; status: ProjectStatus }[];
      }
    >();

    PROJECTS.forEach((project) => {
      project.team.forEach((member) => {
        if (!map.has(member.name)) {
          map.set(member.name, {
            name: member.name,
            role: member.role,
            avatarColor: member.avatarColor,
            totalAllocation: member.allocation,
            projects: [{ id: project.id, name: project.name, status: project.status }],
          });
        } else {
          const current = map.get(member.name);
          if (!current) return;
          current.totalAllocation += member.allocation;
          current.projects.push({
            id: project.id,
            name: project.name,
            status: project.status,
          });
        }
      });
    });

    return Array.from(map.values()).sort(
      (a, b) => b.totalAllocation - a.totalAllocation,
    );
  }, []);

  const spotlightProject = useMemo(() => {
    const attentionProjects = PROJECTS.filter(
      (project) => project.status === "At Risk" || project.status === "Stalled",
    ).sort(
      (a, b) =>
        new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
    );
    return attentionProjects[0] ?? PROJECTS[0];
  }, []);

  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),transparent_55%),radial-gradient(circle_at_bottom,_rgba(147,51,234,0.08),transparent_55%)]" />
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-10 px-4 pb-16 pt-10 md:px-8">
        <header className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium uppercase tracking-[0.28em] text-slate-400">
              Portfolio Command Center
            </span>
            <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Project Tracker Dashboard
            </h1>
            <p className="max-w-2xl text-base text-slate-300 md:text-lg">
              Stay ahead of delivery with portfolio health, upcoming milestones, and team workload in one real-time view.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-right text-sm text-slate-200">
              <div>Week of {longDateFormatter.format(new Date())}</div>
              <div className="text-xs text-slate-400">
                {PROJECTS.length} projects · {teamUtilization.length} leads
              </div>
            </div>
            <div className="flex overflow-hidden rounded-full border border-white/10 bg-white/5 backdrop-blur">
              <button className="px-5 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10">
                Export report
              </button>
              <button className="bg-emerald-500/90 px-5 py-2 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-400">
                New project
              </button>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl shadow-slate-950/40"
            >
              <div
                className={`absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br ${metric.accent} blur-2xl`}
              />
              <div className="relative flex flex-col gap-4">
                <span className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                  {metric.label}
                </span>
                <span className="text-4xl font-semibold text-white">
                  {metric.value}
                </span>
                <span className="text-sm text-slate-300">{metric.caption}</span>
              </div>
            </div>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,_2.2fr)_minmax(0,_1fr)]">
          <div className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl shadow-slate-950/40">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Portfolio overview
                </h2>
                <p className="text-sm text-slate-400">
                  Filter by status or search by project, lead, or keyword.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4 text-slate-400"
                    fill="none"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-4.35-4.35m0 0A6.75 6.75 0 105.25 5.25a6.75 6.75 0 0011.4 11.4z"
                    />
                  </svg>
                  <input
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    className="w-48 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
                    placeholder="Search projects"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto rounded-full border border-white/10 bg-white/5 p-1">
                  {statusFilters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setStatusFilter(filter)}
                      className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                        statusFilter === filter
                          ? "bg-emerald-500 text-emerald-950 shadow-lg shadow-emerald-500/30"
                          : "text-slate-300 hover:bg-white/10"
                      }`}
                      type="button"
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/5">
              <div className="grid grid-cols-[minmax(220px,_1.6fr)_minmax(120px,_1fr)_minmax(120px,_0.9fr)_minmax(120px,_0.9fr)_minmax(160px,_1.2fr)] bg-white/5 px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                <span>Project</span>
                <span>Status</span>
                <span>Due</span>
                <span>Budget</span>
                <span>Team</span>
              </div>
              <div className="divide-y divide-white/5 bg-slate-950/40">
                {filteredProjects.length === 0 ? (
                  <div className="px-6 py-16 text-center text-sm text-slate-400">
                    No projects match your filters. Try a different keyword or status.
                  </div>
                ) : (
                  filteredProjects.map((project) => (
                    <div
                      key={project.id}
                      className="grid grid-cols-[minmax(220px,_1.6fr)_minmax(120px,_1fr)_minmax(120px,_0.9fr)_minmax(120px,_0.9fr)_minmax(160px,_1.2fr)] items-center gap-4 px-6 py-5 text-sm text-slate-200 hover:bg-white/5"
                    >
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-white">
                            {project.name}
                          </span>
                          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] uppercase tracking-[0.24em] text-slate-400">
                            {project.stage}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">{project.summary}</p>
                        <div className="flex items-center gap-3 text-xs text-slate-400">
                          <span className="font-medium text-slate-300">
                            {project.manager}
                          </span>
                          <span aria-hidden>•</span>
                          <span>Updated {formatRelativeTimestamp(project.lastUpdated)}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <StatusBadge status={project.status} />
                      </div>
                      <div className="flex flex-col gap-1 text-xs text-slate-300">
                        <span className="text-sm text-slate-100">
                          {dateFormatter.format(new Date(project.dueDate))}
                        </span>
                        <span>
                          {Math.max(
                            0,
                            Math.ceil(
                              (new Date(project.dueDate).getTime() -
                                new Date().getTime()) /
                                (1000 * 60 * 60 * 24),
                            ),
                          )}{" "}
                          days left
                        </span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-full rounded-full bg-slate-800">
                            <div
                              className="h-2 rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-sky-500"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                          <span className="w-12 text-right text-xs text-slate-300">
                            {project.progress}%
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <span>Budget</span>
                          <span className="font-semibold text-slate-200">
                            {Math.round(project.budgetUsed * 100)}%
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex -space-x-3">
                          {project.team.slice(0, 3).map((member) => (
                            <span
                              key={member.name}
                              className={`flex h-9 w-9 items-center justify-center rounded-full border border-slate-950 text-xs font-semibold text-white ${member.avatarColor}`}
                              title={`${member.name} · ${member.role}`}
                            >
                              {getInitials(member.name)}
                            </span>
                          ))}
                          {project.team.length > 3 ? (
                            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/10 text-xs font-semibold text-slate-200">
                              +{project.team.length - 3}
                            </span>
                          ) : null}
                        </div>
                        <div className="flex flex-col text-xs text-slate-400">
                          {project.highlights.map((highlight) => (
                            <span key={highlight.label}>
                              <span className="text-slate-500">{highlight.label}:</span>{" "}
                              <span className="text-slate-200">{highlight.value}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="rounded-3xl border border-amber-400/30 bg-amber-500/10 p-6 shadow-lg shadow-amber-500/20">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">
                    Needs attention
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-white">
                    {spotlightProject.name}
                  </h3>
                  <p className="mt-2 text-sm text-amber-100/80">
                    {spotlightProject.summary}
                  </p>
                </div>
                <StatusBadge status={spotlightProject.status} />
              </div>
              <dl className="mt-4 grid gap-3 text-sm text-amber-100/90">
                <div className="flex items-center justify-between">
                  <dt>Owner</dt>
                  <dd className="font-medium text-white">
                    {spotlightProject.manager}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt>Due</dt>
                  <dd className="font-medium text-white">
                    {longDateFormatter.format(new Date(spotlightProject.dueDate))}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt>Budget</dt>
                  <dd className="font-medium text-white">
                    {Math.round(spotlightProject.budgetUsed * 100)}% utilized
                  </dd>
                </div>
              </dl>
              <div className="mt-5 rounded-2xl bg-black/10 p-4 text-xs text-amber-100/80">
                <p className="font-semibold uppercase tracking-[0.2em] text-amber-200">
                  Next milestones
                </p>
                <ul className="mt-3 space-y-2">
                  {spotlightProject.milestones.slice(0, 2).map((milestone) => (
                    <li key={milestone.name} className="flex justify-between gap-4">
                      <span className="text-amber-100/90">{milestone.name}</span>
                      <span className="font-medium text-amber-100">
                        {dateFormatter.format(new Date(milestone.date))}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl shadow-slate-950/40">
              <h3 className="text-lg font-semibold text-white">Upcoming milestones</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {upcomingMilestones.map((milestone) => (
                  <li
                    key={`${milestone.projectId}-${milestone.name}`}
                    className="flex items-start justify-between gap-4 rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-slate-200"
                  >
                    <div className="flex flex-col">
                      <span className="font-semibold text-white">
                        {milestone.name}
                      </span>
                      <span className="text-xs uppercase tracking-[0.24em] text-slate-400">
                        {milestone.projectId}
                      </span>
                      <span className="mt-1 text-xs text-slate-400">
                        {milestone.projectName} · {milestone.owner}
                      </span>
                    </div>
                    <div className="text-right text-xs text-slate-300">
                      <div className="font-semibold text-slate-100">
                        {dateFormatter.format(new Date(milestone.date))}
                      </div>
                      <div className="text-slate-400">{milestone.status}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl shadow-slate-950/40">
              <h3 className="text-lg font-semibold text-white">Latest activity</h3>
              <ul className="mt-3 flex flex-col gap-3">
                {ACTIVITY.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-start gap-4 rounded-2xl border border-white/5 bg-white/5 p-4 text-sm text-slate-200"
                  >
                    <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs font-semibold uppercase tracking-[0.18em] text-slate-100">
                      {item.tag}
                    </span>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-500">
                        <span>{item.projectId}</span>
                        <span aria-hidden>•</span>
                        <span>{formatRelativeTimestamp(item.timestamp)}</span>
                      </div>
                      <p className="text-sm font-semibold text-white">
                        {item.title}
                      </p>
                      <p className="text-xs text-slate-300">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,_1.6fr)_minmax(0,_1fr)]">
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl shadow-slate-950/40">
            <h3 className="text-lg font-semibold text-white">Team allocation</h3>
            <p className="mt-1 text-sm text-slate-400">
              Allocation is calculated from each project&apos;s planned capacity split.
            </p>
            <ul className="mt-5 flex flex-col gap-4">
              {teamUtilization.map((member) => {
                const capacityPercent = Math.round(member.totalAllocation * 100);
                const overCapacity = capacityPercent > 100;
                return (
                  <li
                    key={member.name}
                    className="flex flex-col gap-3 rounded-2xl border border-white/5 bg-white/5 px-4 py-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-10 w-10 items-center justify-center rounded-full border border-slate-950 text-sm font-semibold text-white ${member.avatarColor}`}
                        >
                          {getInitials(member.name)}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {member.name}
                          </p>
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                            {member.role}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${
                          overCapacity
                            ? "bg-rose-500/20 text-rose-200"
                            : "bg-emerald-500/20 text-emerald-200"
                        }`}
                      >
                        {capacityPercent}% load
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-full rounded-full bg-slate-800">
                        <div
                          className={`h-2 rounded-full ${overCapacity ? "bg-rose-400" : "bg-emerald-400"}`}
                          style={{
                            width: `${Math.min(capacityPercent, 140)}%`,
                          }}
                        />
                      </div>
                      <span className="w-14 text-right text-xs text-slate-300">
                        {member.projects.length} proj
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs text-slate-300">
                      {member.projects.map((project) => (
                        <span
                          key={project.id}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-medium text-slate-100"
                        >
                          {project.name}
                        </span>
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl shadow-slate-950/40">
            <h3 className="text-lg font-semibold text-white">Delivery runway</h3>
            <p className="mt-1 text-sm text-slate-400">
              Visualize the portfolio cadence and ensure runway for upcoming launches.
            </p>
            <div className="mt-6 space-y-5">
              {[...PROJECTS]
                .sort(
                  (a, b) =>
                    new Date(a.dueDate).getTime() -
                    new Date(b.dueDate).getTime(),
                )
                .map((project) => (
                <div
                  key={`timeline-${project.id}`}
                  className="flex flex-col gap-3 rounded-2xl border border-white/5 bg-white/5 p-4"
                >
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">
                        {project.name}
                      </span>
                      <StatusBadge status={project.status} />
                    </div>
                    <span className="text-xs text-slate-300">
                      {longDateFormatter.format(new Date(project.dueDate))}
                    </span>
                  </div>
                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-400 via-sky-400 to-sky-500"
                      style={{ width: `${project.progress}%` }}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center justify-end pr-2 text-[11px] uppercase tracking-[0.2em] text-slate-400">
                      {project.progress}% complete
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-slate-300">
                    {project.milestones.slice(0, 3).map((milestone) => (
                      <span
                        key={`${project.id}-${milestone.name}`}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1"
                      >
                        {milestone.name} ·{" "}
                        {dateFormatter.format(new Date(milestone.date))}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
