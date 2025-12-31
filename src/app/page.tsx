import Hero from "@/app/components/Hero";
import Features from "@/app/components/Features";

export default function Home() {
    return (
        <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
            <main className="flex flex-col min-h-screen">

                {/* 1. Secció Hero (Portada) */}
                <Hero />

                {/* 2. Secció Features (Informació) */}
                <Features />

                {/* 3. Un petit footer ràpid (es pot moure a un component després) */}
                <footer className="bg-stone-900 text-stone-400 py-8 text-center text-sm">
                    <p>© 2024 La Meva Cafeteria. Fet amb molt de ☕ i codi.</p>
                </footer>

            </main>
        </div>
    );
}