import "server-only";
import { entries, type Entry } from "./entries";
import { projects } from "./landing";

export const projectEntries: Record<string, Entry> = Object.fromEntries(projects.map((project) => [project.slug, { name: `${project.name} 项目详情`, path: `${entries.projects.path}/${project.slug}`, available: false }]));
