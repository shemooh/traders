import { Card } from '@/components/ui/card';
import { Monitor, FolderOpen, Wrench } from 'lucide-react';

export default function SolutionsSection() {
  const solutions = [
    {
      icon: <Monitor className="h-8 w-8 text-gray-900" />,
      title: 'High-Performance Computers',
      description: 'Our selection of cutting-edge computers is designed for durability and performance, giving your team the power to excel without interruptions.'
    },
    {
      icon: <FolderOpen className="h-8 w-8 text-yellow-600" />,
      title: 'Complete Office Supplies',
      description: 'We stock a wide variety of essential office supplies, from stationery to peripherals, ensuring your workplace runs efficiently and smoothly day-to-day.'
    },
    {
      icon: <Wrench className="h-8 w-8 text-gray-900" />,
      title: 'Expert Repair & Support',
      description: 'Our skilled technicians provide quick, reliable repair and maintenance services to minimize downtime and keep your systems running at peak efficiency.'
    }
  ];

  return (
    <section id="solution" className="bg-white dark:bg-gray-900 py-20 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Solutions Tailored for Your Business
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            At L&SD, we provide comprehensive solutions encompassing reliable computers,
            essential office supplies, and expert repair services to empower and streamline
            your business operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <Card key={index} className="p-8 border-2 hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-600">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  {solution.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {solution.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {solution.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}