import { useNavigate } from 'react-router-dom';

interface MacFamilyCardProps {
  family: {
    id: string | number;
    family: string;
    name: string;
    tagline: string;
    price: number;
    image: string;
    is_featured?: boolean;
    is_new?: boolean;
  };
}

const MacFamilyCard = ({ family }: MacFamilyCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/mac?family=${family.family}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer group"
    >
      <div className="relative overflow-hidden rounded-2xl hover:shadow-2xl transition-shadow duration-300">
        {/* Image plein card */}
        <div className="w-full h-64 md:h-72 lg:h-80">
          <img
            src={family.image}
            alt={family.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Overlay texte */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent pointer-events-none" />
        <div className="absolute left-0 right-0 bottom-0 p-6">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">{family.name}</h3>
          <p className="text-sm text-white/90 mb-3">{family.tagline}</p>
          <p className="inline-block bg-white/90 text-gray-900 font-semibold px-3 py-1 rounded-lg">À partir de {family.price.toLocaleString('fr-FR')} FCFA</p>
        </div>
      </div>
    </div>
  );
};

export default MacFamilyCard;
