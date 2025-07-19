'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Monitor, Package, Wrench } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function PricingSection() {
  const pricingCategories = [
    {
      icon: <Monitor className="h-8 w-8 text-gray-900" />,
      title: 'Computers',
      subtitle: 'Custom quotes based on your business needs',
      description:
        "High-performance desktops, laptops, and accessories tailored to your organization's requirements.",
      features: [
        'Custom configuration',
        'Business-grade hardware',
        'Warranty included',
        'Setup assistance',
      ],
    },
    {
      icon: <Package className="h-8 w-8 text-yellow-600" />,
      title: 'Office Supplies',
      subtitle: 'Flexible pricing - Ask for a personalized quote',
      description:
        'A wide range of essential office supplies to keep your workplace efficiently stocked.',
      features: [
        'Bulk discounts available',
        'Regular delivery schedules',
        'Quality guaranteed',
        'Competitive pricing',
      ],
    },
    {
      icon: <Wrench className="h-8 w-8 text-gray-900" />,
      title: 'Services',
      subtitle: 'Contact us for repair, maintenance or setup service quotes',
      description:
        'Expert repair, maintenance, and IT support services to minimize downtime and keep your operations running.',
      features: [
        'Quick response times',
        'Certified technicians',
        'Preventive maintenance',
        'Emergency support',
      ],
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const openModalForCategory = (categoryTitle: string) => {
    setSelectedCategory(categoryTitle);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ name: '', email: '', phone: '', message: '' });
    setSelectedCategory(null);
    setIsSubmitting(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const subject = `Request a Quote - ${selectedCategory ?? 'Pricing Category'}`;

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: 'cdc6daf0-c83c-4343-b1df-dde9334ff6bb',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message:
            `Category: ${selectedCategory}\n\n` + formData.message,
          subject,
        }),
      });

      if (response.ok) {
        toast({
          title: 'Quote request sent successfully!',
          description: 'We will get back to you soon.',
        });
        closeModal();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      toast({
        title: 'Error sending message',
        description: 'Please try again later.',
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section id="pricing" className="bg-gray-50 dark:bg-gray-800 py-20 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center items-center gap-2 mb-4">
              <Package className="h-8 w-8 text-yellow-600" />
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                Pricing Categories
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingCategories.map((category, index) => (
              <Card
                key={index}
                className="p-8 bg-white dark:bg-gray-700 border-2 hover:shadow-lg transition-shadow dark:border-gray-600"
              >
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      {category.icon}
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{category.title}</h3>
                    </div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{category.subtitle}</p>
                    <p className="text-gray-600 dark:text-gray-300">{category.description}</p>
                  </div>

                  <ul className="space-y-2">
                    {category.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
                      >
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant="outline"
                    className="w-full border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white dark:border-gray-300 dark:text-gray-300 dark:hover:bg-gray-300 dark:hover:text-gray-900"
                    onClick={() => openModalForCategory(category.title)}
                  >
                    Request a Quote
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-8 relative"
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 dark:hover:text-white text-xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>

            <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
              Request a Quote - {selectedCategory}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                required
                className="bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                required
                className="bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <Input
                type="tel"
                placeholder="Contact Number"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                required
                className="bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <Textarea
                placeholder="Your message or details about your request"
                value={formData.message}
                onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                required
                rows={4}
                className="bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <Button
                type="submit"
                className="w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Request'}
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
