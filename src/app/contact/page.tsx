import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-24 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-zinc-950 sm:text-6xl">
            Get in <span className="text-blue-600">Touch</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-zinc-600">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-2xl shadow-xl border border-zinc-200 p-8 transition-all hover:-translate-y-1 hover:shadow-2xl duration-300">
              <Mail className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-zinc-900">Email Us</h3>
              <p className="text-zinc-600 mt-1">support@careerforge.ai</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border border-zinc-200 p-8 transition-all hover:-translate-y-1 hover:shadow-2xl duration-300">
              <Phone className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-zinc-900">Call Us</h3>
              <p className="text-zinc-600 mt-1">+1 (555) 123-4567</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border border-zinc-200 p-8 transition-all hover:-translate-y-1 hover:shadow-2xl duration-300">
              <MapPin className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-zinc-900">Visit Us</h3>
              <p className="text-zinc-600 mt-1">123 Innovation Drive<br/>Tech City, TC 90210</p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-zinc-200 p-8 h-full transition-all duration-300 hover:shadow-2xl">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-zinc-700">First name</label>
                    <input type="text" id="first-name" className="mt-1 block w-full rounded-lg border-zinc-300 bg-slate-50 border p-3 text-zinc-900 focus:border-blue-500 focus:ring-blue-500 outline-none transition-all" placeholder="John" />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="block text-sm font-medium text-zinc-700">Last name</label>
                    <input type="text" id="last-name" className="mt-1 block w-full rounded-lg border-zinc-300 bg-slate-50 border p-3 text-zinc-900 focus:border-blue-500 focus:ring-blue-500 outline-none transition-all" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-700">Email</label>
                  <input type="email" id="email" className="mt-1 block w-full rounded-lg border-zinc-300 bg-slate-50 border p-3 text-zinc-900 focus:border-blue-500 focus:ring-blue-500 outline-none transition-all" placeholder="john@example.com" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-zinc-700">Message</label>
                  <textarea id="message" rows={4} className="mt-1 block w-full rounded-lg border-zinc-300 bg-slate-50 border p-3 text-zinc-900 focus:border-blue-500 focus:ring-blue-500 outline-none transition-all" placeholder="How can we help you?"></textarea>
                </div>
                <button type="button" className="w-full flex justify-center items-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all hover:-translate-y-0.5">
                  Send Message
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
