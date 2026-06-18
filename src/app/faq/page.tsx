import { HelpCircle, ChevronDown } from 'lucide-react';

export default function FAQPage() {
  const faqs = [
    {
      question: "How does CareerForge use AI?",
      answer: "We use advanced large language models to analyze your resume, compare it against industry standards, and provide actionable feedback. Our AI also simulates interview scenarios tailored to your target role."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We employ enterprise-grade encryption and strict data privacy policies. We never sell your personal information to third parties."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your premium subscription at any time from your account settings. You will continue to have access until the end of your billing period."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 14-day money-back guarantee for all new subscriptions if you are not completely satisfied with our platform."
    },
    {
      question: "Which industries do you support?",
      answer: "Our AI is trained on data across tech, finance, healthcare, marketing, and more. It dynamically adapts its advice based on the specific role and industry you target."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-24 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <HelpCircle className="w-16 h-16 text-blue-600 mx-auto mb-6" />
          <h1 className="text-5xl font-extrabold tracking-tight text-zinc-950 sm:text-6xl">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h1>
          <p className="text-xl text-zinc-600">
            Everything you need to know about the product and billing.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg border border-zinc-200 p-6 transition-all hover:-translate-y-1 hover:shadow-xl duration-300 group cursor-pointer">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-blue-600 transition-colors">{faq.question}</h3>
                <ChevronDown className="w-5 h-5 text-zinc-400 group-hover:text-blue-600 transition-colors" />
              </div>
              <p className="mt-4 text-zinc-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center bg-blue-50 rounded-2xl p-8 border border-blue-100 mt-12">
          <h3 className="text-xl font-semibold text-zinc-900 mb-2">Still have questions?</h3>
          <p className="text-zinc-600 mb-6">Can't find the answer you're looking for? Please chat to our friendly team.</p>
          <a href="/contact" className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-all hover:-translate-y-0.5">
            Get in touch
          </a>
        </div>
      </div>
    </div>
  );
}
