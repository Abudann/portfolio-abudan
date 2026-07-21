import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with clsx for conditional class application.
 * Resolves conflicts between Tailwind classes automatically.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a phone number for wa.me link
 */
export function formatWhatsAppLink(phone: string, message?: string): string {
  const cleaned = phone.replace(/[^0-9]/g, "");
  // Convert Indonesian local format to international
  const international = cleaned.startsWith("0") ? `62${cleaned.slice(1)}` : cleaned;
  const base = `https://wa.me/${international}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/**
 * Site configuration — single source of truth for personal info
 */
export const siteConfig = {
  name: "Abudan",
  title: "Abudan — Software Engineer Portfolio",
  description:
    "Fullstack Web Developer yang membangun aplikasi web dari front-end sampai back-end menggunakan React, Node.js, dan Laravel.",
  tagline:
    "Membangun aplikasi web dari front-end sampai back-end — dari React & Node.js hingga Laravel — dengan fokus pada antarmuka yang rapi dan sistem yang solid.",
  roles: [
    "Fullstack Web Developer",
    "JavaScript & PHP Developer",
    "Building with React, Node.js & Laravel",
  ],
  location: "Jakarta, Indonesia",
  locationNote: "Terbuka untuk kerja remote",
  email: "abudanoffice@gmail.com",
  availableForWork: true,
  social: {
    github: "https://github.com/Abudann",
    linkedin: "https://www.linkedin.com/in/abudan-abudan-1551a32a0",
    email: "mailto:abudanoffice@gmail.com",
    whatsapp: formatWhatsAppLink(
      "0857-1006-3824",
      "Halo Abudan, saya tertarik untuk berdiskusi tentang project."
    ),
  },
  stats: {
    projectsCompleted: 4,
    yearsLearning: 2,
    techStackMastered: 10,
  },
  about: {
    story: `Perjalanan saya di dunia teknologi dimulai dari jaringan komputer — instalasi LAN/WLAN, konfigurasi Mikrotik, hingga magang sebagai teknisi jaringan. Dari situ saya belajar bahwa sistem yang baik butuh fondasi yang rapi, baik jaringan fisik maupun kode.

Kini saya menempuh S1 Informatika di Universitas Nusa Mandiri dengan fokus Rekayasa Perangkat Lunak, dan mempraktikkannya lewat project nyata — dashboard admin, aplikasi web ber-AI, hingga marketplace berbasis Laravel. Saya tidak menutup diri di satu ekosistem: React, Node.js, dan Laravel/PHP semua saya pakai sesuai kebutuhan project, bukan sebaliknya.`,
    vision:
      "Menjadi software engineer yang mampu membangun produk digital end-to-end secara mandiri maupun dalam tim, dengan kualitas kode dan pengalaman pengguna yang bisa diandalkan di industri teknologi.",
    mission: [
      "Terus memperluas kemampuan lintas stack (JavaScript ecosystem maupun PHP/Laravel) agar bisa beradaptasi dengan kebutuhan tim mana pun.",
      "Membuktikan kompetensi lewat project nyata yang selesai dan bisa dipakai, bukan sekadar daftar sertifikat.",
      "Berkontribusi aktif dalam kolaborasi tim dan terus belajar dari setiap proses pengembangan produk.",
    ],
    funFacts: [
      "Memulai karier teknis dari dunia jaringan komputer sebelum beralih total ke software development.",
      "Migrasi penuh dari Windows ke Linux (Fedora) untuk lingkungan kerja development sehari-hari.",
      "Menjadikan olahraga rutin sebagai bagian tetap dari jadwal harian, sama disiplinnya dengan coding.",
    ],
    hobbies: ["Gaming", "Eksplorasi teknologi/tools baru", "Olahraga rutin"],
    languages: [
      { name: "Bahasa Indonesia", level: "Penutur Asli" },
      { name: "English", level: "Professional Working Proficiency" },
    ],
  },
  experience: [
    {
      company: "NusantaraLens",
      position: "Fullstack Web Developer",
      type: "Project-Based",
      location: "Jakarta, Indonesia",
      startDate: "Feb 2026",
      endDate: "July 2026",
      description:
        "Mengembangkan aplikasi web NusantaraLens yang mengintegrasikan fitur Asisten AI dengan fokus pada UI/UX interaktif.",
      responsibilities: [
        "Merancang dan mengimplementasikan komponen front-end utama (Navbar, Hero, AI Assistant)",
        "Membangun aplikasi menggunakan React dengan Vite, mengelola state management",
        "Berkolaborasi dalam tim untuk integrasi front-end dan back-end",
      ],
      techStack: ["React", "Vite", "JavaScript"],
    },
    {
      company: "Proyek UniQuest (Lomba PIKMI)",
      position: "Admin Dashboard Developer",
      type: "Competition",
      location: "Universitas Nusa Mandiri, Jakarta",
      startDate: "Nov 2024",
      endDate: "Nov 2024",
      description:
        "Mengembangkan UniQuest, platform untuk absensi, riwayat aktivitas, penilaian perilaku, dan sistem reward mahasiswa.",
      responsibilities: [
        "Membangun dashboard admin responsif menggunakan ReactJS dan Tailwind CSS",
        "Bekerja sama dalam tim dengan pembagian tugas front-end dan back-end",
      ],
      techStack: ["React", "Tailwind CSS"],
    },
    {
      company: "Universitas Azzahra",
      position: "Teknisi Jaringan (Magang)",
      type: "Internship",
      location: "Jakarta, Indonesia",
      startDate: "Feb 2023",
      endDate: "Mar 2023",
      description:
        "Menginstalasi infrastruktur jaringan dan melakukan troubleshooting perangkat jaringan di lingkungan kampus.",
      responsibilities: [
        "Menginstalasi kabel LAN dan perangkat jaringan di ruang kelas serta laboratorium",
        "Melakukan pengecekan koneksi internet dan troubleshooting perangkat jaringan",
        "Membantu tim IT dalam penyusunan dokumentasi konfigurasi",
      ],
      techStack: ["LAN/WLAN", "Mikrotik", "Troubleshooting"],
    },
  ],
  education: [
    {
      institution: "Universitas Nusa Mandiri",
      degree: "S1 Informatika",
      focus: "Rekayasa Perangkat Lunak",
      startYear: "2024",
      endYear: "2027 (Estimasi)",
      gpa: "3.95/4.00",
      description:
        "Aktif terlibat dalam pengembangan aplikasi, proyek teknologi, dan kompetisi inovasi digital.",
    },
    {
      institution: "SMK Jakarta Timur 1",
      degree: "Teknik Komputer dan Jaringan",
      focus: "Jaringan Komputer",
      startYear: "2021",
      endYear: "2024",
      description:
        "Fokus pada jaringan komputer, instalasi infrastruktur, dan troubleshooting sistem operasional.",
    },
  ],
} as const;
