"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

type PlanType = {
  id: string;
  name: string;
  pdfName: string;
  rates: {
    solid: number;
    red: number;
  };
  pages: number;
  description: string;
  features: {
    steel: string;
    cement: string;
    bricks: {
      solid: string;
      red: string;
    };
    flooring: string;
    bathroom: string;
    electrical: string;
    painting: string;
    additional: string;
  };
};

const BrochurePage = () => {
  const [activePlan, setActivePlan] = useState<string>('basic');
  const [brickType, setBrickType] = useState<'solid' | 'red'>('solid');
  const [builtArea, setBuiltArea] = useState<number>(1800);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const plans: Record<string, PlanType> = {
    basic: {
      id: 'basic',
      name: 'Basic Plan',
      pdfName: 'basic-plan.pdf',
      rates: {
        solid: 2000,
        red: 2100
      },
      pages: 5,
      description: 'Solid quality civil structure and essential finishes, ideal for budgeting or standard villa construction.',
      features: {
        steel: 'Fe-500 TMT (Indus / Kamdhenu / equivalent)',
        cement: 'Standard OPC/PPC (Dalmia, Ramco, Birla)',
        bricks: {
          solid: 'Solid concrete blocks / standard fly-ash bricks',
          red: 'Standard quality red clay bricks'
        },
        flooring: 'Vitrified tiles (₹50-60 per sq ft range)',
        bathroom: 'Cera / Parryware fittings & sanitaryware',
        electrical: 'Finolex / Anchor standard wiring & conduits',
        painting: 'Asian Paints Tractor Emulsion (internal), Ace (external)',
        additional: 'Standard boundary walls, MS safety grills, basic utility cabling'
      }
    },
    standard: {
      id: 'standard',
      name: 'Standard Plan',
      pdfName: 'standard-plan.pdf',
      rates: {
        solid: 2200,
        red: 2300
      },
      pages: 6,
      description: 'Premium construction grade materials, high-durability finishes, and stylish bathroom layouts.',
      features: {
        steel: 'Fe-550 TMT (JSW Neo / Tata Tiscon / primary brands)',
        cement: 'Premium Grade OPC/PPC (UltraTech, Ramco, Dalmia)',
        bricks: {
          solid: 'Premium solid concrete blocks / high-strength block masonry',
          red: 'High-strength red clay bricks'
        },
        flooring: 'Premium Vitrified tiles (₹80-90 per sq ft range) & Granite steps',
        bathroom: 'Jaquar Continental / Hindware premium fittings',
        electrical: 'Havells / Finolex Fire-Resistant (FR) wiring & modular switches',
        painting: 'Asian Paints Premium Emulsion (internal), Apex protective (external)',
        additional: 'Stainless steel balcony railings, teakwood main door frame, UPS wiring'
      }
    },
    premium: {
      id: 'premium',
      name: 'Premium Plan',
      pdfName: 'premium-plan.pdf',
      rates: {
        solid: 2400,
        red: 2500
      },
      pages: 6,
      description: 'Elite civil craftsmanship, luxury Italian marble/granite options, false ceilings, and smart utilities.',
      features: {
        steel: 'Primary TATA Tiscon / JSW Neo Fe-550 TMT Steel',
        cement: 'Super Premium OPC/PPC (UltraTech Super, ACC Gold)',
        bricks: {
          solid: 'Elite high-density solid concrete blocks',
          red: 'Grade-A first-class table-molded red clay bricks'
        },
        flooring: 'Italian Marble, premium Indian Granite, or elite tiles (₹120-150/sq ft)',
        bathroom: 'Premium Jaquar / Kohler fittings, wall-mounted closets & geyser points',
        electrical: 'Havells / Finolex FRLS (Fire Retardant Low Smoke) wires & smart automation ready',
        painting: 'Asian Paints Royale luxury sheen (internal), Apex Ultima weatherproof (external)',
        additional: 'Modular kitchen carcass, false ceiling in living & master bedrooms, smart door lock'
      }
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const activePlanData = plans[activePlan];

  // Cost calculator helpers
  const calculatedCost = builtArea * activePlanData.rates[brickType];
  const costBreakdown = [
    { name: 'Foundation & RCC Structure', percentage: 40, color: 'bg-orange-500' },
    { name: 'Brickwork & Plastering', percentage: 20, color: 'bg-amber-500' },
    { name: 'Flooring, Dadoing & Granite', percentage: 15, color: 'bg-yellow-500' },
    { name: 'Doors, Windows & Woodwork', percentage: 10, color: 'bg-emerald-500' },
    { name: 'Plumbing & Electrical Lines', percentage: 10, color: 'bg-blue-500' },
    { name: 'Painting, Fixtures & Handover', percentage: 5, color: 'bg-purple-500' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess('');
    setSubmitError('');

    const { name, email, phone, message } = formData;
    if (!name || !email) {
      setSubmitError('Name and email are required');
      setIsSubmitting(false);
      return;
    }

    const lower = email.toLowerCase();
    if (!(lower.endsWith('@gmail.com') || lower.endsWith('@yahoo.com'))) {
      setSubmitError('Email must end with @gmail.com or @yahoo.com');
      setIsSubmitting(false);
      return;
    }

    if (phone) {
      const digits = phone.replace(/\D/g, '');
      if (!/^\d{10}$/.test(digits)) {
        setSubmitError('Phone number must be 10 digits');
        setIsSubmitting(false);
        return;
      }
    }

    try {
      const res = await fetch('/api/popup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email: lower,
          phone,
          projectType: `${activePlanData.name} Estimation Request`,
          message: `Requested brochure download & estimation for ${builtArea} sq. ft. Message: ${message}`
        })
      });

      if (!res.ok) {
        throw new Error('Failed to submit request');
      }

      setSubmitSuccess('Thank you! Your estimation request has been submitted. A specialist will call you shortly.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      console.error(err);
      setSubmitError('Failed to submit quote request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white text-gray-900 font-sans min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-6xl mx-auto px-6 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4 bg-white/80 backdrop-blur-sm rounded-full px-5 py-2 border border-orange-100"
          >
            <span className="text-orange-600 text-xs font-semibold uppercase tracking-widest">
              Velan Specifications & Plans
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Interactive Construction
            <span className="block mt-2 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent font-medium">
              Plan Brochures
            </span>
          </motion.h1>
          
          <motion.div 
            className="w-16 h-1 bg-orange-400 mx-auto mb-6 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
          
          <motion.p 
            className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Download detailed plans, inspect exact materials, and calculate tentative civil structural costs based on built-up area for your dream project.
          </motion.p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Plan Navigation Tabs */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
          {Object.values(plans).map((plan) => (
            <motion.button
              key={plan.id}
              onClick={() => setActivePlan(plan.id)}
              className={`px-8 py-4 rounded-2xl font-medium w-full sm:w-64 transition-all duration-300 flex flex-col items-center ${
                activePlan === plan.id
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200/60'
              }`}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-lg font-semibold">{plan.name}</span>
              <span className={`text-xs opacity-80 mt-0.5 ${activePlan === plan.id ? 'text-white' : 'text-gray-500'}`}>
                ₹{plan.rates[brickType]}/sq ft • {plan.pages} Pages
              </span>
            </motion.button>
          ))}
        </div>

        {/* Brick Type Selector Toggle */}
        <div className="flex flex-col items-center mb-12">
          <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">Select Masonry Brick Type</span>
          <div className="bg-gray-50 border border-gray-200/60 p-1.5 rounded-2xl flex items-center gap-1 shadow-sm relative">
            <motion.button
              onClick={() => setBrickType('solid')}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 relative z-10 ${
                brickType === 'solid'
                  ? 'bg-white text-gray-900 shadow-md border border-gray-100/40'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-base">🧱</span> Solid Concrete Blocks
            </motion.button>
            <motion.button
              onClick={() => setBrickType('red')}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 relative z-10 ${
                brickType === 'red'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-base">🧱</span> Red Clay Bricks
            </motion.button>
          </div>
        </div>

        {/* Dynamic Panel */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Highlights & Cost Calculator Panel */}
          <div className="lg:col-span-1 space-y-8">
            {/* Short Plan Info */}
            <motion.div 
              className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-8 border border-orange-100/60 shadow-sm"
              key={`desc-${activePlan}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">{activePlanData.name} Overview</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 font-light">{activePlanData.description}</p>
              
              {/* Highlight list */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100/60 flex items-center justify-center text-orange-600 text-sm">🧱</div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Base Rate ({brickType === 'solid' ? 'Solid Bricks' : 'Red Bricks'})</p>
                    <p className="text-sm font-semibold text-gray-800">₹{activePlanData.rates[brickType]} / sq ft</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100/60 flex items-center justify-center text-orange-600 text-sm">🛠️</div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Primary Steel</p>
                    <p className="text-sm font-semibold text-gray-800 line-clamp-1">{activePlanData.features.steel}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100/60 flex items-center justify-center text-orange-600 text-sm">🏗️</div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Cement Mixes</p>
                    <p className="text-sm font-semibold text-gray-800 line-clamp-1">{activePlanData.features.cement}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Cost Calculator */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Cost Calculator</h3>
              <p className="text-xs text-gray-500 mb-6 font-light">Drag the slider to input your built-up area and calculate estimates.</p>
              
              {/* Calculator Logic */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">Built-Up Area</span>
                    <span className="text-lg font-bold text-orange-600">{builtArea} sq. ft.</span>
                  </div>
                  <input 
                    type="range" 
                    min="1000" 
                    max="5000" 
                    step="50" 
                    value={builtArea} 
                    onChange={(e) => setBuiltArea(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500" 
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span>1,000 sq ft</span>
                    <span>5,000 sq ft</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Estimated Project Cost</span>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-orange-600">
                      ₹{((calculatedCost) / 100000).toFixed(2)} Lakhs
                    </span>
                    <p className="text-[10px] text-gray-400">excluding taxes & sanctions</p>
                  </div>
                </div>

                {/* Progress breakdown */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Estimate Breakdown</span>
                  {costBreakdown.map((item, idx) => {
                    const allocatedCost = (calculatedCost * (item.percentage / 100)) / 100000;
                    return (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>{item.name} ({item.percentage}%)</span>
                          <span className="font-semibold text-gray-800">₹{allocatedCost.toFixed(2)} L</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`${item.color} h-1.5 rounded-full transition-all duration-700 ease-out`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive PDF Viewer Panel */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div 
              className="bg-white rounded-3xl border border-gray-200/80 shadow-2xl overflow-hidden"
              key={`viewer-${activePlan}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Custom Toolbar */}
              <div className="bg-gray-900 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-white font-medium text-sm sm:text-base">
                    Interactive PDF: {activePlanData.name} ({activePlanData.pages} Pages)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <a 
                    href={`/${activePlanData.pdfName}`} 
                    download
                    className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                    Download Brochure
                  </a>
                  <a 
                    href={`/${activePlanData.pdfName}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-lg text-xs font-medium border border-gray-700 transition-colors"
                    title="Open in new window"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                  </a>
                  <button 
                    onClick={() => window.print()}
                    className="bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-lg text-xs font-medium border border-gray-700 transition-colors hidden sm:block"
                    title="Print Brochure"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Iframe View */}
              <div className="relative bg-gray-50 flex items-center justify-center">
                {isMobile ? (
                  <div className="px-6 py-16 text-center max-w-sm">
                    <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4 text-3xl">📱</div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Mobile View Optimization</h4>
                    <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                      Detailed structural plans read best on PDF readers. For a seamless reading experience, download or open the PDF directly.
                    </p>
                    <div className="flex flex-col gap-3">
                      <a 
                        href={`/${activePlanData.pdfName}`} 
                        download
                        className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium px-6 py-3 rounded-xl shadow-md text-sm"
                      >
                        Download PDF Brochure
                      </a>
                      <a 
                        href={`/${activePlanData.pdfName}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-3 rounded-xl text-sm"
                      >
                        Open In New Tab
                      </a>
                    </div>
                  </div>
                ) : (
                  <iframe 
                    src={`/${activePlanData.pdfName}#toolbar=0&navpanes=0&scrollbar=1`} 
                    className="w-full h-[650px] border-none"
                    title={`PDF brochure viewer for ${activePlanData.name}`}
                  />
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Detailed Spec Comparison Table */}
        <div className="py-20 mt-8 border-t border-gray-100">
          <div className="text-center mb-12">
            <span className="text-orange-600 text-xs font-semibold uppercase tracking-widest">In-depth Specs</span>
            <h2 className="text-2xl sm:text-3xl font-light text-gray-900 mt-2 mb-4">Material Specification Comparison</h2>
            <div className="w-16 h-px bg-orange-400 mx-auto"></div>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-gray-100 shadow-xl bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-700 text-xs uppercase tracking-wider border-b border-gray-100">
                  <th className="py-5 px-6 font-semibold min-w-[150px]">Material Type</th>
                  <th className="py-5 px-6 font-semibold min-w-[200px]">Basic Plan (₹{plans.basic.rates[brickType]}/sq ft)</th>
                  <th className="py-5 px-6 font-semibold min-w-[200px]">Standard Plan (₹{plans.standard.rates[brickType]}/sq ft)</th>
                  <th className="py-5 px-6 font-semibold min-w-[200px]">Premium Plan (₹{plans.premium.rates[brickType]}/sq ft)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-600 font-light">
                <tr className="hover:bg-orange-50/20 transition-colors">
                  <td className="py-5 px-6 font-semibold text-gray-800">TMT Steel Bars</td>
                  <td className="py-5 px-6">{plans.basic.features.steel}</td>
                  <td className="py-5 px-6 font-medium text-gray-700">{plans.standard.features.steel}</td>
                  <td className="py-5 px-6 font-medium text-orange-600">{plans.premium.features.steel}</td>
                </tr>
                <tr className="hover:bg-orange-50/20 transition-colors">
                  <td className="py-5 px-6 font-semibold text-gray-800">Cement Brands</td>
                  <td className="py-5 px-6">{plans.basic.features.cement}</td>
                  <td className="py-5 px-6">{plans.standard.features.cement}</td>
                  <td className="py-5 px-6 font-semibold text-orange-600">{plans.premium.features.cement}</td>
                </tr>
                <tr className="hover:bg-orange-50/20 transition-colors">
                  <td className="py-5 px-6 font-semibold text-gray-800">Masonry Bricks</td>
                  <td className="py-5 px-6">{plans.basic.features.bricks[brickType]}</td>
                  <td className="py-5 px-6">{plans.standard.features.bricks[brickType]}</td>
                  <td className="py-5 px-6">{plans.premium.features.bricks[brickType]}</td>
                </tr>
                <tr className="hover:bg-orange-50/20 transition-colors">
                  <td className="py-5 px-6 font-semibold text-gray-800">Room Flooring</td>
                  <td className="py-5 px-6">{plans.basic.features.flooring}</td>
                  <td className="py-5 px-6">{plans.standard.features.flooring}</td>
                  <td className="py-5 px-6 font-medium text-gray-800">{plans.premium.features.flooring}</td>
                </tr>
                <tr className="hover:bg-orange-50/20 transition-colors">
                  <td className="py-5 px-6 font-semibold text-gray-800">Sanitary & CP</td>
                  <td className="py-5 px-6">{plans.basic.features.bathroom}</td>
                  <td className="py-5 px-6">{plans.standard.features.bathroom}</td>
                  <td className="py-5 px-6 font-medium text-gray-800">{plans.premium.features.bathroom}</td>
                </tr>
                <tr className="hover:bg-orange-50/20 transition-colors">
                  <td className="py-5 px-6 font-semibold text-gray-800">Electrical System</td>
                  <td className="py-5 px-6">{plans.basic.features.electrical}</td>
                  <td className="py-5 px-6">{plans.standard.features.electrical}</td>
                  <td className="py-5 px-6 font-medium text-gray-800">{plans.premium.features.electrical}</td>
                </tr>
                <tr className="hover:bg-orange-50/20 transition-colors">
                  <td className="py-5 px-6 font-semibold text-gray-800">Paint Finish</td>
                  <td className="py-5 px-6">{plans.basic.features.painting}</td>
                  <td className="py-5 px-6">{plans.standard.features.painting}</td>
                  <td className="py-5 px-6 font-medium text-gray-800">{plans.premium.features.painting}</td>
                </tr>
                <tr className="hover:bg-orange-50/20 transition-colors">
                  <td className="py-5 px-6 font-semibold text-gray-800">Additional Features</td>
                  <td className="py-5 px-6 text-xs">{plans.basic.features.additional}</td>
                  <td className="py-5 px-6 text-xs">{plans.standard.features.additional}</td>
                  <td className="py-5 px-6 text-xs font-medium text-gray-800">{plans.premium.features.additional}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Lead Quote Form Section */}
        <div className="py-20 mt-8 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-orange-50/50 to-amber-50/50 border border-orange-100 rounded-3xl p-8 sm:p-12 shadow-md relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-amber-500"></div>
            
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-light text-gray-900 mb-2">Request Detailed BOQ & Custom Estimate</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-md mx-auto">
                Need details customized for your site? Tell us your specifications, and our engineering team will provide a tailored quote.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {submitError && (
                <div className="px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                  {submitError}
                </div>
              )}
              {submitSuccess && (
                <div className="px-4 py-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
                  {submitSuccess}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="yourname@gmail.com"
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="10-digit mobile number"
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">Additional Project Specifications / Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Details about your site location, floor count, or plan requirements..."
                  rows={4}
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 text-white font-medium rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                    isSubmitting ? 'bg-orange-300 cursor-wait' : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:shadow-xl'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting specifications...
                    </span>
                  ) : 'SUBMIT SPECIFICATION REQUEST'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BrochurePage;
