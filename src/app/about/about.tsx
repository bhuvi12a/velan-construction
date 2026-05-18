"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const AboutUs = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(null);

  const stats = [
    { value: "8+", label: "Years Experience" },
    { value: "160+", label: "Projects Completed" },
    { value: "100%", label: "Client Satisfaction" },
    { value: "10+", label: "Expertise" }
  ];

  const values = [
    {
      title: "Engineering Innovation",
      description: "We adopt modern structural techniques, advanced concrete technologies, and high-quality masonry methodologies to deliver residential and commercial spaces that are durable and endurable.",
      icon: "✦"
    },
    {
      title: "Absolute Integrity",
      description: "Transparency and structural safety guide every single site decision. From foundation laying to final styling, we maintain open communication and execute our client projects with unwavering commitment.",
      icon: "◆"
    },
    {
      title: "Structural Excellence",
      description: "We set the highest quality standards for reinforcement steel, cement mixes, and construction finishing. Every column and slab is meticulously audited to ensure lasting durability.",
      icon: "◈"
    },
    {
      title: "Client Collaboration",
      description: "Your dream structure is at the heart of our civil design and execution process. We coordinate seamlessly with builders, site supervisors, and structural designers to deliver your project perfectly.",
      icon: "❖"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Site Consultation & Surveying",
      description: "We begin with a thorough soil and structural site visit to understand your layout, terrain features, project scope, blueprint goals, and preliminary budget."
    },
    {
      step: "02",
      title: "Blueprint & Layout Designing",
      description: "Our in-house architects design customized 2D floor plans, 3D structural elevations, and foundation drafts, refining them based on your feedback until they are fully approved."
    },
    {
      step: "03",
      title: "Material Sourcing & Approvals",
      description: "We prepare structural documentation, handle site sanctioning approvals, procure high-grade TMT steel, cement, and concrete aggregate from the industry's best brands."
    },
    {
      step: "04",
      title: "Core Civil Erection",
      description: "Our civil engineers execute foundation casting, column raising, RCC slab roofing, brick masonry, plastering, internal conduit piping, and electrical cabling."
    },
    {
      step: "05",
      title: "Finishing & Safe Handover",
      description: "After meticulous floor tiling, paint finishing, utility fitting, and rigorous structural safety audits, we formally hand over the keys to your new premium building."
    }
  ];

  // Design Philosophy Questions
  const designQuestions = [
    {
      question: "How do you balance structural safety with aesthetics in your building approach?",
      answer: "We believe that premium buildings must first and foremost be structurally safe and load-resilient. Our approach integrates rigorous civil engineering calculations with modern architectural aesthetics from day one, ensuring that your home is both breathtaking and structurally stable."
    },
    {
      question: "What role does structural durability and sustainability play in your process?",
      answer: "Durability is the foundation of our work. We use only premium aggregate materials, high-tensile TMT steel, and standard cement brands that minimize thermal cracking, creating eco-friendly buildings designed to stand firm for decades."
    },
    {
      question: "How do you ensure each building layout matches the owner's lifestyle?",
      answer: "Through intensive floor-planning workshops and 3D architectural reviews, we discover your specific layout desires. This collaborative approach allows us to draft custom ventilation, natural lighting systems, and structural spans tailored to your family."
    },
    {
      question: "What is your approach to integrating smart systems into new civil builds?",
      answer: "We plan conduit routing and automated utility setups during the brickwork stage itself. From concealed security lines to solar grid planning, home automation is integrated seamlessly into the physical concrete framework."
    },
    {
      question: "How do you handle fluctuating material pricing and project budget management?",
      answer: "We manage budgeting through clear Bill of Quantities (BOQ) agreements and milestone-based payments. Our long-term relations with material brands allow us to lock in prices and offer standard-to-elite construction packages without quality compromises."
    },
    {
      question: "What engineering trends do you see shaping future buildings?",
      answer: "We are observing a massive trend towards seismic-resistant framing, sustainable brickwork, and green thermal plasters. The future of contracting lies in modular, energy-efficient spaces that promote healthy living."
    },
    {
      question: "How do you guarantee that your structures stand the test of time?",
      answer: "By strictly following Indian Standard Codes (IS Codes) for all RCC work and performing standard laboratory cube testing on cement mixes during each concrete casting stage. We back our construction with a clear structural guarantee."
    }
  ];

  const toggleQuestion = (index: number) => {
    setOpenQuestionIndex(openQuestionIndex === index ? null : index);
  };

  const ScrollReveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), delay);
          }
        },
        { 
          threshold: 0.1,
          rootMargin: '50px'
        }
      );

      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, [delay]);

    return (
      <div
        ref={ref}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: `all 0.6s ease ${delay}ms`
        }}
      >
        {children}
      </div>
    );
  };

  const Counter = ({ value, suffix = "" }: { value: string; suffix?: string }) => {
    const [count, setCount] = useState(0);
    const target = parseInt(value);
    const duration = 2000;
    const steps = 60;
    const step = target / (duration / (1000 / steps));

    useEffect(() => {
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, 1000 / steps);

      return () => clearInterval(timer);
    }, [target, step]);

    return <span>{count}{suffix}</span>;
  };

  return (
    <div className="bg-white text-gray-900 font-sans" ref={containerRef}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="relative max-w-6xl mx-auto px-8 py-20 text-center">
          <ScrollReveal delay={200}>
            <div className="inline-block mb-6 bg-white/80 backdrop-blur-sm rounded-full px-6 py-2">
              <span className="text-orange-600 text-xs font-medium uppercase tracking-widest">
                Established 2018
              </span>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={400}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-4 leading-tight">
              Velan
              <span className="block mt-2 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Constructions
              </span>
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={600}>
            <div className="w-16 h-px bg-orange-400 mx-auto mb-8"></div>
          </ScrollReveal>
          
          <ScrollReveal delay={800}>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto font-light leading-relaxed mb-8">
              Building distinctive, premium structures that inspire and endure. We construct sophisticated, safe, and robust spaces that enhance the way you live and work.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={1000}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-light text-orange-600 mb-2">
                    {stat.value.includes('+') || stat.value.includes('%') ? (
                      <Counter value={stat.value.replace('+', '').replace('%', '')} suffix={stat.value.includes('%') ? '%' : '+'} />
                    ) : (
                      stat.value
                    )}
                  </div>
                  <div className="text-sm text-gray-600 uppercase tracking-wide font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Scroll Indicator */}
        <ScrollReveal delay={1200}>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="w-6 h-10 border-2 border-orange-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-orange-400 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Our Story Section */}
      <section className="py-32 px-8 bg-white relative">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-orange-600 text-xs font-medium uppercase tracking-widest">Our Story</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 mt-4 mb-4">
                A Legacy of Civil Engineering Excellence
              </h2>
              <div className="w-16 h-px bg-orange-400 mx-auto"></div>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <ScrollReveal delay={100}>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  Founded in 2018, Velan Constructions emerged from a simple belief: that exceptional structural engineering has the power to transform not just spaces, but lives. What began as a boutique site-supervision crew has evolved into a comprehensive civil contracting and building firm recognized for its meticulous attention to material quality and structural safety.
                </p>
                <p className="text-lg">
                  Over the past Eight years, we&apos;ve had the privilege of engineering and constructing diverse projects spanning residential villas, independent houses, commercial showrooms, and warehouse sectors. Each project has deepened our expertise in soil analysis, concrete durability, and structural layout design.
                </p>
                <p className="text-lg">
                   Our firm integrates the collective expertise of architects, civil engineers, and experienced project managers, all united by an unwavering passion for execution quality. We champion a highly collaborative methodology where client vision and structural expertise converge harmoniously, transforming drawings into beautiful, long-lasting brick and concrete realities.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="relative">
                <div className="aspect-[4/5] bg-gradient-to-br from-orange-100 to-amber-50 rounded-2xl flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full p-6 flex items-center justify-center">
                    <Image src="/logo.png" alt="Velan Constructions" width={800} height={1000} className="w-full h-full object-contain" priority />
                  </div>
                </div>
                <div className="absolute top-8 right-8 w-full h-full border-2 border-orange-200 rounded-2xl -z-10"></div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-32 px-8 bg-gradient-to-b from-gray-50 to-white relative">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-orange-600 text-xs font-medium uppercase tracking-widest">Our Values</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 mt-4 mb-4">
                What Drives Us
              </h2>
              <div className="w-16 h-px bg-orange-400 mx-auto"></div>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="text-3xl text-orange-600 mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-light text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-32 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20">
              <span className="text-orange-600 text-xs font-medium uppercase tracking-widest">Our Process</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 mt-4 mb-4">
                From Vision to Reality
              </h2>
              <div className="w-16 h-px bg-orange-400 mx-auto mb-4"></div>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                A structured approach that ensures clarity, quality, and exceptional results at every stage
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-8">
            {process.map((item, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div className="bg-gradient-to-r from-gray-50 to-white p-8 md:p-10 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center">
                        <span className="text-orange-600 font-light text-2xl">{item.step}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-light text-gray-900 mb-4">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Design Philosophy Questions Section */}
      <section className="py-32 px-8 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20">
              <span className="text-orange-600 text-xs font-medium uppercase tracking-widest">Construction Philosophy</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 mt-4 mb-4">
                Questions That Define Our Approach
              </h2>
              <div className="w-16 h-px bg-orange-400 mx-auto mb-4"></div>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Our construction philosophy is shaped by these fundamental principles that guide every single project we undertake
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {designQuestions.map((item, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300">
                  <button
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-orange-50 transition-colors duration-300"
                    onClick={() => toggleQuestion(index)}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-4">
                        <span className="text-orange-600 font-light text-xl">Q</span>
                      </div>
                      <h3 className="text-xl font-light text-gray-900">{item.question}</h3>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <svg
                        className={`w-6 h-6 text-orange-600 transform transition-transform duration-300 ${
                          openQuestionIndex === index ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </button>
                  
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openQuestionIndex === index ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <div className="p-6 pt-0 border-t border-gray-100">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                          <span className="text-gray-600 font-light text-xl">A</span>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-32 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-12 md:p-16 rounded-3xl text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 mb-4">
                Our Commitment to Quality & Safety
              </h2>
              <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed mb-6">
                We recognize our massive responsibility to site workers, environment, and building occupants. Our commitment to structural resilience includes sourcing certified grade TMT steel, performing laboratory slump and cube tests, partnering with safety-first vendors, and building spaces that endure for generations.
              </p>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div>
                  <div className="text-3xl text-orange-600 mb-3">🧱</div>
                  <h4 className="font-medium text-gray-900 mb-2">Certified Grade Materials</h4>
                  <p className="text-sm text-gray-600">Standardized steel and high-durability concrete</p>
                </div>
                <div>
                  <div className="text-3xl text-orange-600 mb-3">🛡️</div>
                  <h4 className="font-medium text-gray-900 mb-2">Strict Site Safety</h4>
                  <p className="text-sm text-gray-600">Minimizing accidental hazards and risk</p>
                </div>
                <div>
                  <div className="text-3xl text-orange-600 mb-3">💪</div>
                  <h4 className="font-medium text-gray-900 mb-2">Seismic Resistance</h4>
                  <p className="text-sm text-gray-600">Strong structural framing and masonry</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-4">
              Let&apos;s Build Something Exceptional
            </h2>
            <p className="text-base sm:text-lg text-gray-300 mb-8 font-light">
              We&apos;d love to hear about your construction project and explore how we can bring your structural vision to life
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow duration-300 inline-flex items-center justify-center"
                aria-label="Schedule a Consultation"
              >
                Schedule a Consultation
              </Link>
              <Link
                href="/portfolio"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-gray-900 transition-colors duration-300 inline-flex items-center justify-center"
                aria-label="View Our Portfolio"
              >
                View Our Portfolio
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;