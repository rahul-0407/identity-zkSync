import React, { useState } from "react";
import { Button } from "../components/ui/Button";

const Policy = () => {
  return (
    <div className="min-h-screen bg-neutral-950 pb-20 pt-25  px-4 ">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <div className="bg-slate-800 no-underline group  relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </span>
            <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
              <span>Privacy</span>
            </div>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
          </div>
          <h1 className=" bg-gradient-to-tl from-indigo-400 via-pink-100 to-gray-100 text-transparent bg-clip-text text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-4 leading-relaxed">
            Your privacy is our top priority. At Identity 3, we safeguard your
            data with advanced security protocols, ensuring transparency and
            full control over your personal information.
          </p>
          <p className="text-sm text-gray-500">Last updated: August 24, 2025</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 lg:p-12">
            <div className="prose prose-invert prose-lg max-w-none">
              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-white">
                  Introduction
                </h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  At Identity 3, we prioritize your privacy and are committed to
                  protecting your personal information. This Privacy Policy
                  outlines how we collect, use, and safeguard the data you share
                  with us. Whether you're exploring our services or actively
                  engaging with our digital identity solutions, your privacy is
                  of paramount importance.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  We ensure that all your interactions with our platform are
                  secure, transparent, and aligned with the highest standards of
                  data protection. This policy applies to all users of our
                  platform and services.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-white">
                  Data Collection and Usage
                </h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  We collect various types of information to provide you with
                  the best possible experience on our platform:
                </p>
                <ul className="text-gray-300 leading-relaxed mb-6 space-y-2">
                  <li>
                    • Personal identification information (name, email address,
                    phone number)
                  </li>
                  <li>• Digital identity verification data</li>
                  <li>• Transaction and usage analytics</li>
                  <li>• Device and browser information</li>
                  <li>• Blockchain wallet addresses and transaction data</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  This information helps us verify your identity, process
                  transactions, improve our services, comply with legal
                  requirements, and provide customer support. All data
                  collection is done with your explicit consent and in
                  accordance with applicable privacy laws.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-white">
                  Data Sharing and Disclosure
                </h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  We do not sell, trade, or otherwise transfer your personal
                  information to third parties without your consent. We may
                  share your information only in the following circumstances:
                </p>
                <ul className="text-gray-300 leading-relaxed mb-6 space-y-2">
                  <li>• When required by law or legal process</li>
                  <li>• To protect our rights, safety, and property</li>
                  <li>
                    • With trusted service providers bound by confidentiality
                    agreements
                  </li>
                  <li>• In connection with business transfers or mergers</li>
                  <li>• With your explicit consent for specific purposes</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  Any third-party service providers we work with are required to
                  maintain the same level of data protection and are bound by
                  strict confidentiality agreements.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-white">
                  Security Measures
                </h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  We implement comprehensive security measures to protect your
                  personal information:
                </p>
                <ul className="text-gray-300 leading-relaxed mb-6 space-y-2">
                  <li>• End-to-end encryption for all data transmission</li>
                  <li>• Secure blockchain-based identity verification</li>
                  <li>• Multi-factor authentication systems</li>
                  <li>• Regular security audits and penetration testing</li>
                  <li>• Compliance with industry security standards</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  We continuously review and update our security practices to
                  adapt to new threats and technologies, providing you with a
                  secure environment for all your digital identity interactions.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-white">
                  Your Rights
                </h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  You have the following rights regarding your personal data:
                </p>
                <ul className="text-gray-300 leading-relaxed mb-6 space-y-2">
                  <li>• Access your personal information we hold</li>
                  <li>• Request correction of inaccurate data</li>
                  <li>• Request deletion of your personal data</li>
                  <li>• Object to processing of your data</li>
                  <li>• Data portability rights</li>
                  <li>• Withdraw consent at any time</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  To exercise any of these rights, please contact our support
                  team using the information provided below.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-white">
                  Changes to This Policy
                </h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Identity 3 may update this Privacy Policy periodically to
                  reflect changes in our practices, legal requirements, or
                  industry standards. We will notify you of any significant
                  changes through our platform or via email.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  We encourage you to review this policy regularly to stay
                  informed about how we protect your information and ensure your
                  privacy. The "Last updated" date at the top of this policy
                  indicates when the most recent changes were made.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-white">
                  Contact Us
                </h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  If you have any questions about this Privacy Policy or our
                  data practices, please contact our support team:
                </p>
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                  <p className="text-gray-300 mb-2">
                    <strong className="text-white">Email:</strong>{" "}
                    privacy@identity3.com
                  </p>
                  <p className="text-gray-300 mb-2">
                    <strong className="text-white">Support:</strong>{" "}
                    support@identity3.com
                  </p>
                  <p className="text-gray-300">
                    <strong className="text-white">Response Time:</strong> We
                    aim to respond within 24-48 hours
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policy;
