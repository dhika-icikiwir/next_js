import { Mail } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { KopRuleDraw } from '@/components/gsap/kop-rule-draw';
import { TimelineRail } from '@/components/gsap/timeline-rail';
import { TypewriterHeading } from '@/components/gsap/typewriter-heading';
import { BlurFade } from '@/components/magicui/blur-fade';
import { MagicCard } from '@/components/magicui/magic-card';
import { ScrollProgress } from '@/components/magicui/scroll-progress';
import { GithubIcon } from '@/components/portfolio/github-icon';
import { InternHighlight } from '@/components/portfolio/intern-highlight';
import { Navbar } from '@/components/portfolio/navbar';
import { SectionHeading } from '@/components/portfolio/section-heading';
import {
  education,
  experience,
  profile,
  projects,
  skillGroups,
  type TimelineItem,
} from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';

const biodata = [
  { label: 'Nama', value: profile.name },
  { label: 'Kelas', value: profile.role },
  { label: 'Sekolah', value: profile.school },
  { label: 'Tempat magang', value: profile.internship },
  { label: 'Domisili', value: profile.location },
  { label: 'Minat', value: 'Pengembangan web' },
];

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <a
        href="#isi"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-3 focus:text-primary-foreground"
      >
        Langsung ke isi halaman
      </a>
      <ScrollProgress />
      <Navbar />

      <main id="isi" className="flex-1">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <footer className="border-t">
        <div className="container flex flex-col gap-1 py-6 text-sm text-muted-foreground sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p>Dibuat dengan Next.js, shadcn/ui, Magic UI, dan GSAP</p>
        </div>
      </footer>
    </div>
  );
}

function Hero() {
  return (
    <section id="beranda" aria-labelledby="beranda-judul" className="container scroll-mt-20 py-14 md:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="mb-4 text-muted-foreground">Portofolio · {profile.location}</p>
          <TypewriterHeading
            id="beranda-judul"
            className="font-serif text-5xl font-bold leading-tight sm:text-6xl"
          >
            {profile.name}
          </TypewriterHeading>
          <p className="mt-6 max-w-xl text-lg leading-relaxed">
            Siswa kelas XII Rekayasa Perangkat Lunak di {profile.school}. Sekarang sedang magang di{' '}
            <span className="font-semibold text-primary">
              <InternHighlight>{profile.internship}</InternHighlight>
            </span>
            , sambil terus belajar membangun website dengan Next.js.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button className="h-11 px-6 text-base" asChild>
              <a href={`mailto:${profile.email}`}>
                <Mail aria-hidden="true" />
                Kirim Email
              </a>
            </Button>
            <Button variant="outline" className="h-11 px-6 text-base" asChild>
              <a href="#proyek">Lihat Proyek Saya</a>
            </Button>
          </div>
        </div>

        <BlurFade className="lg:col-span-5" direction="up" offset={16} delay={0.15}>
          <BiodataSheet />
        </BlurFade>
      </div>
    </section>
  );
}

