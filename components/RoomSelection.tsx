import { Room, SelectedRoom } from "../types";
import { Card } from "../components/ui/card";
import Image from "next/image";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { BedDouble, Users, Trash2, PlusCircle, Info } from "lucide-react";

interface RoomSelectionProps {
  rooms: Room[];
  selectedRooms: SelectedRoom[];
  onQuantityChange: (roomId: number, quantity: number) => void;
  onAddRoom: () => void;
  onRemoveRoom: (roomId: number) => void;
  isFromSearch?: boolean;
  maxQuantity?: number;
}

const RoomSelection = ({ 
  rooms, 
  selectedRooms, 
  onQuantityChange,
  onAddRoom,
  onRemoveRoom,
  isFromSearch = false,
  maxQuantity = Infinity
}: RoomSelectionProps) => {

  const handleQuantityChange = (roomId: number, newQuantity: number) => {
    if (isFromSearch && maxQuantity !== undefined) {
      // En mode recherche, on ne peut pas dépasser la quantité max
      newQuantity = Math.min(newQuantity, maxQuantity);
    }
    onQuantityChange(roomId, newQuantity);
  };

  return (
    <div className="space-y-6">
      {isFromSearch && (
        <div className="flex items-center gap-2 p-3 bg-blue-50 text-blue-800 rounded-lg">
          <Info className="h-4 w-4" />
          <p className="text-sm">
            Vous modifiez une réservation issue d&eacute;une recherche. 
            {maxQuantity && ` Quantité maximale: ${maxQuantity}`}
          </p>
        </div>
      )}

      {selectedRooms.length > 0 ? (
        <>
          <div className="space-y-4">
            {selectedRooms.map((selectedRoom) => {
              const room = rooms.find(r => r.id === selectedRoom.id);
              if (!room) return null;
              
              return (
                <Card 
                  key={`${room.id}-${selectedRoom.quantity}`}
                  className="p-4 flex flex-col md:flex-row gap-4 border-2 border-teal-500 bg-teal-50"
                >
                  <div className="md:w-1/4 relative aspect-square">
                    <Image
                      src={room.image}
                      alt={`Image de ${room.name}`}
                      fill
                      className="rounded-md object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                    <Badge className="absolute top-2 left-2 bg-teal-600 text-white">
                      {selectedRoom.quantity}x
                    </Badge>
                  </div>
                  
                  <div className="md:w-2/4 space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-lg">{room.name}</h4>
                      <span className="font-bold text-teal-600">
                        {(room.price_per_night * selectedRoom.quantity).toLocaleString('fr-FR')} FCFA
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <BedDouble className="h-3 w-3" />
                        {room.room_type}
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {room.num_person} pers.
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="md:w-1/4 flex flex-col items-end justify-between gap-2">
                    <div className="flex items-center gap-2 bg-white rounded-full p-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 rounded-full"
                        onClick={() => handleQuantityChange(room.id, Math.max(1, selectedRoom.quantity - 1))}
                        disabled={selectedRoom.quantity <= 1 || (isFromSearch && selectedRoom.quantity <= maxQuantity)}
                        aria-label="Réduire la quantité"
                      >
                        -
                      </Button>
                      <span className="w-6 text-center font-medium">
                        {selectedRoom.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 rounded-full"
                        onClick={() => handleQuantityChange(room.id, selectedRoom.quantity + 1)}
                       disabled={
  selectedRoom.quantity >= 10 || 
  (isFromSearch && selectedRoom.quantity >= (maxQuantity ?? 0))
}
                        aria-label="Augmenter la quantité"
                      >
                        +
                      </Button>
                    </div>
                    
                    {!isFromSearch && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => onRemoveRoom(room.id)}
                        aria-label="Supprimer la chambre"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Supprimer
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
          
          {!isFromSearch && (
            <Button onClick={onAddRoom}>
              <PlusCircle className="mr-2" />
              Ajouter une autre chambre
            </Button>
          )}
        </>
      ) : (
        <div className="text-center py-8 border-2 border-dashed rounded-lg">
          <p className="text-gray-500 mb-4">Aucune chambre sélectionnée</p>
          <Button onClick={onAddRoom} aria-label="Sélectionner une chambre">
            Sélectionner une chambre
          </Button>
        </div>
      )}
    </div>
  );
};

export default RoomSelection;