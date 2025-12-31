import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const footerSections = [
    {
      title: 'Boutique',
      links: [
        { name: 'Store', path: '/store' },
        { name: 'Mac', path: '/mac' },
        { name: 'iPad', path: '/ipad' },
        { name: 'iPhone', path: '/iphone' },
        { name: 'Watch', path: '/watch' },
        { name: 'AirPods', path: '/airpods' },
        { name: 'Accessoires', path: '/accessories' }
      ]
    },
    {
      title: 'Compte',
      links: [
        { name: 'Mon compte', path: '/profile' },
        { name: 'Panier', path: '/cart' },
        { name: 'Commandes', path: '/profile' }
      ]
    },
    {
      title: 'Informations',
      links: [
        { name: 'À propos', path: '/store' },
        { name: 'Contact', path: '/store' },
        { name: 'Livraison', path: '/store' },
        { name: 'Retours', path: '/store' }
      ]
    },
    {
      title: 'Légal',
      links: [
        { name: 'Politique de confidentialité', path: '/store' },
        { name: 'Conditions d\'utilisation', path: '/store' },
        { name: 'Mentions légales', path: '/store' }
      ]
    }
  ];

  const handleLinkClick = (path: string) => {
    navigate(path);
  };

  return (
    <footer className="bg-gray-100 text-gray-600">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-2">
              <h4 className="font-semibold text-gray-900 text-sm">{section.title}</h4>
              <ul className="space-y-1">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => handleLinkClick(link.path)}
                      className="text-sm text-gray-600 hover:text-gray-900 hover:underline text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-gray-300">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="text-sm text-gray-600">
              <p className="font-semibold text-gray-900 mb-1">Apple Store iStar SN</p>
              <p>Dakar, Sénégal</p>
              <p className="mt-2">Téléphone: +221 XX XXX XX XX</p>
              <p>Email: contact@applestore-istar.sn</p>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 text-sm text-gray-600">
              <p>Copyright © 2025 Apple Store iStar SN. Tous droits réservés.</p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => handleLinkClick('/store')}
                  className="hover:underline"
                >
                  Politique de confidentialité
                </button>
                <button
                  onClick={() => handleLinkClick('/store')}
                  className="hover:underline"
                >
                  Conditions d'utilisation
                </button>
                <button
                  onClick={() => handleLinkClick('/store')}
                  className="hover:underline"
                >
                  Mentions légales
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
