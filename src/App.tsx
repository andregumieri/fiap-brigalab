import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, X } from 'lucide-react';

interface BrigadeiroItem {
  id: string;
  massa: string;
  granulado: string;
  quantity: number;
  price: number;
}

function App() {
  const [selectedMassa, setSelectedMassa] = useState('tradicional');
  const [selectedGranulado, setSelectedGranulado] = useState('chocolate');
  const [cartItems, setCartItems] = useState<BrigadeiroItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const massaOptions = [
    { id: 'tradicional', name: 'Tradicional', color: '#8B4513' },
    { id: 'leite-ninho', name: 'Leite Ninho', color: '#F5F5DC' },
    { id: 'morango', name: 'Morango', color: '#FFB6C1' },
    { id: 'chocolate-branco', name: 'Chocolate Branco', color: '#FFFACD' },
    { id: 'doce-leite', name: 'Doce de Leite', color: '#DEB887' }
  ];

  const granuladoOptions = [
    { id: 'chocolate', name: 'Chocolate Granulado', color: '#4A4A4A' },
    { id: 'colorido', name: 'Granulado Colorido', color: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #f9ca24)' },
    { id: 'coco', name: 'Coco Ralado', color: '#FFFFFF' },
    { id: 'amendoim', name: 'Amendoim Triturado', color: '#DEB887' },
    { id: 'pistache', name: 'Pistache', color: '#8FBC8F' },
    { id: 'sem-granulado', name: 'Sem Granulado', color: 'transparent' }
  ];

  const selectedMassaOption = massaOptions.find(m => m.id === selectedMassa);
  const selectedGranuladoOption = granuladoOptions.find(g => g.id === selectedGranulado);

  const addToCart = () => {
    const newItem: BrigadeiroItem = {
      id: `${selectedMassa}-${selectedGranulado}-${Date.now()}`,
      massa: selectedMassaOption?.name || '',
      granulado: selectedGranuladoOption?.name || '',
      quantity: 1,
      price: 7.90
    };

    setCartItems([...cartItems, newItem]);
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Header */}
      <header className="bg-white shadow-lg" style={{backgroundColor: '#FDF7ED'}}>
        <div className="max-w-4xl mx-auto px-4 py-6 text-center">
          <h1 className="text-3xl font-bold text-amber-800 text-center">
            <img src="https://i.ibb.co/cKbCZB2W/Captura-de-Tela-2025-06-06-a-s-20-19-52.png" width={100} className={"mx-auto"} />
          </h1>
          <p className="text-center text-amber-600 mt-2">
            Todo amor é doce, você cria, a gente transforma em memórias
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Customization Panel */}
          <div className="space-y-8">
            {/* Cup Visualization */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-semibold text-amber-800 mb-6 text-center">
                Seu Brigadeiro
              </h2>
              
              <div className="flex justify-center mb-8">
                <div className="relative">
                  {/* Cup */}
                  <div className="w-32 h-40 rounded-b-full border-4 border-amber-700 bg-white relative overflow-hidden">
                    {/* Brigadeiro filling */}
                    <div 
                      className="absolute bottom-0 w-full h-28 rounded-b-full transition-all duration-500"
                      style={{ backgroundColor: selectedMassaOption?.color }}
                    ></div>
                    
                    {/* Granulado topping */}
                    <div 
                      className="absolute bottom-16 w-full h-12 transition-all duration-500 rounded-full"
                      style={{ 
                        background: selectedGranuladoOption?.id === 'colorido' 
                          ? selectedGranuladoOption.color 
                          : selectedGranuladoOption?.color,
                        opacity: selectedGranulado === 'sem-granulado' ? 0 : 0.8
                      }}
                    ></div>
                  </div>
                  
                  {/* Cup handle */}
                  <div className="absolute right-0 top-8 w-6 h-12 border-4 border-amber-700 rounded-r-full border-l-0"></div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-lg font-medium text-amber-700">
                  {selectedMassaOption?.name}
                </p>
                <p className="text-sm text-amber-600">
                  com {selectedGranuladoOption?.name}
                </p>
                <p className="text-2xl font-bold text-amber-800 mt-2">
                  R$ 7,90
                </p>
              </div>
            </div>

            {/* Massa Selection */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-semibold text-amber-800 mb-4">
                Escolha a Massa
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {massaOptions.map((massa) => (
                  <button
                    key={massa.id}
                    onClick={() => setSelectedMassa(massa.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center space-x-3 ${
                      selectedMassa === massa.id
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-gray-200 hover:border-amber-300'
                    }`}
                  >
                    <div 
                      className="w-6 h-6 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: massa.color }}
                    ></div>
                    <span className="font-medium text-gray-700">{massa.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Granulado Selection */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-semibold text-amber-800 mb-4">
                Escolha o Granulado
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {granuladoOptions.map((granulado) => (
                  <button
                    key={granulado.id}
                    onClick={() => setSelectedGranulado(granulado.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center space-x-3 ${
                      selectedGranulado === granulado.id
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-gray-200 hover:border-amber-300'
                    }`}
                  >
                    <div 
                      className="w-6 h-6 rounded-full border-2 border-gray-300"
                      style={{ 
                        background: granulado.id === 'colorido' 
                          ? granulado.color 
                          : granulado.color,
                        border: granulado.id === 'sem-granulado' ? '2px dashed #ccc' : '2px solid #ccc'
                      }}
                    ></div>
                    <span className="font-medium text-gray-700">{granulado.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={addToCart}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Adicionar na Minha Caixa - R$ 7,90
            </button>
          </div>

          {/* Right side - Additional content or empty */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="text-center text-amber-700">
              <div className="text-6xl mb-4">🍫</div>
              <h3 className="text-2xl font-bold mb-2">Brigadeiros Artesanais</h3>
              <p className="text-lg opacity-80">
                Feitos com carinho e os melhores ingredientes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Cart Button */}
      <button
        onClick={() => setIsCartOpen(true)}
        className={`fixed bottom-6 right-6 bg-amber-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-200 ${
          getTotalItems() > 0 ? 'animate-pulse' : ''
        }`}
      >
        <ShoppingCart size={24} />
        {getTotalItems() > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
            {getTotalItems()}
          </span>
        )}
      </button>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsCartOpen(false)}
          ></div>
          
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-amber-800">Minha Caixa</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
              {cartItems.length === 0 ? (
                <div className="text-center text-gray-500 mt-12">
                  <ShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Sua caixa está vazia</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="bg-amber-50 rounded-xl p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-amber-800">{item.massa}</h4>
                          <p className="text-sm text-amber-600">{item.granulado}</p>
                        </div>
                        <p className="font-bold text-amber-800">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-amber-200 rounded"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-amber-200 rounded"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <p className="text-sm text-amber-600">R$ 7,90 cada</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold text-amber-800">Total:</span>
                  <span className="text-2xl font-bold text-amber-800">
                    R$ {getTotalPrice().toFixed(2)}
                  </span>
                </div>
                
                <button className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                  Finalizar Pedido
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;