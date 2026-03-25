import { getAllProjects } from "@/lib/server/utils";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const projects = await getAllProjects();

  const projectRoutes: MetadataRoute.Sitemap =
    projects?.map((project) => ({
      url: `${baseUrl}/project/${project.slug}`,
      lastModified: new Date(project.date),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })) ?? [];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    ...projectRoutes,
  ];
}
