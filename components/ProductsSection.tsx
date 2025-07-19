import { Card } from '@/components/ui/card';

export default function ProductsSection() {
  const products = [
    { name: 'Canon', logo: '🖨️' },
    { name: 'Asus', logo: '💻' },
    { name: 'AMD', logo: '🔧' },
    { name: 'Epson', logo: '📱' },
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-800 py-16 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Products</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow dark:bg-gray-700 dark:border-gray-600">
              <div className="text-4xl mb-4">{product.logo}</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{product.name}</h3>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}