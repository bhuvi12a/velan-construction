"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Popup from './Popup';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
}

const HomePage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setErrorMessage('Please enter your email');
      return;
    }
    
    if (!(email.toLowerCase().endsWith('@gmail.com') || email.toLowerCase().endsWith('@yahoo.com'))) {
      setErrorMessage('Please use a Gmail or Yahoo address');
      return;
    }
    
    setSubscribeStatus('loading');
    setErrorMessage('');
    
    try {
      const res = await fetch('/api/newsletter/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      setSubscribeStatus('success');
      setEmail('');
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => {
        setSubscribeStatus('idle');
      }, 3000);
      
    } catch (err: any) {
      console.error('Newsletter subscription error:', err);
      setErrorMessage(err.message || 'Failed to subscribe. Please try again.');
      setSubscribeStatus('error');
    }
  };

  const defaultTestimonials: Testimonial[] = [
    {
      id: 1,
      name: "Saraha M.",
      role: "Homeowner",
      content: "Velan Constructions built our dream home exactly how we envisioned it. Their transparency, quality of materials, and timely delivery were highly impressive.",
      rating: 5
    },
    {
      id: 2,
      name: "Satish Kumar",
      role: "Commercial Developer",
      content: "Working with the Velan team on our office building was a fantastic experience. They adhered to strict safety norms and delivered exceptional structural finishing.",
      rating: 5
    },
    {
      id: 3,
      name: "Prashanth .G",
      role: "Villa Owner",
      content: "Their structural expertise and project management capabilities are outstanding. They handled everything from zoning to final architectural handover.",
      rating: 5
    }
  ];

  const memoizedTestimonials = useMemo(() => defaultTestimonials, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % memoizedTestimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [memoizedTestimonials.length]);

  // Showcase products
  const showcaseProducts = [
    {
      id: 1,
      name: 'Modern Luxury Villa',
      image: '/living area 2.jpg',
      category: 'Residential',
      description: 'A premium, contemporary villa built with state-of-the-art materials.'
    },
    {
      id: 2,
      name: 'Corporate HQ Complex',
      image: '/master bedroom 2.jpeg',
      category: 'Commercial',
      description: 'A high-rise commercial structure with advanced engineering features.'
    },
    {
      id: 3,
      name: 'Urban Apartment Building',
      image: '/bathroom 1.jpg',
      category: 'Residential',
      description: 'A structural masterpiece featuring energy-efficient designs.'
    },
    {
      id: 4,
      name: 'Industrial Warehouse & Facility',
      image: '/entertainment 2.jpg',
      category: 'Industrial',
      description: 'Heavy-duty industrial infrastructure tailored for logistics and manufacturing.'
    }
  ];

  // Design services
  const services = [
    {
      title: 'Residential Construction',
      description: 'Custom home building, luxury villas, and multi-family residential complexes.',
      icon: '🏢'
    },
    {
      title: 'Commercial Construction',
      description: 'State-of-the-art office spaces, retail showrooms, and industrial structures.',
      icon: '🏗️'
    },
    {
      title: 'Civil Renovations',
      description: 'Structural retrofitting, home extensions, and complete remodeling services.',
      icon: '🔨'
    },
    {
      title: 'Project Management',
      description: 'End-to-end planning, architectural design integration, and turnkey construction solutions.',
      icon: '📐'
    }
  ];

  // Trusted brands with actual logos
  const trustedBrands = [
    { 
      name: 'Jaguar', 
      logo: '/jaguar.jpg',
      alt: 'Jaguar Luxury Brand'
    },
    { 
      name: 'Hindware', 
      logo: '/hindware.png',
      alt: 'Hindware Home Innovation'
    },
    { 
      name: 'Paryware', 
      logo: '/parryware.gif',
      alt: 'Paryware Kitchen & Bath'
    },
    { 
      name: 'Saint Gobin', 
      logo: '/saint.png',
      alt: 'Saint Gobain Building Materials'
    },
    { 
      name: 'Olivia', 
      logo: '/olivia.jpg',
      alt: 'Olivia'
    },
    { 
      name: 'Cera', 
      logo: '/cera.jpeg',
      alt: 'Cera Bathroom Solutions'
    },
    { 
      name: 'Greenlam', 
      logo: '/greenlam.jpg',
      alt: 'Greenlam Laminates'
    },
     { 
      name: 'Century', 
      logo: '/century.jpg',
      alt: 'Century Ply'
    },
     { 
      name: 'Merino', 
      logo: '/Merino.jpg',
      alt: 'Merino'
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Velan Constructions | Building Your Dreams</title>
        <meta name="description" content="Premium residential, commercial, and civil construction services in Hosur, Krishnagiri" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="min-h-screen relative overflow-hidden flex items-center"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image 
            src="/hero.jpg" 
            alt="Luxury interior design" 
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 flex items-center">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-4 mb-6">
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-4">
              Building Exceptional Structures with
              <span className="block font-light text-orange-400 mt-2">Precision & Quality</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-orange-100 mb-8 max-w-2xl leading-relaxed">
              Constructing premium residential homes, state-of-the-art commercial buildings, and timeless architectural spaces. Velan Constructions is your trusted partner for excellence in civil construction.
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center text-white/60">
            <span className="text-sm mb-2">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="h-[1px] w-12 bg-orange-400"></div>
              <span className="text-orange-500 text-sm font-light uppercase tracking-[0.2em]">
                Our Services
              </span>
              <div className="h-[1px] w-12 bg-orange-400"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 mb-4">Construction Services Tailored to You</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We offer a comprehensive range of construction and contracting services to turn your vision into robust, modern realities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center"
              >
                <div className="text-5xl mb-6">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto mb-20 text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="h-[1px] w-12 bg-orange-400"></div>
              <span className="text-orange-500 text-sm font-light uppercase tracking-[0.2em]">
                Our Portfolio
              </span>
              <div className="h-[1px] w-12 bg-orange-400"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Explore our portfolio of exceptional construction projects that showcase our commitment to engineering excellence and quality craftsmanship.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {showcaseProducts.map((product, index) => (
              <div 
                key={product.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-72 overflow-hidden">
                  <Image 
                    src={product.image} 
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="p-6 w-full text-center">
                      <button className="w-full bg-white text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors mb-3">
                        View Project
                      </button>
                    </div>
                  </div>
                  
                  <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide">
                    {product.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 capitalize">
                      {product.category} Construction
                    </span>
                    <button className="text-gray-400 hover:text-orange-500 text-xl transition-colors">
                      ♡
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link href="/portfolio">
              <button className="bg-orange-500 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors">
                View Complete Portfolio
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto mb-20 text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="h-[1px] w-12 bg-orange-400"></div>
              <span className="text-orange-500 text-sm font-light uppercase tracking-[0.2em]">
                Client Testimonials
              </span>
              <div className="h-[1px] w-12 bg-orange-400"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Don&apos;t just take our word for it - hear from our satisfied clients about their experience working with us.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gray-50 rounded-2xl p-8 md:p-12 shadow-lg">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-orange-400 text-2xl mx-1">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-base sm:text-lg text-gray-700 italic mb-6 leading-relaxed">
                  &quot;{memoizedTestimonials[activeTestimonial].content}&quot;
                </p>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{memoizedTestimonials[activeTestimonial].name}</h4>
                  <p className="text-gray-600">{memoizedTestimonials[activeTestimonial].role}</p>
                </div>
              </div>
              
              <div className="flex justify-center mt-8 space-x-2">
                {memoizedTestimonials.map((_: Testimonial, index: number) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      activeTestimonial === index ? 'bg-orange-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Brands Section */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto mb-16 text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="h-[1px] w-12 bg-orange-400"></div>
              <span className="text-orange-500 text-sm font-light uppercase tracking-[0.2em]">
                Trusted Brands
              </span>
              <div className="h-[1px] w-12 bg-orange-400"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 mb-4">We Use Only Premium Grade Materials & Fittings</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Our commitment to structural longevity is backed by partnerships with top-tier building material brands.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">
            {trustedBrands.map((brand, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center"
              >
                <div className="relative h-16 w-full mb-3">
                  <Image 
                    src={brand.logo} 
                    alt={brand.alt}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-lg font-medium text-gray-900">{brand.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto mb-20 text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="h-[1px] w-12 bg-orange-400"></div>
              <span className="text-orange-500 text-sm font-light uppercase tracking-[0.2em]">
                Our Process
              </span>
              <div className="h-[1px] w-12 bg-orange-400"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 mb-4">Our Construction Process</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              From blueprint planning to final key handover, we follow a rigorous and transparent construction process.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Consultation & Site Visit',
                desc: 'We conduct feasibility studies, understand your requirements, and perform a thorough site evaluation.',
                number: '01'
              },
              {
                title: 'Architectural Blueprinting',
                desc: 'Our design and engineering team creates comprehensive structural drafts and 3D renderings.',
                number: '02'
              },
              {
                title: 'Execution & Quality Checks',
                desc: 'We execute civil works with rigorous adherence to IS codes, structural engineering standards, and safety.',
                number: '03'
              },
              {
                title: 'Finishing & Handover',
                desc: 'We perform meticulous finishing, plumbing, wiring, and premium plastering before key handover.',
                number: '04'
              }
            ].map((step, index) => (
              <div
                key={index}
                className="relative p-6 bg-white rounded-2xl shadow-md"
              >
                <div className="text-5xl font-bold text-orange-100 mb-4">{step.number}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                <Image 
                  src="/kitchen.png" 
                  alt="Our design studio" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="h-[1px] w-12 bg-orange-400"></div>
                <span className="text-orange-500 text-sm font-light uppercase tracking-[0.2em]">
                  About Us
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 mb-4">Building Structures That Last</h2>
              <p className="text-base text-gray-600 mb-4 leading-relaxed">
                Velan Constructions is a premier contracting and civil construction firm in Hosur, Krishnagiri, dedicated to building safe, beautiful, and durable structures tailored to our clients' needs.
              </p>
              <p className="text-base text-gray-600 mb-6 leading-relaxed">
                With years of engineering expertise, we have established a reputation for structural integrity, meticulous craftsmanship, and transparent pricing.
              </p>
              <Link href="/about">
                <button className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                  Learn More About Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-24 bg-gradient-to-r from-orange-500 to-amber-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]" />
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div>
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="h-[1px] w-12 bg-white"></div>
              <span className="text-white text-sm font-light uppercase tracking-[0.2em]">
                Let&apos;s Connect
              </span>
              <div className="h-[1px] w-12 bg-white"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-4">
              Ready to Build Your Dream Project?
            </h2>
            <p className="text-base sm:text-lg text-orange-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Get a free structural consultation and estimate with our construction experts. Let's build your future together.
            </p>
            
            <div className="max-w-md mx-auto">
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 min-w-[280px] relative">
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
                    required
                  />
                  {errorMessage && (
                    <div className="absolute top-full left-0 right-0 mt-2 px-4 py-2 bg-red-500/20 border border-red-500/50 rounded text-red-200 text-sm">
                      {errorMessage}
                    </div>
                  )}
                  {subscribeStatus === 'success' && (
                    <div className="absolute top-full left-0 right-0 mt-2 px-4 py-2 bg-green-500/20 border border-green-500/50 rounded text-green-200 text-sm">
                      ✓ Successfully subscribed!
                    </div>
                  )}
                </div>
                <button 
                  type="submit"
                  disabled={subscribeStatus === 'loading'}
                  className={`px-8 py-4 rounded-lg font-bold transition-all whitespace-nowrap ${
                    subscribeStatus === 'loading'
                      ? 'bg-orange-100 text-orange-400 cursor-wait'
                      : 'bg-white text-orange-600 hover:bg-orange-50'
                  }`}
                >
                  {subscribeStatus === 'loading' ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Subscribing...
                    </span>
                  ) : 'Get Started'}
                </button>
              </form>
            </div>
            
            <p className="text-orange-100 mt-6 text-sm">
              Schedule your free construction site visit and estimate
            </p>
          </div>
        </div>
      </section>
      
      <Popup show={showPopup} onClose={handleClosePopup} />
    </div>
  );
};

export default HomePage;