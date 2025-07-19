import { Card } from '@/components/ui/card';
import { Zap, BarChart3, Users } from 'lucide-react';

export default function AboutSection() {
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-gray-900" />,
      title: 'Our Products',
      description: 'We supply a wide range of office essentials, from cutting-edge computers to everyday supplies, ensuring your workplace is equipped for productivity.'
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-gray-900" />,
      title: 'Our Services',
      description: 'Tailored services designed to support your business operations, including setup assistance, maintenance, and personalized customer support.'
    },
    {
      icon: <Users className="h-8 w-8 text-gray-900" />,
      title: 'Our Team',
      description: 'A passionate and experienced team committed to delivering quality solutions, helping your business thrive with reliable products and outstanding service.'
    }
  ];

  return (
    <section id="about" className="bg-white dark:bg-gray-900 py-20 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About L&SD Office Supplies
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Providing top-quality computer and office supplies alongside reliable, customized
            services for businesses of all sizes. Learn more about who we are and what drives
            our business forward.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-8 border-2 hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-600">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}