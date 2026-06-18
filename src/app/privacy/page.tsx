import { ShieldCheck } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-24 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-zinc-200 p-8 sm:p-12 transition-all duration-300">
        <div className="flex items-center gap-4 mb-10 border-b border-zinc-100 pb-8">
          <ShieldCheck className="w-12 h-12 text-blue-600" />
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-950">Privacy Policy</h1>
            <p className="text-zinc-500 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div className="prose prose-zinc prose-blue max-w-none text-zinc-600 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">1. Introduction</h2>
            <p>
              At CareerForge, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">2. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Account information (name, email, password)</li>
              <li>Professional profile data (resume, work history, skills)</li>
              <li>Usage data and interactions with our AI services</li>
              <li>Payment information (processed securely via Stripe)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">3. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Personalize your career development experience</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices, updates, and support messages</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
