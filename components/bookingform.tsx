import { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, CreditCardIcon, BanknotesIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';

type PaymentMethod = 'credit_card' | 'mobile_money' | 'cash';
type PaymentOption = 'full' | 'half' | 'none';

type GuestInfo = {
  fullName: string;
  email: string;
  phone: string;
  specialRequests: string;
};

type BookingFormProps = {
  room: Room;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (bookingData: BookingData) => void;
};

type BookingData = {
  guestInfo: GuestInfo;
  checkInDate: string;
  checkOutDate: string;
  isDayUse: boolean;
  paymentMethod: PaymentMethod;
  paymentOption: PaymentOption;
  cardDetails?: {
    number: string;
    expiry: string;
    cvv: string;
    name: string;
  };
  mobileMoneyDetails?: {
    phone: string;
    network: string;
  };
};

const BookingForm = ({ room, isOpen, onClose, onSubmit }: BookingFormProps) => {
  const [step, setStep] = useState<'info' | 'payment'>('info');
  const [isDayUse, setIsDayUse] = useState(room.is_day_use || false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card');
  const [paymentOption, setPaymentOption] = useState<PaymentOption>('full');
  
  const [guestInfo, setGuestInfo] = useState<GuestInfo>({
    fullName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const [mobileMoneyDetails, setMobileMoneyDetails] = useState({
    phone: '',
    network: 'MTN'
  });

  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  // Calculate prices
  const totalPrice = isDayUse ? room.day_use_price : room.price_per_night;
  const amountToPay = paymentOption === 'full' ? totalPrice : 
                     paymentOption === 'half' ? totalPrice / 2 : 0;

  // Reset form when room changes
  useEffect(() => {
    if (!isOpen) return;
    
    setIsDayUse(room.is_day_use || false);
    setStep('info');
    setGuestInfo({
      fullName: '',
      email: '',
      phone: '',
      specialRequests: ''
    });
    setCheckInDate('');
    setCheckOutDate('');
  }, [room, isOpen]);

  const handleGuestInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGuestInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleMobileMoneyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMobileMoneyDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitInfo = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!guestInfo.fullName || !guestInfo.email || !guestInfo.phone) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    if (!isDayUse && (!checkInDate || !checkOutDate)) {
      alert('Veuillez sélectionner les dates de séjour');
      return;
    }
    
    setStep('payment');
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Payment method specific validation
    if (paymentMethod === 'credit_card' && 
        (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name)) {
      alert('Veuillez remplir tous les détails de la carte');
      return;
    }
    
    if (paymentMethod === 'mobile_money' && !mobileMoneyDetails.phone) {
      alert('Veuillez entrer votre numéro Mobile Money');
      return;
    }
    
    const bookingData: BookingData = {
      guestInfo,
      checkInDate: isDayUse ? new Date().toISOString().split('T')[0] : checkInDate,
      checkOutDate: isDayUse ? new Date().toISOString().split('T')[0] : checkOutDate,
      isDayUse,
      paymentMethod,
      paymentOption,
      ...(paymentMethod === 'credit_card' && { cardDetails }),
      ...(paymentMethod === 'mobile_money' && { mobileMoneyDetails })
    };
    
    onSubmit(bookingData);
  };

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case 'credit_card':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de carte</label>
              <input
                type="text"
                name="number"
                value={cardDetails.number}
                onChange={handleCardDetailsChange}
                placeholder="1234 5678 9012 3456"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date d'expiration</label>
                <input
                  type="text"
                  name="expiry"
                  value={cardDetails.expiry}
                  onChange={handleCardDetailsChange}
                  placeholder="MM/AA"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleCardDetailsChange}
                  placeholder="123"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom sur la carte</label>
              <input
                type="text"
                name="name"
                value={cardDetails.name}
                onChange={handleCardDetailsChange}
                placeholder="Nom complet"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
        );
        
      case 'mobile_money':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Réseau Mobile Money</label>
              <select
                name="network"
                value={mobileMoneyDetails.network}
                onChange={handleMobileMoneyChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="MTN">MTN</option>
                <option value="Orange">Orange Money</option>
                <option value="Moov">Moov Money</option>
                <option value="Wave">Wave</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de téléphone</label>
              <input
                type="text"
                name="phone"
                value={mobileMoneyDetails.phone}
                onChange={handleMobileMoneyChange}
                placeholder="Ex: 07 12 34 56 78"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            
            <div className="bg-yellow-50 p-3 rounded-md text-sm text-yellow-700">
              <p>Vous recevrez une demande de paiement sur ce numéro. Veuillez confirmer le paiement lorsque vous recevrez le message.</p>
            </div>
          </div>
        );
        
      case 'cash':
        return (
          <div className="bg-blue-50 p-4 rounded-md">
            <p className="text-blue-700 text-sm">
              Vous paierez directement à la réception lors de votre arrivée. 
              {paymentOption === 'half' && ' Un acompte de 50% est requis maintenant.'}
              {paymentOption === 'none' && ' Aucun paiement ne sera effectué maintenant.'}
            </p>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <Transition appear show={isOpen} as="div">
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as="div"
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as="div"
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    {step === 'info' ? 'Informations de réservation' : 'Paiement'}
                  </Dialog.Title>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{room.name}</h4>
                    <span className="text-sm text-gray-500">{room.room_type}</span>
                  </div>
                  {isDayUse ? (
                    <p className="text-sm text-gray-500">
                      Day use: {room.day_use_check_in}h - {room.day_use_check_out}h
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500">
                      {room.num_person} pers. • {room.surface_area} m²
                    </p>
                  )}
                </div>

                {step === 'info' ? (
                  <form onSubmit={handleSubmitInfo}>
                    <div className="space-y-4">
                      {room.is_day_use && (
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="dayUse"
                            checked={isDayUse}
                            onChange={(e) => setIsDayUse(e.target.checked)}
                            className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                          />
                          <label htmlFor="dayUse" className="ml-2 block text-sm text-gray-700">
                            Réservation Day-use
                          </label>
                        </div>
                      )}

                      {!isDayUse && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Arrivée</label>
                            <input
                              type="date"
                              value={checkInDate}
                              onChange={(e) => setCheckInDate(e.target.value)}
                              min={new Date().toISOString().split('T')[0]}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Départ</label>
                            <input
                              type="date"
                              value={checkOutDate}
                              onChange={(e) => setCheckOutDate(e.target.value)}
                              min={checkInDate || new Date().toISOString().split('T')[0]}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                              required
                            />
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          name="fullName"
                          value={guestInfo.fullName}
                          onChange={handleGuestInfoChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                          <input
                            type="email"
                            name="email"
                            value={guestInfo.email}
                            onChange={handleGuestInfoChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone <span className="text-red-500">*</span></label>
                          <input
                            type="tel"
                            name="phone"
                            value={guestInfo.phone}
                            onChange={handleGuestInfoChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Demandes spéciales</label>
                        <textarea
                          name="specialRequests"
                          value={guestInfo.specialRequests}
                          onChange={handleGuestInfoChange}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-teal-600 rounded-md text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        Continuer vers le paiement
                      </button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleSubmitPayment}>
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Total:</span>
                        <span className="font-bold text-lg">{totalPrice.toLocaleString()} FCFA</span>
                      </div>
                      {isDayUse && (
                        <p className="text-sm text-gray-500">
                          Day use: {room.day_use_check_in}h - {room.day_use_check_out}h
                        </p>
                      )}
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Option de paiement</h4>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setPaymentOption('full')}
                          className={`py-2 px-3 border rounded-md text-sm font-medium ${
                            paymentOption === 'full'
                              ? 'bg-teal-100 border-teal-500 text-teal-700'
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          Payer tout
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentOption('half')}
                          className={`py-2 px-3 border rounded-md text-sm font-medium ${
                            paymentOption === 'half'
                              ? 'bg-teal-100 border-teal-500 text-teal-700'
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          Payer moitié
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentOption('none')}
                          className={`py-2 px-3 border rounded-md text-sm font-medium ${
                            paymentOption === 'none'
                              ? 'bg-teal-100 border-teal-500 text-teal-700'
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          Payer sur place
                        </button>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Méthode de paiement</h4>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('credit_card')}
                          className={`py-2 px-3 border rounded-md text-sm font-medium flex flex-col items-center ${
                            paymentMethod === 'credit_card'
                              ? 'bg-teal-100 border-teal-500 text-teal-700'
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <CreditCardIcon className="h-5 w-5 mb-1" />
                          Carte
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('mobile_money')}
                          className={`py-2 px-3 border rounded-md text-sm font-medium flex flex-col items-center ${
                            paymentMethod === 'mobile_money'
                              ? 'bg-teal-100 border-teal-500 text-teal-700'
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <DevicePhoneMobileIcon className="h-5 w-5 mb-1" />
                          Mobile
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('cash')}
                          className={`py-2 px-3 border rounded-md text-sm font-medium flex flex-col items-center ${
                            paymentMethod === 'cash'
                              ? 'bg-teal-100 border-teal-500 text-teal-700'
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <BanknotesIcon className="h-5 w-5 mb-1" />
                          Espèces
                        </button>
                      </div>
                    </div>

                    {renderPaymentForm()}

                    {paymentOption !== 'none' && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-md">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-blue-700">Montant à payer maintenant:</span>
                          <span className="text-sm font-bold text-blue-700">{amountToPay.toLocaleString()} FCFA</span>
                        </div>
                      </div>
                    )}

                    <div className="mt-6 flex justify-between">
                      <button
                        type="button"
                        onClick={() => setStep('info')}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                      >
                        ← Retour
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-teal-600 rounded-md text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        Confirmer la réservation
                      </button>
                    </div>
                  </form>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default BookingForm;