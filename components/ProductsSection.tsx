
"use client";


import { Card } from '@/components/ui/card';

export default function ProductsSection() {
  // List of brands and font styles to mimic your example
  const products = [
    { 
      name: 'Canon', 
      style: { fontFamily: "'Times New Roman', serif", fontWeight: 600 } 
    },
    { 
      name: 'Asus', 
      style: { fontFamily: "'Verdana', Geneva, Tahoma, sans-serif", fontWeight: 800 } 
    },
    { 
      name: 'AMD', 
      style: { fontFamily: "'Arial Black', Gadget, sans-serif", fontWeight: 900 } 
    },
    { 
      name: 'Epson', 
      style: { fontFamily: "'Calibri', Candara, Segoe, 'Segoe UI', Optima, Arial, sans-serif", fontWeight: 600 } 
    },
    { 
      name: 'Brother', 
      style: { fontFamily: "'Arial Rounded MT Bold', 'Helvetica Rounded', Arial, sans-serif", fontWeight: 600 } 
    },
    { 
      name: 'TP-Link', 
      style: { fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight: 600, fontStyle: 'italic' } 
    },
    { 
      name: 'WD', 
      style: { fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: 700 } 
    },
    { 
      name: 'MSI', 
      style: { fontFamily: "'Verdana', Geneva, Tahoma, sans-serif", fontWeight: 700 } 
    },
  ];

  // Duplicate array for seamless animation loop
  const scrollingProducts = [...products, ...products];

  return (
    <section className="bg-gray-50 dark:bg-gray-800 py-16 transition-colors duration-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Products</h2>
        </div>

        <div className="relative whitespace-nowrap overflow-hidden">
          <div 
            className="flex gap-20 animate-scroll"
            style={{ willChange: 'transform' }}
          >
            {scrollingProducts.map((product, index) => (
              <Card
                key={index}
                className="min-w-[150px] py-6 px-8 text-center dark:bg-gray-700 dark:border-gray-600 inline-block"
              >
                <h3 
                  className="text-lg dark:text-white"
                  style={product.style}
                >
                  {product.name}
                </h3>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 25s linear infinite;
        }
      `}</style>
    </section>
  );
}
