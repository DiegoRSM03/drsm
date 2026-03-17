"use client";

import { useState } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  href: string;
  featured?: boolean;
  className?: string;
}

function ProjectCard({
  title,
  description,
  image,
  tags,
  href,
  featured = false,
  className,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link href={href} className={cn("group block", className)}>
      <motion.article
        className={cn(
          "border-border bg-surface relative overflow-hidden rounded-xl border",
          featured && "md:col-span-2"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{
          y: isHovered ? -8 : 0,
          borderColor: isHovered ? "rgba(139, 92, 246, 0.5)" : "var(--color-border)",
          boxShadow: isHovered
            ? "0 16px 48px rgba(139, 92, 246, 0.2)"
            : "0 0 0 rgba(139, 92, 246, 0)",
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative aspect-video overflow-hidden">
          {!imageLoaded && <div className="bg-elevated absolute inset-0 animate-pulse" />}
          <motion.div
            className="h-full w-full"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <NextImage
              src={image}
              alt={title}
              fill
              className="object-cover"
              onLoad={() => setImageLoaded(true)}
            />
          </motion.div>
          <motion.div
            className="from-surface absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
            animate={{ opacity: isHovered ? 0.8 : 0.6 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="relative p-6">
          <div className="mb-3 flex items-start justify-between gap-4">
            <h3 className="text-xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
              {title}
            </h3>
            <motion.div
              animate={{
                x: isHovered ? 0 : -4,
                y: isHovered ? 0 : 4,
                opacity: isHovered ? 1 : 0.5,
              }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUpRight className="text-accent h-5 w-5" />
            </motion.div>
          </div>

          <p className="text-muted mb-4 line-clamp-2 text-sm">{description}</p>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="bg-elevated text-muted rounded-full px-3 py-1 text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {isHovered && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background:
                "radial-gradient(circle at center, rgba(139, 92, 246, 0.08) 0%, transparent 70%)",
            }}
          />
        )}
      </motion.article>
    </Link>
  );
}

export { ProjectCard };
