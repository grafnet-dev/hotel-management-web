'use client';
import { Room } from '../types';

interface BookingSummaryProps {
  selectedRooms: { id: number; quantity: number }[];
  reservationType: string;
  dates: { checkIn: Date; checkOut: Date };
  rooms: Room[];
}

export default function BookingSummary({
  selectedRooms,
  reservationType,
  dates,
  rooms
}: BookingSummaryProps) {
  // Calcul du nombre de nuits
  const nights = Math.ceil(
    (dates.checkOut.getTime() - dates.checkIn.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Calcul du prix total
  const totalPrice = selectedRooms.reduce((total, selected) => {
    const room = rooms.find(r => r.id === selected.id);
    if (!room) return total;
    
    const price = reservationType 
      ? room.pricing.find(p => p.reservation_type_code === reservationType)?.price 
      : room.price_per_night;
    
    return total + (price || 0) * selected.quantity * nights;
  }, 0);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mb-8">
      <div className="bg-gradient-to-r from-red-900 to-red-800 px-6 py-4">
        <h3 className="font-semibold text-white text-lg flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
          </svg>
          Récapitulatif
        </h3>
      </div>
      
      <div className="p-6">
        {selectedRooms.length > 0 ? (
          <>
            <div className="space-y-4 mb-6">
              <h4 className="font-semibold text-lg">Votre séjour</h4>
              <div className="flex justify-between">
                <span>Dates:</span>
                <span className="font-medium">
                  {dates.checkIn.toLocaleDateString('fr-FR')} au {dates.checkOut.toLocaleDateString('fr-FR')}
                  <span className="ml-2 text-gray-500">({nights} nuit{nights > 1 ? 's' : ''})</span>
                </span>
              </div>
              {reservationType && (
                <div className="flex justify-between">
                  <span>Type de réservation:</span>
                  <span className="font-medium">
                    {rooms[0]?.reservation_types?.find(t => t.code === reservationType)?.name}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Vos chambres</h4>
              {selectedRooms.map(selected => {
                const room = rooms.find(r => r.id === selected.id);
                if (!room) return null;

                const roomType = room.reservation_types?.find(t => t.code === reservationType);
                const price = roomType 
                  ? room.pricing.find(p => p.reservation_type_code === reservationType)?.price
                  : room.price_per_night;

                return (
                  <div key={selected.id} className="border-b pb-4 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-red-900">{room.name}</h4>
                        <div className="text-sm text-gray-600 mt-1">
                          <span className="bg-gray-100 px-2 py-1 rounded mr-2">
                            {selected.quantity}x
                          </span>
                          {roomType?.name || 'Nuitée standard'}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">
                          {(price || 0).toLocaleString('fr-FR')} FCFA/nuit
                        </div>
                        <div className="text-sm text-gray-500">
                          Total: {(price || 0 * selected.quantity * nights).toLocaleString('fr-FR')} FCFA
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t-2 border-gray-200 pt-4 mt-6">
              <div className="flex justify-between items-center bg-red-50 p-4 rounded-lg">
                <span className="text-lg font-semibold">Total pour {nights} nuit{nights > 1 ? 's' : ''}</span>
                <span className="text-2xl font-bold text-red-900">
                  {totalPrice.toLocaleString('fr-FR')} FCFA
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
            <p className="text-gray-500 text-lg">Aucune chambre sélectionnée</p>
          </div>
        )}
      </div>
    </div>
  );
}