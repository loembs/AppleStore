import { useState } from 'react';

interface MacConfiguratorProps {
  colors: any[];
  storages: any[];
  displays: any[];
  chips: any[];
  selectedColor: any;
  selectedStorage: any;
  selectedDisplay: any;
  selectedChip: any;
  onColorChange: (color: any) => void;
  onStorageChange: (storage: any) => void;
  onDisplayChange: (display: any) => void;
  onChipChange: (chip: any) => void;
  totalPrice: number;
}

const MacConfigurator = ({
  colors,
  storages,
  displays,
  chips,
  selectedColor,
  selectedStorage,
  selectedDisplay,
  selectedChip,
  onColorChange,
  onStorageChange,
  onDisplayChange,
  onChipChange,
  totalPrice
}: MacConfiguratorProps) => {
  return (
    <div className="space-y-8">
      {/* Couleur */}
      {colors.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Couleur</h3>
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => (
              <button
                key={color.id}
                onClick={() => onColorChange(color)}
                title={color.name || color.hex || 'Couleur'}
                className={`flex items-center p-2 rounded-xl border-2 transition-all ${
                  selectedColor?.id === color.id
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div
                  className="w-10 h-10 rounded-full border-2"
                  style={{ backgroundColor: color.hex, borderColor: '#d1d5db' }}
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Display */}
      {displays.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Écran</h3>
          <div className="space-y-3">
            {displays.map((display) => (
              <button
                key={display.id}
                onClick={() => onDisplayChange(display)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  selectedDisplay?.id === display.id
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900">{display.name}</div>
                    <div className="text-sm text-gray-500 mt-1">{display.description}</div>
                  </div>
                  <div className="text-right">
                    {display.price > 0 ? (
                      <div className="font-semibold text-gray-900">
                        +{display.price.toLocaleString('fr-FR')} FCFA
                      </div>
                    ) : (
                      <div className="text-sm text-green-600">Inclus</div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chip */}
      {chips.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Puce</h3>
          <div className="space-y-3">
            {chips.map((chip) => (
              <button
                key={chip.id}
                onClick={() => onChipChange(chip)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  selectedChip?.id === chip.id
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900">{chip.name}</div>
                    <div className="text-sm text-gray-500 mt-1">{chip.specs}</div>
                  </div>
                  <div className="font-semibold text-gray-900">
                    {chip.price.toLocaleString('fr-FR')} FCFA
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Stockage */}
      {storages.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Stockage</h3>
          <div className="grid grid-cols-3 gap-3">
            {storages.map((storage) => (
              <button
                key={storage.id}
                onClick={() => onStorageChange(storage)}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  selectedStorage?.id === storage.id
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold text-gray-900">{storage.size}</div>
                {storage.price > 0 && (
                  <div className="text-sm text-gray-600 mt-1">
                    +{storage.price.toLocaleString('fr-FR')} FCFA
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Prix Total */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center justify-between">
          <span className="text-xl text-gray-600">Prix total</span>
          <span className="text-3xl font-bold text-gray-900">
            {totalPrice.toLocaleString('fr-FR')} FCFA
          </span>
        </div>
      </div>
    </div>
  );
};

export default MacConfigurator;
