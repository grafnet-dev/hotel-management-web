'use client';
import { Room } from '../types';
import { Button } from '../components/ui/button';

interface BookingRoomSelectorProps {
  rooms: Room[];
  selectedRooms: { id: number; quantity: number }[];
  onAddRoom: () => void;
  onRemoveRoom: (id: number) => void;
  onQuantityChange: (id: number, quantity: number) => void;
  readOnly?: boolean;
}

export default function BookingRoomSelector({
  rooms,
  selectedRooms,
  onAddRoom,
  onRemoveRoom,
  onQuantityChange,
  readOnly = false
}: BookingRoomSelectorProps) {
  return (
    <div className="bg-white rounded-lg shadow border overflow-hidden mb-8">
      <div className="bg-gray-800 px-6 py-4">
        <h3 className="font-semibold text-white text-lg">Sélection des chambres</h3>
      </div>
      <div className="p-6">
        {/* Votre implémentation existante de RoomSelection adaptée */}
        {selectedRooms.map(selected => (
          <div key={selected.id} className="mb-4 p-4 border rounded-lg">
            {/* Afficher les détails de la chambre */}
            {!readOnly && (
              <div className="flex justify-end gap-2 mt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onQuantityChange(selected.id, selected.quantity - 1)}
                  disabled={selected.quantity <= 1}
                >
                  -
                </Button>
                <span className="px-2">{selected.quantity}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onQuantityChange(selected.id, selected.quantity + 1)}
                >
                  +
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => onRemoveRoom(selected.id)}
                >
                  Supprimer
                </Button>
              </div>
            )}
          </div>
        ))}
        
        {!readOnly && (
          <Button 
            onClick={onAddRoom}
            className="mt-4"
          >
            + Ajouter une chambre
          </Button>
        )}
      </div>
    </div>
  );
}