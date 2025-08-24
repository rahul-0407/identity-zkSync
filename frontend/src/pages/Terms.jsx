import React from 'react'

const Terms = () => {
  return (
    <div className="min-h-screen bg-neutral-950 pb-20 pt-25  px-4  text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="bg-slate-800 no-underline group  relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </span>
            <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
              <span>Awareness</span>
            </div>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
          </div>
          <h1 className=" bg-gradient-to-tl from-indigo-400 via-pink-100 to-gray-100 text-transparent bg-clip-text text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Terms of Use
          </h1>
          <p className="text-xl text-gray-400 mb-4 max-w-3xl mx-auto">
            These terms and conditions outline the rules and regulations for the use of Identity 3's services and
            platform.
          </p>
          <p className="text-sm text-gray-500">Last updated: January 15, 2025</p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 md:p-12">
            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">1. Introduction</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Welcome to Identity 3. These Terms of Use ("Terms") govern your use of our digital identity platform,
                including our website, mobile applications, and related services (collectively, the "Service"). By
                accessing or using our Service, you agree to be bound by these Terms.
              </p>
              <p className="text-gray-300 leading-relaxed">
                If you disagree with any part of these terms, then you may not access the Service. These Terms apply to
                all visitors, users, and others who access or use the Service.
              </p>
            </section>

            {/* Acceptance of Terms */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">2. Acceptance of Terms</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                By creating an account or using our Service, you acknowledge that you have read, understood, and agree
                to be bound by these Terms and our Privacy Policy.
              </p>
              <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-2">
                <li>You must be at least 18 years old to use our Service</li>
                <li>You must provide accurate and complete information when creating an account</li>
                <li>You are responsible for maintaining the security of your account credentials</li>
                <li>You agree to notify us immediately of any unauthorized use of your account</li>
              </ul>
            </section>

            {/* Use of Service */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">3. Use of Service</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Our Service allows you to securely store, manage, and verify digital documents and identity credentials.
                You may use our Service for lawful purposes only.
              </p>
              <h3 className="text-xl font-semibold mb-3 text-gray-200">Permitted Uses:</h3>
              <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-2 mb-4">
                <li>Store and manage your personal digital documents</li>
                <li>Verify document authenticity using our verification tools</li>
                <li>Share documents securely with authorized parties</li>
                <li>Access your documents from multiple devices</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3 text-gray-200">Prohibited Uses:</h3>
              <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-2">
                <li>Upload fraudulent, fake, or misleading documents</li>
                <li>Attempt to access other users' accounts or data</li>
                <li>Use the Service for illegal activities or to violate any laws</li>
                <li>Interfere with or disrupt the Service or servers</li>
                <li>Reverse engineer or attempt to extract source code</li>
              </ul>
            </section>

            {/* User Accounts */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">4. User Accounts</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                To access certain features of our Service, you must create an account. You are responsible for:
              </p>
              <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-2">
                <li>Maintaining the confidentiality of your account information</li>
                <li>All activities that occur under your account</li>
                <li>Ensuring your account information is accurate and up-to-date</li>
                <li>Immediately notifying us of any security breaches</li>
              </ul>
            </section>

            {/* Data and Privacy */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">5. Data and Privacy</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We take your privacy seriously. Our collection, use, and protection of your personal information is
                governed by our Privacy Policy, which is incorporated into these Terms by reference.
              </p>
              <p className="text-gray-300 leading-relaxed">
                You retain ownership of all documents and data you upload to our Service. We implement end-to-end
                encryption and advanced security measures to protect your information.
              </p>
            </section>

            {/* Intellectual Property */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">6. Intellectual Property</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                The Service and its original content, features, and functionality are owned by Identity 3 and are
                protected by international copyright, trademark, patent, trade secret, and other intellectual property
                laws.
              </p>
              <p className="text-gray-300 leading-relaxed">
                You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly
                perform, republish, download, store, or transmit any of the material on our Service without our prior
                written consent.
              </p>
            </section>

            {/* Service Availability */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">7. Service Availability</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We strive to maintain high availability of our Service, but we cannot guarantee uninterrupted access.
                The Service may be temporarily unavailable due to:
              </p>
              <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-2">
                <li>Scheduled maintenance and updates</li>
                <li>Technical difficulties or system failures</li>
                <li>Circumstances beyond our reasonable control</li>
                <li>Security-related shutdowns</li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">8. Limitation of Liability</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                To the maximum extent permitted by law, Identity 3 shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages, including without limitation, loss of profits, data, use,
                goodwill, or other intangible losses.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Our total liability to you for all claims arising from or relating to the Service shall not exceed the
                amount you paid us in the twelve months preceding the claim.
              </p>
            </section>

            {/* Termination */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">9. Termination</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We may terminate or suspend your account and access to the Service immediately, without prior notice,
                for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
              </p>
              <p className="text-gray-300 leading-relaxed">
                You may terminate your account at any time by contacting our support team. Upon termination, your right
                to use the Service will cease immediately.
              </p>
            </section>

            {/* Changes to Terms */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">10. Changes to Terms</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We reserve the right to modify these Terms at any time. We will notify you of any material changes by
                posting the new Terms on this page and updating the "Last updated" date.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Your continued use of the Service after any such changes constitutes your acceptance of the new Terms.
                If you do not agree to the modified Terms, you must stop using the Service.
              </p>
            </section>

            {/* Governing Law */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">11. Governing Law</h2>
              <p className="text-gray-300 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which
                Identity 3 operates, without regard to its conflict of law provisions. Any disputes arising from these
                Terms will be resolved through binding arbitration.
              </p>
            </section>

            {/* Contact Information */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 mt-12">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you have any questions about these Terms of Use, please contact our legal team:
              </p>
              <div className="text-gray-300">
                <p className="mb-2">
                  <strong>Email:</strong> legal@identity3.com
                </p>
                <p className="mb-2">
                  <strong>Address:</strong> 123 Digital Identity Street, Tech City, TC 12345
                </p>
                <p>
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Terms