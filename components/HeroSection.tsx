'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

type FormType = 'contact' | 'freeDelivery';

export default function HeroSection() {
  const [activeForm, setActiveForm] = useState<FormType>('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '', // <-- added phone field
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const subject =
        activeForm === 'contact'
          ? 'New Contact Form Submission from L&SD Website'
          : 'New Free Delivery Form Submission from L&SD Website';

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '6138b91e-9848-49c9-bc70-422424d62dc2',
          name: formData.name,
          email: formData.email,
          phone: formData.phone, // <-- added phone to payload
          message: formData.message,
          subject,
        }),
      });

      if (response.ok) {
        toast({
          title: 'Message sent successfully!',
          description: 'We will get back to you soon.',
        });
        setFormData({ name: '', email: '', phone: '', message: '' }); // reset phone too
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

  return (
    <section
      id="home"
      className="bg-white dark:bg-gray-900 py-20 transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                L&SD
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                office supplies, computers, services, and enterprises
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Highly customizable components for building modern websites and
                applications that look and feel the way you mean it.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className={`w-full sm:w-auto ${
                  activeForm === 'contact'
                    ? 'bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200'
                    : 'bg-white text-black hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
                onClick={() => setActiveForm('contact')}
              >
                Contact Us
              </Button>
              <Button
                size="lg"
                variant={activeForm === 'freeDelivery' ? undefined : 'outline'}
                className={`w-full sm:w-auto ${
                  activeForm === 'freeDelivery'
                    ? 'bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200'
                    : 'dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
                onClick={() => setActiveForm('freeDelivery')}
              >
                Free Delivery
              </Button>
            </div>
          </div>

          {/* Right Content - Contact Form */}
          <div className="lg:pl-8">
            <Card className="p-8 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                {activeForm === 'contact' ? 'Get in Touch' : 'Request Free Delivery'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    required
                    className="bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, email: e.target.value }))
                    }
                    required
                    className="bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <Input
                    type="tel"
                    placeholder="Contact Number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    required
                    className="bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder={
                      activeForm === 'contact'
                        ? 'Your Message'
                        : 'Details about free delivery'
                    }
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, message: e.target.value }))
                    }
                    required
                    rows={4}
                    className="bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
