'use client';

import { useState, useEffect } from 'react';
import { Monitor, Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [quoteFormData, setQuoteFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    // Intersection Observer for active section tracking
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    setIsMenuOpen(false);
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'cdc6daf0-c83c-4343-b1df-dde9334ff6bb', // Replace with your actual access key
          name: quoteFormData.name,
          email: quoteFormData.email,
          company: quoteFormData.company,
          service: quoteFormData.service,
          message: quoteFormData.message,
          subject: 'New Quote Request from L&SD Website'
        })
      });

      if (response.ok) {
        toast({
          title: 'Quote request sent successfully!',
          description: 'We will get back to you with a personalized quote soon.',
        });
        setQuoteFormData({ name: '', email: '', company: '', service: '', message: '' });
        setIsQuoteModalOpen(false);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      toast({
        title: 'Error sending quote request',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'cdc6daf0-c83c-4343-b1df-dde9334ff6bb', // Replace with your actual access key
          name: contactFormData.name,
          email: contactFormData.email,
          message: contactFormData.message,
          subject: 'New Contact Form Submission from L&SD Website'
        })
      });

      if (response.ok) {
        toast({
          title: 'Message sent successfully!',
          description: 'We will get back to you soon.',
        });
        setContactFormData({ name: '', email: '', message: '' });
        setIsContactModalOpen(false);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      toast({
        title: 'Error sending message',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'solution', label: 'Solution' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'about', label: 'About' },
  ];

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
<div className="flex items-center space-x-2">
  <svg
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={54}
    viewBox="0 0 295 370"
    preserveAspectRatio="xMidYMid meet"
    className="text-gray-900 dark:text-white"
  >
    <g transform="translate(0.000000,388.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M16 3846 c-15 -31 -16 -170 -16 -1510 l0 -1476 1500 0 1500 0 0 1481
c0 1381 -1 1483 -17 1510 l-17 29 -1467 0 -1467 0 -16 -34z m2944 -1476 l0
-1470 -1460 0 -1460 0 0 1470 0 1470 1460 0 1460 0 0 -1470z"/>
<path d="M1643 3770 c-114 -24 -171 -70 -256 -207 -30 -48 -107 -170 -170
-271 -64 -100 -119 -187 -122 -192 -3 -6 2 -13 12 -17 10 -4 41 -22 70 -40 54
-34 73 -40 73 -23 0 6 11 22 25 35 22 23 32 25 108 25 91 0 191 -26 287 -75
l49 -25 -59 -93 -60 -92 23 -17 c12 -10 25 -18 29 -18 4 0 31 40 60 90 29 49
59 90 65 90 20 0 167 -151 197 -203 15 -26 34 -68 42 -94 13 -42 12 -48 -3
-65 -19 -22 -22 -19 64 -72 l69 -42 31 50 c16 28 90 146 163 261 163 258 169
271 170 358 1 236 -247 497 -575 606 -99 32 -222 46 -292 31z m267 -67 c220
-63 440 -237 524 -413 38 -80 47 -184 22 -244 -26 -62 -317 -516 -330 -516 -8
0 -25 9 -38 20 -19 15 -27 31 -30 69 -3 27 -17 74 -32 104 -44 91 -200 247
-246 247 -10 0 -35 17 -56 38 -26 26 -67 50 -124 73 -79 31 -93 34 -202 34
-107 0 -118 -2 -140 -22 -29 -28 -45 -28 -78 -4 -22 17 -23 22 -12 46 19 41
301 487 326 513 30 34 107 71 168 80 72 12 147 4 248 -25z"/>
<path d="M1668 3640 c-47 -9 -85 -34 -94 -62 -10 -33 24 -54 108 -68 191 -32
414 -161 531 -307 28 -36 66 -82 84 -102 l31 -36 27 25 c24 22 26 30 22 72
-28 238 -455 526 -709 478z m236 -71 c129 -47 240 -121 333 -223 61 -67 95
-132 101 -197 6 -60 -7 -62 -32 -7 -27 58 -164 198 -247 253 -140 92 -288 151
-398 159 -73 5 -81 10 -49 27 63 35 175 30 292 -12z"/>
<path d="M1530 3424 c-84 -28 -138 -80 -175 -168 -15 -35 -14 -37 8 -60 17
-17 39 -24 85 -29 90 -10 213 -53 305 -109 149 -89 193 -130 310 -288 18 -25
42 -46 54 -48 44 -6 123 126 123 205 0 141 -186 345 -402 441 -105 48 -252 74
-308 56z m169 -50 c196 -49 407 -204 476 -351 44 -92 43 -117 -7 -200 -24 -40
-45 -73 -48 -73 -3 0 -18 23 -34 51 -112 201 -451 409 -664 409 -29 0 -52 4
-50 8 2 4 23 38 47 75 66 98 133 117 280 81z"/>
<path d="M985 2902 c-20 -37 -100 -174 -177 -305 -77 -131 -139 -239 -137
-241 14 -11 630 -366 640 -368 7 -2 14 4 16 12 2 10 -49 44 -162 109 -161 90
-166 94 -152 115 8 11 60 102 117 201 56 98 127 219 157 268 30 48 53 89 52
91 -2 1 -51 29 -109 61 -58 32 -128 73 -157 91 l-52 33 -36 -67z m176 -64 c60
-35 110 -68 113 -73 2 -6 -14 -40 -35 -75 -22 -36 -89 -152 -150 -257 -66
-116 -116 -193 -126 -193 -20 0 -224 120 -229 135 -3 7 15 46 39 86 93 156
176 297 216 367 23 39 47 72 53 72 6 0 60 -28 119 -62z"/>
<path d="M1416 2695 c-5 -15 18 -45 35 -45 24 0 5 -33 -27 -46 -40 -17 -39
-30 1 -20 54 14 86 81 53 114 -17 17 -55 15 -62 -3z"/>
<path d="M1574 2511 c-55 -25 -105 -79 -147 -159 -69 -130 -70 -194 -4 -268
33 -38 70 -57 132 -68 90 -15 113 -37 100 -94 -11 -52 -99 -121 -173 -137 -27
-6 -44 0 -100 33 -114 67 -358 182 -387 182 -3 0 -5 -22 -5 -49 0 -49 0 -49
91 -135 113 -106 187 -146 270 -146 50 0 72 7 152 48 166 85 254 170 317 304
l31 67 -25 39 c-14 22 -30 43 -35 47 -6 3 -48 12 -93 19 -122 20 -154 36 -167
83 -23 81 -13 103 45 103 57 0 102 -19 152 -64 39 -35 40 -36 46 -14 18 68 -3
150 -51 201 -32 33 -87 36 -149 8z m127 -50 c17 -17 29 -40 29 -55 0 -31 -6
-32 -51 -9 -18 9 -57 19 -86 21 -29 3 -53 8 -53 12 0 13 37 41 66 50 49 14 64
11 95 -19z m-190 -229 c21 -34 74 -58 170 -76 82 -16 119 -37 119 -70 0 -21
-57 -131 -78 -149 -20 -19 -21 -19 -27 16 -10 51 -50 84 -122 100 -34 8 -74
23 -91 32 -67 40 -80 121 -36 215 l27 55 11 -50 c7 -27 19 -60 27 -73z m-343
-347 c131 -62 262 -137 262 -152 0 -17 -61 -27 -114 -19 -56 9 -123 52 -208
134 -103 99 -90 106 60 37z"/>
<path d="M560 2153 c1 -59 -51 -1072 -58 -1143 -5 -47 -8 -87 -6 -88 1 -2 26
9 56 25 29 17 85 47 123 68 39 21 133 72 210 115 77 42 226 123 330 180 105
57 213 117 240 132 28 16 74 40 103 54 62 30 62 29 -40 90 l-72 43 -96 -51
c-52 -28 -158 -86 -235 -128 -77 -42 -167 -91 -200 -109 l-60 -32 -25 31 c-16
20 -46 38 -80 50 l-55 19 2 48 c2 26 7 138 13 248 5 110 12 236 16 281 l6 81
-54 31 c-29 17 -68 41 -85 52 -31 21 -33 21 -33 3z m85 -83 c18 -11 35 -26 38
-33 2 -6 -2 -118 -9 -247 -19 -348 -19 -382 9 -408 12 -11 34 -23 48 -27 14
-4 47 -24 73 -46 48 -39 48 -39 84 -23 20 8 153 78 294 155 l257 140 41 -21
c22 -11 40 -24 40 -29 0 -14 -961 -534 -970 -525 -4 5 -4 77 0 159 5 83 16
296 24 475 17 351 25 450 33 450 3 0 20 -9 38 -20z"/>
<path d="M2855 1168 c-27 -5 -243 -12 -480 -17 -314 -6 -452 -13 -510 -24
-133 -25 -195 -58 -161 -86 17 -14 120 -37 231 -51 173 -22 117 -30 -210 -31
-176 0 -363 -2 -415 -4 -52 -2 -187 -7 -300 -10 -238 -7 -393 -16 -400 -23 -3
-2 83 -2 190 2 107 3 420 8 695 11 542 6 605 9 605 30 0 16 -39 32 -120 45
-166 29 -195 41 -122 54 20 3 183 15 360 26 178 11 372 27 430 34 231 31 282
39 282 48 0 9 -5 9 -75 -4z"/>
<path d="M1058 800 c-68 -12 -129 -49 -152 -91 -32 -58 -15 -92 144 -293 l141
-177 142 3 c151 3 170 11 115 46 -40 25 -328 402 -328 429 0 12 9 27 20 33 12
6 20 21 20 35 0 28 -13 30 -102 15z m24 -72 c-5 -38 10 -62 162 -258 74 -96
132 -178 130 -182 -6 -10 -135 -11 -159 -2 -14 6 -206 238 -258 314 -23 33
-22 92 2 114 23 21 89 46 111 43 10 -2 14 -11 12 -29z"/>
<path d="M1751 799 c-71 -12 -150 -55 -179 -99 -34 -50 -28 -128 14 -171 38
-40 67 -55 202 -100 128 -43 142 -51 142 -85 0 -29 -24 -53 -60 -61 -20 -3
-29 -13 -33 -30 -5 -25 -4 -25 51 -19 118 14 223 85 238 161 18 96 -56 167
-223 213 -97 28 -140 47 -153 71 -15 28 3 59 41 73 21 7 29 16 29 34 0 13 -3
23 -7 23 -5 -1 -32 -5 -62 -10z m-41 -95 c0 -54 46 -93 146 -124 161 -49 218
-85 229 -145 7 -38 -22 -88 -67 -115 -43 -26 -56 -25 -51 4 7 34 -22 83 -59
102 -18 9 -77 31 -131 49 -54 18 -113 44 -132 57 -79 53 -69 147 20 196 35 20
45 14 45 -24z"/>
<path d="M1870 787 c0 -19 8 -26 40 -36 50 -15 97 -54 118 -100 13 -27 23 -36
42 -36 25 0 25 1 28 91 2 78 0 93 -14 98 -10 4 -25 -1 -35 -10 -17 -15 -26
-15 -81 -4 -35 6 -71 14 -80 17 -14 3 -18 -2 -18 -20z m190 -68 c0 -24 -23
-21 -28 4 -2 10 3 17 12 17 10 0 16 -9 16 -21z"/>
<path d="M96 787 c-15 -11 -15 -15 -4 -24 7 -6 22 -13 33 -15 19 -3 20 -12 23
-226 l2 -223 -36 -15 c-29 -12 -34 -17 -24 -29 10 -12 44 -15 164 -15 l151 0
0 252 0 252 33 8 c36 10 41 23 13 38 -30 15 -333 13 -355 -3z m266 -259 c-1
-123 -5 -229 -7 -236 -3 -9 -27 -12 -87 -10 l-83 3 -3 233 -3 232 93 0 93 0
-3 -222z"/>
<path d="M1200 777 c0 -17 7 -28 21 -32 11 -4 25 -18 32 -32 10 -22 8 -28 -15
-48 -23 -20 -25 -25 -13 -41 32 -44 110 45 89 103 -10 30 -47 59 -86 69 -25 5
-28 3 -28 -19z"/>
<path d="M2218 793 c-28 -7 -21 -30 12 -42 l30 -10 0 -225 0 -224 -31 -7 c-21
-5 -29 -12 -27 -23 3 -15 23 -17 161 -20 l157 -3 0 281 0 280 -142 -1 c-79 -1
-151 -3 -160 -6z m257 -278 l0 -230 -87 -3 -88 -3 0 236 0 236 88 -3 87 -3 0
-230z"/>
<path d="M2570 776 c0 -17 7 -26 25 -30 15 -4 30 -18 35 -32 6 -14 10 -103 10
-197 0 -184 -8 -219 -48 -225 -16 -3 -22 -10 -22 -29 0 -25 1 -25 51 -19 127
17 241 92 275 182 37 96 -7 235 -94 301 -43 33 -108 56 -189 67 -40 6 -43 5
-43 -18z m165 -56 c138 -67 178 -246 78 -346 -34 -34 -103 -73 -130 -74 -10 0
-13 51 -13 220 0 163 3 220 12 220 6 0 30 -9 53 -20z"/>
<path d="M1353 590 c-27 -11 -28 -14 -7 -45 12 -18 13 -28 4 -45 -8 -15 -8
-25 3 -40 13 -19 15 -18 45 13 70 73 40 151 -45 117z"/>
<path d="M835 526 c-63 -30 -114 -83 -121 -127 -12 -73 89 -154 209 -166 49
-5 167 10 189 23 14 9 -16 44 -37 44 -28 0 -34 6 -104 95 -42 53 -61 85 -57
98 4 18 -12 58 -24 56 -3 0 -27 -11 -55 -23z m51 -78 c15 -24 49 -71 76 -105
l49 -62 -26 -7 c-34 -8 -129 11 -168 33 -16 10 -39 30 -50 45 -18 24 -18 30
-7 58 11 28 72 80 92 80 4 0 20 -19 34 -42z"/>
<path d="M1557 433 c-4 -3 -7 -48 -7 -100 0 -105 10 -119 61 -89 26 16 33 16
81 1 77 -22 98 -20 98 10 0 20 -5 25 -23 25 -38 0 -104 55 -132 110 -19 38
-31 50 -49 50 -12 0 -26 -3 -29 -7z m66 -98 c20 -28 15 -45 -14 -45 -15 0 -19
7 -19 35 0 41 8 44 33 10z"/>
<path d="M599 384 c-28 -54 -62 -83 -110 -93 -25 -5 -35 -13 -37 -29 -3 -22
-1 -22 113 -22 l116 0 -3 93 c-3 91 -3 92 -29 95 -22 3 -29 -4 -50 -44z m41
-62 c0 -21 -18 -42 -37 -42 -18 0 -16 20 4 42 21 23 33 23 33 0z"/>
<path d="M50 170 c-20 -20 -24 -41 -20 -90 3 -39 19 -60 45 -60 30 0 45 26 45
80 0 72 -34 106 -70 70z m40 -70 c0 -67 -15 -87 -24 -35 -8 41 2 107 15 99 5
-3 9 -32 9 -64z"/>
<path d="M960 180 c-33 -8 -37 -38 -11 -89 27 -51 27 -73 0 -41 l-20 25 3 -25
c2 -19 10 -26 30 -28 38 -5 46 32 19 86 -24 48 -28 77 -6 48 18 -23 24 -19 16
10 -5 16 -11 19 -31 14z"/>
<path d="M1230 170 c-14 -14 -20 -34 -20 -66 0 -58 14 -84 45 -84 30 0 45 26
45 80 0 72 -34 106 -70 70z m40 -70 c0 -67 -15 -87 -24 -35 -8 41 2 107 15 99
5 -3 9 -32 9 -64z"/>
<path d="M1340 170 c-14 -14 -20 -34 -20 -66 0 -58 14 -84 45 -84 30 0 45 26
45 80 0 72 -34 106 -70 70z m40 -70 c0 -32 -4 -61 -9 -64 -13 -8 -24 67 -16
104 10 48 25 25 25 -40z"/>
<path d="M2896 171 c-23 -25 -30 -89 -14 -121 11 -19 22 -25 51 -26 l37 -1 0
49 c0 45 -2 49 -22 46 -20 -3 -22 -8 -20 -45 2 -26 -1 -43 -7 -43 -15 0 -14
127 0 136 7 4 16 -1 21 -10 13 -23 27 -20 21 4 -3 11 -9 20 -13 20 -5 0 -15 2
-22 5 -8 3 -22 -3 -32 -14z"/>
<path d="M135 100 c0 -80 0 -80 26 -80 25 0 26 2 19 40 -7 37 -6 40 11 35 13
-4 19 -1 19 9 0 20 -17 30 -23 14 -3 -7 -6 2 -6 21 -1 29 1 32 14 21 12 -10
15 -10 15 4 0 12 -10 16 -37 16 l-38 0 0 -80z"/>
<path d="M225 100 c0 -75 1 -80 22 -80 19 0 21 4 16 40 -5 38 9 57 20 28 3 -7
6 0 6 16 1 24 -1 27 -14 16 -13 -11 -15 -8 -15 19 0 31 14 42 23 19 3 -8 6 -6
6 5 1 13 -7 17 -31 17 l-33 0 0 -80z"/>
<path d="M305 100 c0 -73 2 -80 20 -80 18 0 20 7 20 80 0 73 -2 80 -20 80 -18
0 -20 -7 -20 -80z"/>
<path d="M369 153 c-23 -61 11 -151 48 -127 20 13 29 34 14 34 -6 0 -11 -7
-11 -15 0 -8 -4 -15 -10 -15 -6 0 -10 30 -10 70 0 40 4 70 10 70 6 0 10 -7 10
-15 0 -8 5 -15 11 -15 6 0 8 7 5 16 -3 9 -6 18 -6 20 0 2 -11 4 -25 4 -19 0
-28 -8 -36 -27z"/>
<path d="M445 100 l0 -80 38 0 c32 0 37 3 37 23 -1 21 -1 22 -15 3 -14 -19
-15 -18 -15 17 0 28 3 35 15 31 10 -4 15 0 15 15 0 23 -15 29 -23 9 -3 -7 -6
2 -6 21 -1 29 1 32 14 21 12 -10 15 -10 15 4 0 12 -10 16 -37 16 l-38 0 0 -80z"/>
<path d="M593 127 c-1 -30 -7 -66 -12 -80 -9 -23 -8 -27 8 -27 15 0 18 5 14
21 -4 16 -2 20 8 17 8 -3 13 -13 13 -22 -1 -11 6 -16 22 -16 20 0 23 4 18 28
-3 15 -8 50 -12 77 -6 44 -10 50 -32 53 -24 3 -25 0 -27 -51z"/>
<path d="M685 100 c0 -53 4 -80 11 -80 8 0 10 17 8 47 l-4 48 21 -47 c12 -27
25 -48 30 -48 5 0 9 35 9 77 0 57 3 74 11 66 7 -7 10 -36 7 -77 l-4 -66 31 0
c43 0 65 27 65 79 0 69 -11 81 -80 81 l-59 0 11 -31 c15 -44 1 -49 -17 -6 -26
62 -40 47 -40 -43z m145 0 c0 -40 -4 -70 -10 -70 -6 0 -10 30 -10 70 0 40 4
70 10 70 6 0 10 -30 10 -70z"/>
<path d="M1020 154 c-28 -73 15 -164 57 -122 10 11 11 18 4 22 -6 4 -11 0 -11
-8 0 -9 -4 -16 -10 -16 -6 0 -10 30 -10 70 0 40 4 70 10 70 6 0 10 -7 10 -15
0 -8 4 -15 9 -15 5 0 7 9 4 20 -8 30 -51 27 -63 -6z"/>
<path d="M1095 100 l0 -80 50 0 50 0 0 80 0 80 -50 0 -50 0 0 -80z m55 40 c0
-16 -4 -30 -10 -30 -5 0 -10 14 -10 30 0 17 5 30 10 30 6 0 10 -13 10 -30z m0
-75 c0 -19 -4 -35 -10 -35 -5 0 -10 16 -10 35 0 19 5 35 10 35 6 0 10 -16 10
-35z"/>
<path d="M1425 100 l0 -80 38 0 c32 0 37 3 37 23 -1 22 -1 22 -16 2 -14 -18
-15 -14 -12 58 3 76 3 77 -22 77 -25 0 -25 -1 -25 -80z"/>
<path d="M1567 173 c-12 -12 -7 -43 13 -83 26 -50 25 -72 -1 -40 l-20 25 3
-25 c2 -19 10 -26 30 -28 38 -5 46 32 19 86 -24 47 -28 77 -7 50 18 -24 25
-23 19 2 -5 19 -42 28 -56 13z"/>
<path d="M1638 123 c4 -94 9 -105 40 -101 26 3 27 5 30 76 2 41 7 72 13 72 7
0 9 -28 7 -75 -3 -75 -3 -75 23 -75 23 0 25 3 21 30 -4 25 -1 30 16 30 26 0
35 14 34 53 -1 38 -15 47 -78 47 l-50 0 4 -61 c3 -37 0 -65 -7 -72 -8 -8 -11
8 -11 61 0 68 -1 72 -22 72 -22 0 -23 -4 -20 -57z m152 1 c0 -19 -4 -34 -10
-34 -5 0 -10 18 -10 41 0 24 4 38 10 34 6 -3 10 -22 10 -41z"/>
<path d="M1835 100 c0 -79 0 -80 26 -80 23 0 25 3 21 30 -4 25 -1 30 16 30 26
0 35 14 34 53 -1 36 -15 47 -62 47 l-35 0 0 -80z m65 24 c0 -19 -4 -34 -10
-34 -5 0 -10 18 -10 41 0 24 4 38 10 34 6 -3 10 -22 10 -41z"/>
<path d="M1945 100 l0 -80 38 0 c32 0 37 3 37 23 -1 22 -1 22 -16 2 -14 -18
-15 -14 -12 58 3 76 3 77 -22 77 -25 0 -25 -1 -25 -80z"/>
<path d="M2035 100 c0 -73 2 -80 20 -80 18 0 20 7 20 72 0 50 4 72 13 76 11 3
13 -12 10 -72 l-3 -76 31 0 c20 0 34 6 38 16 8 21 8 24 -4 24 -5 0 -10 -7 -10
-15 0 -8 -4 -15 -10 -15 -5 0 -10 16 -10 35 0 34 13 47 23 23 3 -7 5 1 5 17 0
17 -2 24 -5 18 -9 -24 -23 -13 -23 17 0 17 5 30 10 30 6 0 10 -4 10 -10 0 -5
4 -10 10 -10 5 0 7 7 4 15 -5 11 -22 15 -68 15 l-61 0 0 -80z"/>
<path d="M2177 160 c-3 -11 6 -42 19 -68 13 -26 24 -50 24 -54 0 -16 -17 -7
-28 15 -10 21 -11 21 -11 -6 -1 -25 2 -28 27 -25 36 4 42 47 12 100 -23 42
-20 65 5 32 14 -18 14 -18 15 4 0 18 -6 22 -29 22 -20 0 -30 -6 -34 -20z"/>
<path d="M2300 158 c0 -21 0 -21 15 -2 14 17 15 12 9 -59 -6 -76 -6 -77 18
-77 23 0 23 2 20 78 -2 56 0 73 7 62 10 -13 12 -13 21 0 8 11 10 -7 8 -63 -3
-74 -2 -77 20 -77 19 0 22 5 22 35 0 19 5 35 10 35 6 0 10 -16 10 -35 0 -34 2
-35 36 -35 27 0 35 4 31 14 -3 8 -3 17 1 21 3 3 5 22 3 42 -2 23 1 33 8 29 6
-4 11 -29 11 -57 l0 -49 65 0 c75 0 85 10 85 87 0 58 -12 73 -60 73 l-35 0 3
-75 c2 -45 0 -75 -6 -75 -11 0 -17 22 -28 103 -6 41 -9 47 -31 47 -13 0 -22
-4 -19 -8 8 -13 -16 -142 -25 -142 -5 0 -9 11 -9 24 0 14 -4 28 -10 31 -6 4
-5 14 4 28 10 15 11 29 5 45 -8 21 -14 22 -99 22 -86 0 -90 -1 -90 -22z m160
-23 c0 -13 -4 -27 -10 -30 -6 -4 -10 8 -10 30 0 22 4 34 10 30 6 -3 10 -17 10
-30z m210 -35 c0 -58 -12 -85 -24 -54 -15 39 -3 130 15 118 5 -3 9 -32 9 -64z"/>
<path d="M2715 100 l0 -80 45 0 46 0 -3 42 -3 43 15 -30 c8 -16 14 -36 15 -42
0 -7 5 -13 10 -13 6 0 10 28 10 64 0 35 3 71 6 80 4 10 1 16 -8 16 -10 0 -13
-11 -11 -37 l3 -38 -17 38 c-15 35 -18 37 -62 37 l-46 0 0 -80z m65 0 c0 -40
-4 -70 -10 -70 -6 0 -10 30 -10 70 0 40 4 70 10 70 6 0 10 -30 10 -70z"/>
</g>
  </svg>
</div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 py-2 ${
                  activeSection === item.id ? 'text-gray-900 dark:text-white' : ''
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 dark:bg-white transform transition-transform duration-200" />
                )}
              </button>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Dialog open={isQuoteModalOpen} onOpenChange={setIsQuoteModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
                  Free Quote
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md dark:bg-gray-900 dark:border-gray-700">
                <DialogHeader>
                  <DialogTitle className="dark:text-white">Request a Free Quote</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleQuoteSubmit} className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Your Name"
                    value={quoteFormData.name}
                    onChange={(e) => setQuoteFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  />
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={quoteFormData.email}
                    onChange={(e) => setQuoteFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  />
                  <Input
                    type="text"
                    placeholder="Company Name"
                    value={quoteFormData.company}
                    onChange={(e) => setQuoteFormData(prev => ({ ...prev, company: e.target.value }))}
                    className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  />
                  <select
                    value={quoteFormData.service}
                    onChange={(e) => setQuoteFormData(prev => ({ ...prev, service: e.target.value }))}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="">Select Service</option>
                    <option value="computers">Computers</option>
                    <option value="office-supplies">Office Supplies</option>
                    <option value="repair-services">Repair Services</option>
                    <option value="consultation">Consultation</option>
                  </select>
                  <Textarea
                    placeholder="Tell us about your requirements"
                    value={quoteFormData.message}
                    onChange={(e) => setQuoteFormData(prev => ({ ...prev, message: e.target.value }))}
                    required
                    rows={3}
                    className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Request Quote'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                  Contact Us
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md dark:bg-gray-900 dark:border-gray-700">
                <DialogHeader>
                  <DialogTitle className="dark:text-white">Contact Us</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Your Name"
                    value={contactFormData.name}
                    onChange={(e) => setContactFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  />
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={contactFormData.email}
                    onChange={(e) => setContactFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  />
                  <Textarea
                    placeholder="Your Message"
                    value={contactFormData.message}
                    onChange={(e) => setContactFormData(prev => ({ ...prev, message: e.target.value }))}
                    required
                    rows={4}
                    className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <Button variant="ghost" size="sm" onClick={toggleDarkMode} className="dark:text-gray-300 dark:hover:bg-gray-800">
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={toggleDarkMode} className="dark:text-gray-300 dark:hover:bg-gray-800">
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="dark:text-gray-300 dark:hover:bg-gray-800"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 ${
                    activeSection === item.id ? 'text-gray-900 dark:text-white font-medium' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="flex flex-col space-y-2 pt-4">
                <Dialog open={isQuoteModalOpen} onOpenChange={setIsQuoteModalOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
                      Free Quote
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md dark:bg-gray-900 dark:border-gray-700">
                    <DialogHeader>
                      <DialogTitle className="dark:text-white">Request a Free Quote</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleQuoteSubmit} className="space-y-4">
                      <Input
                        type="text"
                        placeholder="Your Name"
                        value={quoteFormData.name}
                        onChange={(e) => setQuoteFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                        className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                      />
                      <Input
                        type="email"
                        placeholder="Your Email"
                        value={quoteFormData.email}
                        onChange={(e) => setQuoteFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                        className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                      />
                      <Input
                        type="text"
                        placeholder="Company Name"
                        value={quoteFormData.company}
                        onChange={(e) => setQuoteFormData(prev => ({ ...prev, company: e.target.value }))}
                        className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                      />
                      <select
                        value={quoteFormData.service}
                        onChange={(e) => setQuoteFormData(prev => ({ ...prev, service: e.target.value }))}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-800 dark:text-white"
                      >
                        <option value="">Select Service</option>
                        <option value="computers">Computers</option>
                        <option value="office-supplies">Office Supplies</option>
                        <option value="repair-services">Repair Services</option>
                        <option value="consultation">Consultation</option>
                      </select>
                      <Textarea
                        placeholder="Tell us about your requirements"
                        value={quoteFormData.message}
                        onChange={(e) => setQuoteFormData(prev => ({ ...prev, message: e.target.value }))}
                        required
                        rows={3}
                        className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                      />
                      <Button 
                        type="submit" 
                        className="w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : 'Request Quote'}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>

                <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                      Contact Us
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md dark:bg-gray-900 dark:border-gray-700">
                    <DialogHeader>
                      <DialogTitle className="dark:text-white">Contact Us</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <Input
                        type="text"
                        placeholder="Your Name"
                        value={contactFormData.name}
                        onChange={(e) => setContactFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                        className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                      />
                      <Input
                        type="email"
                        placeholder="Your Email"
                        value={contactFormData.email}
                        onChange={(e) => setContactFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                        className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                      />
                      <Textarea
                        placeholder="Your Message"
                        value={contactFormData.message}
                        onChange={(e) => setContactFormData(prev => ({ ...prev, message: e.target.value }))}
                        required
                        rows={4}
                        className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                      />
                      <Button 
                        type="submit" 
                        className="w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}