function BiodataSheet({ className }: { className?: string }) {
  const [, kelas, ...details] = biodata;

  return (
    <figure className={cn('w-full max-w-xl rounded-sm border bg-card p-5 shadow-md sm:p-8', className)}>
      <figcaption className="text-center font-serif text-lg font-bold">Lembar Biodata Siswa</figcaption>
      <div className="kop-rule mb-6 mt-3" aria-hidden="true" />

      <div className="flex items-start gap-5">
        {/* Gambar dari public/profile.jpg; kalau file belum ada, inisial yang tampil. */}
        <div className="flex shrink-0 flex-col items-center gap-2">
          <Avatar
            className={cn(
              'h-28 w-[5.25rem] rounded-none border border-input',
              !profile.photo && 'border-dashed',
            )}
          >
            {profile.photo && <AvatarImage src={profile.photo} alt={profile.photoAlt} />}
            <AvatarFallback className="rounded-none bg-secondary font-serif text-2xl font-bold text-primary">
              {profile.initials}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">Pas foto 3×4</span>
        </div>

        <dl className="min-w-0 space-y-3">
          <div>
            <dt className="text-sm text-muted-foreground">Nama</dt>
            <dd className="font-serif text-xl font-bold">{profile.name}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">{kelas.label}</dt>
            <dd className="font-medium">{kelas.value}</dd>
          </div>
        </dl>
      </div>

      <dl className="mt-6 space-y-3 border-t pt-5 text-sm">
        {details.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-3 sm:grid-cols-[8rem_minmax(0,1fr)]"
          >
            <dt className="text-muted-foreground">{row.label}</dt>
            <dd className="font-medium">{row.value}</dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}

function About() {
  return (
    <section id="tentang" aria-labelledby="tentang-judul" className="scroll-mt-20 border-t bg-card/60">
      <div className="container grid gap-6 py-16 md:grid-cols-12 md:py-20">
        <BlurFade inView className="md:col-span-4">
          <SectionHeading id="tentang-judul" title="Tentang Saya" />
        </BlurFade>
        <div className="max-w-prose space-y-4 text-lg leading-relaxed md:col-span-8">
          {profile.about.map((paragraph, i) => (
            <BlurFade key={paragraph} inView delay={0.1 + i * 0.1}>
              <p>{paragraph}</p>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section
      id="pengalaman"
      aria-labelledby="pengalaman-judul"
      className="container scroll-mt-20 py-16 md:py-20"
    >
      <BlurFade inView>
        <SectionHeading
          id="pengalaman-judul"
          title="Pengalaman & Pendidikan"
          lead="Tempat saya belajar sekarang, di kelas dan di dunia kerja."
        />
      </BlurFade>

      <TimelineRail>
        <h3 className="mb-2 text-sm font-semibold text-muted-foreground">Pengalaman</h3>
        <Timeline items={experience} />

        <h3 className="mb-2 mt-12 text-sm font-semibold text-muted-foreground">Pendidikan</h3>
        <Timeline items={education} />
      </TimelineRail>
    </section>
  );
}

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="divide-y border-y">
      {items.map((item) => (
        <li key={item.title + item.place} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-[25px] top-8 h-[9px] w-[9px] rounded-full border-2 border-primary bg-background md:-left-[41px]"
          />
          <BlurFade inView className="grid gap-2 py-6 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-4">
              <p className="font-semibold">{item.place}</p>
              <p className="text-sm text-muted-foreground">{item.period}</p>
            </div>
            <div className="md:col-span-8">
              <p className="font-serif text-xl font-bold">{item.title}</p>
              <p className="mt-2 leading-relaxed">{item.description}</p>
              {item.points && (
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted-foreground marker:text-primary">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
          </BlurFade>
        </li>
      ))}
    </ol>
  );
}

function Skills() {
  return (
    <section id="keahlian" aria-labelledby="keahlian-judul" className="scroll-mt-20 border-t bg-card/60">
      <div className="container py-16 md:py-20">
        <BlurFade inView>
          <SectionHeading
            id="keahlian-judul"
            title="Keahlian"
            lead="Teknologi yang saya pelajari di sekolah dan saya pakai untuk proyek sendiri."
          />
        </BlurFade>
        <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
          {skillGroups.map((group, i) => (
            <BlurFade key={group.title} inView delay={i * 0.08}>
              <h3 className="font-semibold">{group.title}</h3>
              <Separator className="my-3" />
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li key={skill}>
                    <Badge variant="outline" className="rounded-sm px-3 py-1 text-sm font-medium">
                      {skill}
                    </Badge>
                  </li>
                ))}
              </ul>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [featured, ...others] = projects;

  return (
    <section id="proyek" aria-labelledby="proyek-judul" className="container scroll-mt-20 py-16 md:py-20">
      <BlurFade inView>
        <SectionHeading
          id="proyek-judul"
          title="Proyek"
          lead="Proyek yang kodenya bisa kamu lihat langsung di GitHub."
        />
      </BlurFade>

      {!featured ? (
        <p className="rounded-md border border-dashed p-8 text-center text-muted-foreground">
          Belum ada proyek yang ditampilkan.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-5">
          <BlurFade inView className="md:col-span-3">
            <MagicCard className="h-full rounded-md">
              <article className="flex h-full flex-col p-6 sm:p-8">
                <h3 className="font-serif text-2xl font-bold">{featured.title}</h3>
                <p className="mt-3 flex-1 leading-relaxed">{featured.description}</p>
                <ProjectTags tags={featured.tags} />
                <ProjectLinks project={featured} />
              </article>
            </MagicCard>
          </BlurFade>

          {others.length > 0 && (
            <div className="flex flex-col gap-6 md:col-span-2">
              {others.map((project, i) => (
                <BlurFade key={project.title} inView delay={0.1 + i * 0.1} className="flex flex-1 flex-col">
                  <MagicCard className="flex-1 rounded-md">
                    <article className="flex h-full flex-col p-6">
                      <h3 className="font-serif text-xl font-bold">{project.title}</h3>
                      <p className="mt-2 flex-1 text-muted-foreground">{project.description}</p>
                      <ProjectTags tags={project.tags} />
                      <ProjectLinks project={project} />
                    </article>
                  </MagicCard>
                </BlurFade>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function ProjectTags({ tags }: { tags: string[] }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Teknologi">
      {tags.map((tag) => (
        <li key={tag}>
          <Badge variant="secondary" className="rounded-sm font-medium">
            {tag}
          </Badge>
        </li>
      ))}
    </ul>
  );
}

function ProjectLinks({ project }: { project: (typeof projects)[number] }) {
  if (!project.repo && !project.demo) return null;

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {project.demo && (
        <Button className="h-11" asChild>
          <a href={project.demo} target="_blank" rel="noreferrer">
            Buka Demo
          </a>
        </Button>
      )}
      {project.repo && (
        <Button variant="outline" className="h-11" asChild>
          <a href={project.repo} target="_blank" rel="noreferrer">
            <GithubIcon className="h-4 w-4" />
            Lihat Kode di GitHub
          </a>
        </Button>
      )}
    </div>
  );
}

function Contact() {
  return (
    <section id="kontak" aria-labelledby="kontak-judul" className="scroll-mt-20 border-t bg-card/60">
      <div className="container py-16 md:py-24">
        <BlurFade
          inView
          offset={16}
          direction="up"
          className="mx-auto max-w-2xl rounded-sm border bg-card p-6 shadow-md sm:p-10"
        >
          <KopRuleDraw className="mb-8" />
          <h2 id="kontak-judul" className="font-serif text-3xl font-bold sm:text-4xl">
            Mari Terhubung
          </h2>
          <p className="mt-4 text-lg leading-relaxed">
            Saya terbuka untuk tawaran magang, kerja sama proyek, atau sekadar diskusi soal web. Cara paling
            cepat menghubungi saya adalah lewat email.
          </p>

          <dl className="mt-6 space-y-2 text-sm">
            <div className="grid grid-cols-[5.5rem_1fr] gap-2">
              <dt className="text-muted-foreground">Email</dt>
              <dd className="break-all font-medium">{profile.email}</dd>
            </div>
            <div className="grid grid-cols-[5.5rem_1fr] gap-2">
              <dt className="text-muted-foreground">GitHub</dt>
              <dd className="font-medium">@{profile.githubUsername}</dd>
            </div>
            <div className="grid grid-cols-[5.5rem_1fr] gap-2">
              <dt className="text-muted-foreground">Domisili</dt>
              <dd className="font-medium">{profile.location}</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button className="h-11 px-6 text-base" asChild>
              <a href={`mailto:${profile.email}`}>
                <Mail aria-hidden="true" />
                Kirim Email ke Adhika
              </a>
            </Button>
            <Button variant="outline" className="h-11 px-6 text-base" asChild>
              <a href={profile.github} target="_blank" rel="noreferrer">
                <GithubIcon className="h-4 w-4" />
                Buka Profil GitHub
              </a>
            </Button>
          </div>

          <div className="mt-10 text-right">
            <p className="text-muted-foreground">Hormat saya,</p>
            <p className="mt-6 font-serif text-2xl font-bold">{profile.name}</p>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
